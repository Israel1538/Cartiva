/* =========================================================
   CARTIVA — CATEGORIES PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const searchButton = document.getElementById(
        "categoriesSearchButton"
    );

    const searchWrapper = document.getElementById(
        "categoriesSearchWrapper"
    );

    const searchClose = document.getElementById(
        "categoriesSearchClose"
    );

    const searchInput = document.getElementById(
        "categoriesSearchInput"
    );

    const mobileMenuButton = document.getElementById(
        "categoriesMobileMenu"
    );

    const mobileNav = document.getElementById(
        "categoriesMobileNav"
    );

    const categoriesGrid = document.getElementById(
        "categoriesGrid"
    );

    const newsletterForm = document.getElementById(
        "categoriesNewsletterForm"
    );

    const newsletterEmail = document.getElementById(
        "categoriesNewsletterEmail"
    );

    const newsletterMessage = document.getElementById(
        "categoriesNewsletterMessage"
    );

    const cartCount = document.getElementById(
        "cart-count"
    );


    /* =====================================================
       CART
    ===================================================== */

    function getCart() {

        try {

            const cart = JSON.parse(
                localStorage.getItem("cartivaCart")
            );

            return Array.isArray(cart) ? cart : [];

        } catch (error) {

            return [];

        }

    }


    function updateCartCount() {

        const cart = getCart();

        let totalItems = 0;

        cart.forEach(item => {

            const quantity = Number(item.quantity) || 1;

            totalItems += quantity;

        });


        if (cartCount) {

            cartCount.textContent = totalItems;

            if (totalItems > 0) {

                cartCount.style.display = "flex";

            } else {

                cartCount.style.display = "none";

            }

        }

    }


    updateCartCount();


    /* =====================================================
       SEARCH OPEN
    ===================================================== */

    if (searchButton && searchWrapper) {

        searchButton.addEventListener("click", () => {

            searchWrapper.classList.toggle("open");

            if (
                searchWrapper.classList.contains("open") &&
                searchInput
            ) {

                setTimeout(() => {

                    searchInput.focus();

                }, 100);

            }

        });

    }


    /* =====================================================
       SEARCH CLOSE
    ===================================================== */

    if (searchClose && searchWrapper) {

        searchClose.addEventListener("click", () => {

            searchWrapper.classList.remove("open");

            if (searchInput) {

                searchInput.value = "";

            }

            showAllCategories();

        });

    }


    /* =====================================================
       SEARCH CATEGORIES
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const searchTerm =
                searchInput.value
                    .trim()
                    .toLowerCase();


            if (!searchTerm) {

                showAllCategories();

                return;

            }


            const categoryCards =
                document.querySelectorAll(
                    ".category-card"
                );


            categoryCards.forEach(card => {

                const categoryName =
                    card
                        .querySelector("h3")
                        ?.textContent
                        .toLowerCase() || "";


                const categoryDescription =
                    card
                        .querySelector("p")
                        ?.textContent
                        .toLowerCase() || "";


                const category =
                    card.dataset.category || "";


                const matches =
                    categoryName.includes(searchTerm) ||
                    categoryDescription.includes(searchTerm) ||
                    category.includes(searchTerm);


                if (matches) {

                    card.style.display = "";

                    card.animate(
                        [
                            {
                                opacity: 0,
                                transform: "scale(0.97)"
                            },
                            {
                                opacity: 1,
                                transform: "scale(1)"
                            }
                        ],
                        {
                            duration: 250,
                            easing: "ease-out"
                        }
                    );

                } else {

                    card.style.display = "none";

                }

            });


            checkEmptySearch();

        });

    }


    /* =====================================================
       SHOW ALL CATEGORIES
    ===================================================== */

    function showAllCategories() {

        const categoryCards =
            document.querySelectorAll(
                ".category-card"
            );


        categoryCards.forEach(card => {

            card.style.display = "";

        });


        removeSearchEmptyState();

    }


    /* =====================================================
       EMPTY SEARCH STATE
    ===================================================== */

    function checkEmptySearch() {

        const visibleCards =
            Array.from(
                document.querySelectorAll(
                    ".category-card"
                )
            ).filter(card => {

                return card.style.display !== "none";

            });


        if (visibleCards.length === 0) {

            if (
                document.getElementById(
                    "categorySearchEmpty"
                )
            ) {

                return;

            }


            const emptyState =
                document.createElement("div");


            emptyState.id =
                "categorySearchEmpty";


            emptyState.style.gridColumn =
                "1 / -1";


            emptyState.style.padding =
                "60px 20px";


            emptyState.style.textAlign =
                "center";


            emptyState.innerHTML = `

                <div style="
                    width:64px;
                    height:64px;
                    margin:0 auto 18px;
                    border-radius:50%;
                    background:#f3f3f0;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:#ff5a1f;
                    font-size:22px;
                ">

                    <i class="fa-solid fa-magnifying-glass"></i>

                </div>

                <h3 style="
                    margin:0 0 8px;
                    font-family:Manrope,sans-serif;
                    font-size:22px;
                    color:#111;
                ">

                    No categories found

                </h3>

                <p style="
                    margin:0;
                    font-family:'DM Sans',sans-serif;
                    color:#777;
                    font-size:14px;
                ">

                    Try searching for fashion,
                    electronics, beauty or home.

                </p>

            `;


            if (categoriesGrid) {

                categoriesGrid.appendChild(
                    emptyState
                );

            }

        }

    }


    function removeSearchEmptyState() {

        const emptyState =
            document.getElementById(
                "categorySearchEmpty"
            );


        if (emptyState) {

            emptyState.remove();

        }

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (mobileMenuButton && mobileNav) {

        mobileMenuButton.addEventListener(
            "click",
            () => {

                mobileNav.classList.toggle("open");


                const icon =
                    mobileMenuButton.querySelector("i");


                if (!icon) {

                    return;

                }


                if (
                    mobileNav.classList.contains("open")
                ) {

                    icon.classList.remove(
                        "fa-bars"
                    );

                    icon.classList.add(
                        "fa-xmark"
                    );

                } else {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }
        );

    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICKING LINK
    ===================================================== */

    if (mobileNav) {

        const mobileLinks =
            mobileNav.querySelectorAll("a");


        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove(
                    "open"
                );


                const icon =
                    mobileMenuButton?.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            });

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                !mobileNav ||
                !mobileMenuButton
            ) {

                return;

            }


            const clickedInsideMenu =
                mobileNav.contains(event.target);


            const clickedButton =
                mobileMenuButton.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedButton
            ) {

                mobileNav.classList.remove(
                    "open"
                );


                const icon =
                    mobileMenuButton.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }
    );


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const email =
                    newsletterEmail?.value
                        .trim();


                if (!email) {

                    showNewsletterMessage(
                        "Please enter your email address.",
                        "error"
                    );

                    return;

                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    showNewsletterMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;

                }


                const subscribers =
                    JSON.parse(
                        localStorage.getItem(
                            "cartivaSubscribers"
                        ) || "[]"
                    );


                if (
                    subscribers.includes(email)
                ) {

                    showNewsletterMessage(
                        "You're already subscribed!",
                        "success"
                    );

                    return;

                }


                subscribers.push(email);


                localStorage.setItem(
                    "cartivaSubscribers",
                    JSON.stringify(
                        subscribers
                    )
                );


                showNewsletterMessage(
                    "You're subscribed! Welcome to Cartiva.",
                    "success"
                );


                newsletterForm.reset();

            }
        );

    }


    function showNewsletterMessage(
        message,
        type
    ) {

        if (!newsletterMessage) {

            return;

        }


        newsletterMessage.textContent =
            message;


        if (type === "success") {

            newsletterMessage.style.color =
                "#7ee2a8";

        } else {

            newsletterMessage.style.color =
                "#ff9d83";

        }


        newsletterMessage.animate(
            [
                {
                    opacity: 0,
                    transform: "translateY(5px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],
            {
                duration: 250,
                easing: "ease-out"
            }
        );


        setTimeout(() => {

            newsletterMessage.textContent = "";

        }, 5000);

    }


    /* =====================================================
       KEYBOARD SEARCH SHORTCUT
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();


                if (searchWrapper) {

                    searchWrapper.classList.add(
                        "open"
                    );

                }


                if (searchInput) {

                    searchInput.focus();

                }

            }


            if (
                event.key === "Escape"
            ) {

                if (searchWrapper) {

                    searchWrapper.classList.remove(
                        "open"
                    );

                }


                if (searchInput) {

                    searchInput.value = "";

                    showAllCategories();

                }

            }

        }
    );


    /* =====================================================
       IMAGE ERROR FALLBACK
       ===================================================== */

    const categoryImages =
        document.querySelectorAll(
            ".category-card-image img"
        );


    categoryImages.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.display = "none";


                const parent =
                    image.parentElement;


                if (parent) {

                    parent.style.background =
                        "linear-gradient(135deg,#222,#555)";

                }

            }
        );

    });


    /* =====================================================
       CATEGORY CARD ENTRANCE ANIMATION
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".category-card"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.animate(
                                [
                                    {
                                        opacity: 0,
                                        transform:
                                            "translateY(25px)"
                                    },
                                    {
                                        opacity: 1,
                                        transform:
                                            "translateY(0)"
                                    }
                                ],
                                {
                                    duration: 600,
                                    easing:
                                        "cubic-bezier(.2,.8,.2,1)",
                                    fill: "forwards"
                                }
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        cards.forEach(card => {

            observer.observe(card);

        });

    }


    /* =====================================================
       CART STORAGE SYNC
    ===================================================== */

    window.addEventListener(
        "storage",
        event => {

            if (
                event.key === "cartivaCart"
            ) {

                updateCartCount();

            }

        }
    );


    /* =====================================================
       UPDATE CART COUNT WHEN RETURNING TO PAGE
    ===================================================== */

    window.addEventListener(
        "pageshow",
        () => {

            updateCartCount();

        }
    );


    /* =====================================================
       CATEGORY CARD CLICK FEEDBACK
    ===================================================== */

    cards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                card.style.transition =
                    "transform 0.15s ease";


                card.style.transform =
                    "scale(0.985)";


                setTimeout(() => {

                    card.style.transform = "";

                }, 150);

            }
        );

    });

});