<<<<<<< HEAD
# Cartiva — Setup Guide

This covers everything needed to get the restored backend and full site
running locally.

## 1. Requirements

- Node.js (v18+ recommended)
- MySQL Server running locally (or reachable over the network)

## 2. Create the database

Run the schema file against your MySQL server. From a terminal:

```
mysql -u root -p < backend/database/schema.sql
```

This creates a `cartiva` database and a `users` table. If you already have
an older `users` table from a previous attempt and want to keep its data,
just add the two new columns instead of running the whole file:

```sql
ALTER TABLE users
    ADD COLUMN reset_token_hash VARCHAR(255) NULL,
    ADD COLUMN reset_token_expires_at DATETIME NULL;
```

## 3. Configure environment variables

```
cd backend
cp .env.example .env
```

Open `backend/.env` and fill in:

- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` — your MySQL connection
- `SESSION_SECRET` — any long random string, e.g. generate one with:
  ```
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- `PORT` — defaults to 3000 if left blank
- `NODE_ENV` — leave as `development` locally; set to `production` when you deploy

`.env` is already excluded from Git via `.gitignore` — never commit it.

## 4. Install dependencies and start the backend

```
cd backend
npm install
npm start
```

For auto-restart on file changes during development:

```
npm run dev
```

You should see:

```
🚀 Cartiva backend running at http://localhost:3000
✅ Connected to Cartiva database
```

If you see a database connection error instead, double-check the `DB_*`
values in `backend/.env` and that MySQL is actually running.

## 5. Open the site

The backend also serves the whole frontend as static files, so once it's
running, just open:

```
http://localhost:3000
```

You don't need a separate frontend server — `index.html`, `shop.html`,
etc. are all served directly by the same Express app, which is also why
login/session cookies work without any CORS configuration for local use.

## 6. Test the auth flow

1. **Register** — go to `/register.html`, create an account. You should
   be redirected straight to `/account.html` already signed in.
2. **Log out** — from the account page, click Logout.
3. **Log in** — go to `/login.html` and sign back in with the same
   credentials. Try a wrong password too — you should get a clear error.
4. **Session persistence** — after logging in, navigate to a few other
   pages and back to `/account.html` — you should stay signed in.
5. **Guarded account page** — open a private/incognito window and go
   straight to `/account.html` — you should be redirected to `/login.html`.
6. **Forgot password** — go to `/login.html` → "Forgot password?", enter
   your email. In development, the response includes a direct reset link
   (no email service is configured — see below) which you can click to
   set a new password.

## 7. About the "forgot password" flow

There's no email-sending service wired into this project (that would
require a real provider like SES, Postmark, SendGrid, etc., and an
account/API key for it). The backend endpoints
(`/api/forgot-password`, `/api/reset-password`) are fully implemented —
hashed, expiring tokens, no plaintext tokens stored, generic responses
that don't reveal whether an email is registered — but in development
mode the reset link is returned directly in the API response and logged
to the server console instead of being emailed. **In production
(`NODE_ENV=production`), that link is never included in the response** —
you'd need to plug in a real email provider to actually send it.

## 8. Known remaining gaps

- **Profile editing** (name/email) on the account page is still
  local-only (no backend endpoint exists to persist changes) — it was
  already this way before the restore. Building a real
  `PATCH /api/me` endpoint would be a reasonable next step.
- **Password reset emails** need a real provider hooked up for
  production use (see above).
- **Cart/wishlist** intentionally remain localStorage-based per your
  instructions — they are not tied to a user account, so they won't
  follow you between devices/browsers.
=======
# Cartiva
A modern full-stack e-commerce website built with HTML, CSS, JavaScript, Node.js, Express, and MySQL.
>>>>>>> daff535dd62763c0c9c408ab6973ade8ccee5ea8
