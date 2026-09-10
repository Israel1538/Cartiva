const express = require("express");

const path = require("path");

const crypto = require("crypto");

const mysql = require("mysql2/promise");

const bcrypt = require("bcryptjs");

const cors = require("cors");

const session = require("express-session");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

const IS_PRODUCTION = process.env.NODE_ENV === "production";


// ----------------------------------
// SESSION SECRET
// ----------------------------------
// In development we fall back to a random secret generated at boot so the
// app still runs without a .env file, but every restart invalidates old
// sessions. Production must always supply a real SESSION_SECRET.

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {

    if (IS_PRODUCTION) {

        console.error(
            "❌ SESSION_SECRET is not set. Refusing to start in production without it."
        );

        process.exit(1);

    }

    sessionSecret = crypto.randomBytes(32).toString("hex");

    console.warn(
        "⚠️  SESSION_SECRET not set in .env — using a temporary secret for this run only. " +
        "Sessions will be invalidated every time the server restarts. Set SESSION_SECRET in backend/.env."
    );

}


// ----------------------------------
// MIDDLEWARE
// ----------------------------------
app.use(
    express.static(
        path.join(__dirname, "..")
    )
);

app.use(cors({
    origin: process.env.CORS_ORIGIN || true,
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: IS_PRODUCTION,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
);


// ----------------------------------
// MYSQL DATABASE
// ----------------------------------

const db = mysql.createPool({

    host: process.env.DB_HOST || "localhost",

    user: process.env.DB_USER || "root",

    password: process.env.DB_PASSWORD || "",

    database: process.env.DB_NAME || "cartiva",

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});


// ----------------------------------
// TEST DATABASE CONNECTION
// ----------------------------------

async function testDatabase() {

    try {

        const connection =
            await db.getConnection();

        console.log(
            "✅ Connected to Cartiva database"
        );

        connection.release();

    } catch (error) {

        console.error(
            "❌ Database connection failed:"
        );

        console.error(error.message);

        console.error(
            "   Run backend/database/schema.sql against your MySQL server, " +
            "then check the DB_* values in backend/.env."
        );

    }

}


// ----------------------------------
// LOGIN ABUSE PROTECTION
// ----------------------------------
// Simple in-memory throttle: after too many failed attempts for the same
// email, force a short cooldown. This is intentionally lightweight (no new
// dependency, no DB table) — good enough to slow down casual brute forcing
// on a small project, not a substitute for a real rate-limiting service.

const LOGIN_ATTEMPT_LIMIT = 5;

const LOGIN_ATTEMPT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

const loginAttempts = new Map();

function isLoginLocked(key) {

    const record = loginAttempts.get(key);

    if (!record) return false;

    if (Date.now() - record.firstAttempt > LOGIN_ATTEMPT_WINDOW_MS) {

        loginAttempts.delete(key);

        return false;

    }

    return record.count >= LOGIN_ATTEMPT_LIMIT;

}

function registerLoginFailure(key) {

    const record = loginAttempts.get(key);

    if (!record || Date.now() - record.firstAttempt > LOGIN_ATTEMPT_WINDOW_MS) {

        loginAttempts.set(key, { count: 1, firstAttempt: Date.now() });

    } else {

        record.count += 1;

    }

}

function clearLoginFailures(key) {

    loginAttempts.delete(key);

}


// ----------------------------------
// AUTH GUARD (for future protected routes)
// ----------------------------------

function requireAuth(req, res, next) {

    if (!req.session.userId) {

        return res.status(401).json({

            success: false,

            message: "You must be signed in to do that."

        });

    }

    next();

}


// ----------------------------------
// HOME / TEST ROUTE
// ----------------------------------

app.get("/", (req, res) => {

    res.json({

        message:
            "Cartiva backend is running."

    });

});


// ----------------------------------
// REGISTER
// ----------------------------------

app.post("/api/register", async (req, res) => {

    try {

        let {
            name,
            email,
            password
        } = req.body;


        // Validate input

        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please fill in all fields."

            });

        }

        name = String(name).trim();

        email = String(email).trim().toLowerCase();


        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a valid email address."

            });

        }


        // Check password length

        if (password.length < 6) {

            return res.status(400).json({

                success: false,

                message:
                    "Password must be at least 6 characters."

            });

        }


        // Check whether email exists

        const [existingUsers] =
            await db.execute(

                "SELECT id FROM users WHERE email = ?",

                [email]

            );


        if (existingUsers.length > 0) {

            return res.status(409).json({

                success: false,

                message:
                    "An account with this email already exists."

            });

        }


        // Hash password

        const passwordHash =
            await bcrypt.hash(
                password,
                12
            );


        // Create account

        const [result] =
            await db.execute(

                `INSERT INTO users
                (name, email, password_hash)
                VALUES (?, ?, ?)`,

                [
                    name,
                    email,
                    passwordHash
                ]

            );


        // Automatically log user in

        req.session.userId =
            result.insertId;


        res.status(201).json({

            success: true,

            message:
                "Account created successfully.",

            user: {

                id: result.insertId,

                name: name,

                email: email

            }

        });


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        // MySQL's own unique-constraint error, in case of a race condition
        // between the existence check above and the insert.
        if (error.code === "ER_DUP_ENTRY") {

            return res.status(409).json({

                success: false,

                message:
                    "An account with this email already exists."

            });

        }

        res.status(500).json({

            success: false,

            message:
                "Something went wrong while creating your account."

        });

    }

});


// ----------------------------------
// LOGIN
// ----------------------------------

app.post("/api/login", async (req, res) => {

    try {

        let {
            email,
            password
        } = req.body;


        if (
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter your email and password."

            });

        }

        email = String(email).trim().toLowerCase();

        const throttleKey = email;

        if (isLoginLocked(throttleKey)) {

            return res.status(429).json({

                success: false,

                message:
                    "Too many failed attempts. Please try again in a few minutes."

            });

        }


        // Find user

        const [users] =
            await db.execute(

                `SELECT
                    id,
                    name,
                    email,
                    password_hash
                 FROM users
                 WHERE email = ?`,

                [email]

            );


        if (users.length === 0) {

            registerLoginFailure(throttleKey);

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password."

            });

        }


        const user = users[0];


        // Compare password

        const passwordMatches =
            await bcrypt.compare(
                password,
                user.password_hash
            );


        if (!passwordMatches) {

            registerLoginFailure(throttleKey);

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password."

            });

        }

        clearLoginFailures(throttleKey);


        // Create session

        req.session.userId =
            user.id;


        res.json({

            success: true,

            message:
                "Login successful.",

            user: {

                id: user.id,

                name: user.name,

                email: user.email

            }

        });


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Something went wrong while logging in."

        });

    }

});


// ----------------------------------
// CURRENT USER
// ----------------------------------

app.get("/api/me", async (req, res) => {

    try {

        if (!req.session.userId) {

            return res.json({

                loggedIn: false

            });

        }


        const [users] =
            await db.execute(

                `SELECT
                    id,
                    name,
                    email,
                    created_at
                 FROM users
                 WHERE id = ?`,

                [
                    req.session.userId
                ]

            );


        if (users.length === 0) {

            req.session.destroy(() => {});

            return res.json({

                loggedIn: false

            });

        }


        res.json({

            loggedIn: true,

            user: users[0]

        });


    } catch (error) {

        console.error(
            "User check error:",
            error
        );

        res.status(500).json({

            loggedIn: false

        });

    }

});


// ----------------------------------
// LOGOUT
// ----------------------------------

app.post("/api/logout", (req, res) => {

    req.session.destroy(error => {

        if (error) {

            return res.status(500).json({

                success: false,

                message:
                    "Could not log out."

            });

        }


        res.clearCookie("connect.sid");


        res.json({

            success: true,

            message:
                "Logged out successfully."

        });

    });

});


// ----------------------------------
// FORGOT PASSWORD
// ----------------------------------
// Always responds with the same generic message whether or not the email
// exists, so the endpoint can't be used to find out which emails are
// registered. In development (no email service configured) the reset link
// is included directly in the JSON response so you can test the flow.
// It is NEVER included when NODE_ENV=production.

app.post("/api/forgot-password", async (req, res) => {

    try {

        let { email } = req.body;

        if (!email) {

            return res.status(400).json({

                success: false,

                message: "Please enter your email address."

            });

        }

        email = String(email).trim().toLowerCase();

        const genericResponse = {

            success: true,

            message:
                "If an account exists for that email, a password reset link has been sent."

        };

        const [users] = await db.execute(

            "SELECT id FROM users WHERE email = ?",

            [email]

        );

        if (users.length === 0) {

            // Same response as the success case — do not reveal whether
            // the email is registered.
            return res.json(genericResponse);

        }

        const rawToken = crypto.randomBytes(32).toString("hex");

        const tokenHash = crypto
            .createHash("sha256")
            .update(rawToken)
            .digest("hex");

        const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

        await db.execute(

            `UPDATE users
             SET reset_token_hash = ?, reset_token_expires_at = ?
             WHERE id = ?`,

            [tokenHash, expiresAt, users[0].id]

        );

        const resetLink =
            `${req.protocol}://${req.get("host")}/reset-password.html?token=${rawToken}`;

        if (!IS_PRODUCTION) {

            // No email service is configured for this project. In
            // development we log the link and also return it in the
            // response so the flow can be tested end to end.
            console.log(`🔑 Password reset link for ${email}: ${resetLink}`);

            return res.json({
                ...genericResponse,
                devResetLink: resetLink
            });

        }

        // Production: a real email service (e.g. SES, Postmark, SendGrid)
        // needs to be wired in here to actually deliver `resetLink`. That
        // integration is not part of this project yet — see README.
        console.log(`Password reset requested for ${email} (email delivery not configured).`);

        res.json(genericResponse);

    } catch (error) {

        console.error("Forgot-password error:", error);

        res.status(500).json({

            success: false,

            message: "Something went wrong. Please try again."

        });

    }

});


// ----------------------------------
// RESET PASSWORD
// ----------------------------------

app.post("/api/reset-password", async (req, res) => {

    try {

        const { token, password } = req.body;

        if (!token || !password) {

            return res.status(400).json({

                success: false,

                message: "This reset link is invalid."

            });

        }

        if (password.length < 6) {

            return res.status(400).json({

                success: false,

                message: "Password must be at least 6 characters."

            });

        }

        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const [users] = await db.execute(

            `SELECT id FROM users
             WHERE reset_token_hash = ?
             AND reset_token_expires_at > NOW()`,

            [tokenHash]

        );

        if (users.length === 0) {

            return res.status(400).json({

                success: false,

                message: "This reset link is invalid or has expired."

            });

        }

        const passwordHash = await bcrypt.hash(password, 12);

        await db.execute(

            `UPDATE users
             SET password_hash = ?, reset_token_hash = NULL, reset_token_expires_at = NULL
             WHERE id = ?`,

            [passwordHash, users[0].id]

        );

        res.json({

            success: true,

            message: "Your password has been reset. You can now sign in."

        });

    } catch (error) {

        console.error("Reset-password error:", error);

        res.status(500).json({

            success: false,

            message: "Something went wrong. Please try again."

        });

    }

});


// ----------------------------------
// 404 FOR UNKNOWN /api ROUTES
// ----------------------------------

app.use("/api", (req, res) => {

    res.status(404).json({

        success: false,

        message: "Not found."

    });

});


// ----------------------------------
// GENERIC ERROR HANDLER
// ----------------------------------
// Catches anything unexpected (bad JSON body, etc.) so the server never
// crashes and never leaks internals to the browser.

app.use((error, req, res, next) => {

    console.error("Unhandled error:", error);

    res.status(500).json({

        success: false,

        message: "Something went wrong on our end."

    });

});


// ----------------------------------
// START SERVER
// ----------------------------------

app.listen(
    PORT,
    async () => {

        console.log(
            `🚀 Cartiva backend running at http://localhost:${PORT}`
        );

        await testDatabase();

    }
);
