/* ==========================================
   CARTIVA
   auth.js
   Shared authentication helpers used across
   every page (nav auth state, logout).
========================================== */

(function(){

    /*
    ----------------------------------
    CHECK CURRENT SESSION
    ----------------------------------
    */

    async function cartivaCheckAuth(){

        try {

            const response =
                await fetch("/api/me", {
                    credentials: "include"
                });

            return await response.json();

        } catch (error) {

            console.warn(
                "Cartiva: could not reach the server to check sign-in status.",
                error
            );

            return { loggedIn: false };

        }

    }


    /*
    ----------------------------------
    LOG OUT (reusable everywhere)
    ----------------------------------
    */

    async function cartivaLogout(redirectTo){

        try {

            await fetch("/api/logout", {
                method: "POST",
                credentials: "include"
            });

        } catch (error) {

            console.warn("Cartiva: logout request failed.", error);

        }

        window.location.href = redirectTo || "index.html";

    }


    /*
    ----------------------------------
    UPDATE NAV LINKS TO REFLECT
    AUTH STATE

    Every page links to account.html
    via the same href, so this is a
    single, safe selector that works
    everywhere without touching each
    page's markup or styling.
    ----------------------------------
    */

    async function cartivaUpdateAccountNav(){

        const accountLinks =
            document.querySelectorAll(
                'a[href="account.html"]'
            );

        if(accountLinks.length === 0){

            return;

        }

        const status = await cartivaCheckAuth();

        accountLinks.forEach(link => {

            if(status.loggedIn){

                link.classList.add("cartiva-logged-in");

            } else {

                // Send logged-out visitors straight to
                // sign in instead of bouncing through
                // account.html first.
                link.setAttribute("href", "login.html");

                link.classList.remove("cartiva-logged-in");

            }

        });

    }


    window.cartivaCheckAuth = cartivaCheckAuth;
    window.cartivaLogout = cartivaLogout;

    document.addEventListener(
        "DOMContentLoaded",
        cartivaUpdateAccountNav
    );

})();
