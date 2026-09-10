/* =========================================================
   CARTIVA — DEALS PAGE JAVASCRIPT
   ========================================================= */


/* =========================================================
   PRODUCT DATA
   ========================================================= */

const dealsProducts = [

    {
        id: 101,
        name: "Minimal Leather Crossbody Bag",
        category: "accessories",
        categoryName: "Accessories",
        price: 24900,
        oldPrice: 39900,
        rating: 4.8,
        reviews: 124,
        discount: 38,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 102,
        name: "Premium Wireless Headphones",
        category: "electronics",
        categoryName: "Electronics",
        price: 79900,
        oldPrice: 119900,
        rating: 4.9,
        reviews: 287,
        discount: 33,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 103,
        name: "Classic Oversized Cotton T-Shirt",
        category: "fashion",
        categoryName: "Fashion",
        price: 18900,
        oldPrice: 29900,
        rating: 4.7,
        reviews: 96,
        discount: 37,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 104,
        name: "Hydrating Glow Skincare Set",
        category: "beauty",
        categoryName: "Beauty",
        price: 32900,
        oldPrice: 49900,
        rating: 4.8,
        reviews: 183,
        discount: 34,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 105,
        name: "Modern Ceramic Table Lamp",
        category: "home",
        categoryName: "Home & Living",
        price: 28900,
        oldPrice: 44900,
        rating: 4.6,
        reviews: 74,
        discount: 36,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 106,
        name: "Everyday Running Sneakers",
        category: "fashion",
        categoryName: "Fashion",
        price: 45900,
        oldPrice: 69900,
        rating: 4.9,
        reviews: 211,
        discount: 34,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 107,
        name: "Smart Fitness Watch",
        category: "electronics",
        categoryName: "Electronics",
        price: 64900,
        oldPrice: 89900,
        rating: 4.7,
        reviews: 156,
        discount: 28,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 108,
        name: "Aroma Home Fragrance Set",
        category: "home",
        categoryName: "Home & Living",
        price: 21900,
        oldPrice: 34900,
        rating: 4.6,
        reviews: 68,
        discount: 37,
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 109,
        name: "Everyday Gold-Tone Watch",
        category: "accessories",
        categoryName: "Accessories",
        price: 38900,
        oldPrice: 59900,
        rating: 4.8,
        reviews: 102,
        discount: 35,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 110,
        name: "Essential Face Care Collection",
        category: "beauty",
        categoryName: "Beauty",
        price: 27900,
        oldPrice: 42900,
        rating: 4.7,
        reviews: 139,
        discount: 35,
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 111,
        name: "Portable Bluetooth Speaker",
        category: "electronics",
        categoryName: "Electronics",
        price: 35900,
        oldPrice: 54900,
        rating: 4.8,
        reviews: 192,
        discount: 35,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85"
    },

    {
        id: 112,
        name: "Soft Knit Lounge Set",
        category: "fashion",
        categoryName: "Fashion",
        price: 39900,
        oldPrice: 62900,
        rating: 4.7,
        reviews: 83,
        discount: 37,
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85"
    }

];


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const dealsProductGrid =
    document.getElementById("dealsProductGrid");

const dealsEmpty =
    document.getElementById("dealsEmpty");

const dealFilters =
    document.querySelectorAll(".deal-filter");

const cartCountElement =
    document.getElementById("cart-count");

const mobileMenuButton =
    document.getElementById("dealsMobileMenu");

const mobileNav =
    document.getElementById("dealsMobileNav");

const newsletterForm =
    document.getElementById("dealsNewsletterForm");

const newsletterMessage =
    document.getElementById("newsletterMessage");


/* =========================================================
   LOCAL STORAGE HELPERS
   ========================================================= */

function getStoredData(key, fallback = []) {

    try {

        const stored =
            localStorage.getItem(key);

        if (!stored) {
            return fallback;
        }

        return JSON.parse(stored);

    } catch (error) {

        console.error(
            `Unable to read ${key} from localStorage.`,
            error
        );

        return fallback;
    }
}


function saveStoredData(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    } catch (error) {

        console.error(
            `Unable to save ${key}.`,
            error
        );
    }
}


/* =========================================================
   CART
========================================================= */

let cart = getStoredData(
    "cartivaCart",
    []
);


/* =========================================================
   WISHLIST
========================================================= */

let wishlist = getStoredData(
    "cartivaWishlist",
    []
);


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(price) {

    return new Intl.NumberFormat(
        "en-NG",
        {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0
        }
    ).format(price);

}


/* =========================================================
   STAR RATING
========================================================= */

function generateStars(rating) {

    let stars = "";

    const roundedRating =
        Math.round(rating);

    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        if (i <= roundedRating) {

            stars +=
                '<i class="fa-solid fa-star"></i>';

        } else {

            stars +=
                '<i class="fa-regular fa-star"></i>';

        }

    }

    return stars;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderDealsProducts(
    category = "all"
) {

    if (!dealsProductGrid) {
        return;
    }


    let filteredProducts;


    if (category === "all") {

        filteredProducts =
            dealsProducts;

    } else {

        filteredProducts =
            dealsProducts.filter(
                product =>
                    product.category === category
            );

    }


    dealsProductGrid.innerHTML = "";


    if (filteredProducts.length === 0) {

        dealsEmpty.classList.add("show");

        return;

    }


    dealsEmpty.classList.remove("show");


    filteredProducts.forEach(
        product => {

            const card =
                createProductCard(product);

            dealsProductGrid.appendChild(card);

        }
    );

}


/* =========================================================
   CREATE PRODUCT CARD
========================================================= */

function createProductCard(product) {

    const article =
        document.createElement("article");

    article.className =
        "deal-product-card";

    article.dataset.id =
        product.id;


    const isWishlisted =
        wishlist.includes(product.id);


    article.innerHTML = `

        <div class="deal-product-image">

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <span class="deal-discount-badge">
                -${product.discount}%
            </span>

            <button
                class="deal-wishlist ${
                    isWishlisted ? "active" : ""
                }"
                data-wishlist="${product.id}"
                aria-label="Add ${product.name} to wishlist"
            >

                <i class="${
                    isWishlisted
                        ? "fa-solid"
                        : "fa-regular"
                } fa-heart"></i>

            </button>

        </div>


        <div class="deal-product-info">

            <span class="deal-product-category">
                ${product.categoryName}
            </span>


            <h3 class="deal-product-name">
                ${product.name}
            </h3>


            <div class="deal-rating">

                <div class="deal-stars">
                    ${generateStars(product.rating)}
                </div>

                <span class="deal-rating-number">
                    ${product.rating}
                    (${product.reviews})
                </span>

            </div>


            <div class="deal-price-row">

                <span class="deal-current-price">
                    ${formatPrice(product.price)}
                </span>

                <span class="deal-old-price">
                    ${formatPrice(product.oldPrice)}
                </span>

                <span class="deal-save-text">
                    Save ${formatPrice(
                        product.oldPrice - product.price
                    )}
                </span>

            </div>


            <button
                class="deal-add-cart"
                data-cart="${product.id}"
            >

                <i class="fa-solid fa-cart-plus"></i>

                Add to Cart

            </button>

        </div>

    `;


    return article;

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId) {

    const product =
        dealsProducts.find(
            p => p.id === productId
        );

    if (!product) {
        return;
    }

    const existing =
        cart.find(
            item => item.id === productId
        );

    if (existing) {

        existing.quantity =
            (Number(existing.quantity) || 1) + 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveStoredData(
        "cartivaCart",
        cart
    );

    updateCartCount();

    showCartButtonFeedback(productId);

}



/* =========================================================
   CART BUTTON FEEDBACK
========================================================= */

function showCartButtonFeedback(
    productId
) {

    const button =
        document.querySelector(
            `[data-cart="${productId}"]`
        );


    if (!button) {
        return;
    }


    const originalHTML =
        button.innerHTML;


    button.innerHTML =
        `
        <i class="fa-solid fa-check"></i>
        Added to Cart
        `;


    button.classList.add(
        "added"
    );


    setTimeout(() => {

        button.innerHTML =
            originalHTML;

        button.classList.remove(
            "added"
        );

    }, 1400);

}


/* =========================================================
   UPDATE CART COUNT
========================================================= */

function updateCartCount() {

    if (!cartCountElement) {
        return;
    }


    const totalItems =
        cart.reduce(
            (
                total,
                item
            ) => total + Number(
                item.quantity || 0
            ),
            0
        );


    cartCountElement.textContent =
        totalItems > 99
            ? "99+"
            : totalItems;


    if (totalItems > 0) {

        cartCountElement.style.display =
            "flex";

    } else {

        cartCountElement.style.display =
            "flex";

    }

}


/* =========================================================
   WISHLIST
========================================================= */

function toggleWishlist(productId) {

    const index =
        wishlist.indexOf(productId);


    if (index === -1) {

        wishlist.push(productId);

    } else {

        wishlist.splice(
            index,
            1
        );

    }


    saveStoredData(
        "cartivaWishlist",
        wishlist
    );


    updateWishlistButton(
        productId
    );

}


/* =========================================================
   UPDATE WISHLIST BUTTON
========================================================= */

function updateWishlistButton(
    productId
) {

    const button =
        document.querySelector(
            `[data-wishlist="${productId}"]`
        );


    if (!button) {
        return;
    }


    const icon =
        button.querySelector("i");


    const active =
        wishlist.includes(productId);


    if (active) {

        button.classList.add(
            "active"
        );

        icon.className =
            "fa-solid fa-heart";

    } else {

        button.classList.remove(
            "active"
        );

        icon.className =
            "fa-regular fa-heart";

    }

}


/* =========================================================
   PRODUCT EVENTS
========================================================= */

if (dealsProductGrid) {

    dealsProductGrid.addEventListener(
        "click",
        function (event) {

            const cartButton =
                event.target.closest(
                    "[data-cart]"
                );


            if (cartButton) {

                const productId =
                    Number(
                        cartButton.dataset.cart
                    );

                addToCart(
                    productId
                );

                return;
            }


            const wishlistButton =
                event.target.closest(
                    "[data-wishlist]"
                );


            if (wishlistButton) {

                const productId =
                    Number(
                        wishlistButton.dataset.wishlist
                    );

                toggleWishlist(
                    productId
                );

            }

        }
    );

}


/* =========================================================
   CATEGORY FILTERS
========================================================= */

dealFilters.forEach(
    filter => {

        filter.addEventListener(
            "click",
            function () {

                dealFilters.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                this.classList.add(
                    "active"
                );


                const category =
                    this.dataset.category;


                renderDealsProducts(
                    category
                );


                const productsSection =
                    document.getElementById(
                        "featured-deals"
                    );


                if (productsSection) {

                    productsSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }
);


/* =========================================================
   COUNTDOWN TIMER
========================================================= */

let countdownEnd =
    localStorage.getItem(
        "cartivaDealCountdown"
    );


if (!countdownEnd) {

    const now =
        new Date();


    now.setDate(
        now.getDate() + 2
    );


    now.setHours(
        23,
        59,
        59,
        999
    );


    countdownEnd =
        now.getTime();


    localStorage.setItem(
        "cartivaDealCountdown",
        countdownEnd
    );

}


countdownEnd =
    Number(countdownEnd);


/* =========================================================
   UPDATE COUNTDOWN
========================================================= */

function updateCountdown() {

    const now =
        Date.now();


    let difference =
        countdownEnd - now;


    if (difference <= 0) {

        const newEnd =
            new Date();


        newEnd.setDate(
            newEnd.getDate() + 2
        );


        newEnd.setHours(
            23,
            59,
            59,
            999
        );


        countdownEnd =
            newEnd.getTime();


        localStorage.setItem(
            "cartivaDealCountdown",
            countdownEnd
        );


        difference =
            countdownEnd - now;

    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    const daysElement =
        document.getElementById(
            "days"
        );

    const hoursElement =
        document.getElementById(
            "hours"
        );

    const minutesElement =
        document.getElementById(
            "minutes"
        );

    const secondsElement =
        document.getElementById(
            "seconds"
        );


    if (daysElement) {

        daysElement.textContent =
            String(days).padStart(
                2,
                "0"
            );

    }


    if (hoursElement) {

        hoursElement.textContent =
            String(hours).padStart(
                2,
                "0"
            );

    }


    if (minutesElement) {

        minutesElement.textContent =
            String(minutes).padStart(
                2,
                "0"
            );

    }


    if (secondsElement) {

        secondsElement.textContent =
            String(seconds).padStart(
                2,
                "0"
            );

    }

}


/* =========================================================
   START COUNTDOWN
========================================================= */

updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (
    mobileMenuButton &&
    mobileNav
) {

    mobileMenuButton.addEventListener(
        "click",
        function () {

            mobileNav.classList.toggle(
                "open"
            );


            const icon =
                mobileMenuButton.querySelector(
                    "i"
                );


            if (
                mobileNav.classList.contains(
                    "open"
                )
            ) {

                icon.className =
                    "fa-solid fa-xmark";

            } else {

                icon.className =
                    "fa-solid fa-bars";

            }

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
========================================================= */

if (mobileNav) {

    mobileNav
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileNav.classList.remove(
                            "open"
                        );


                        if (
                            mobileMenuButton
                        ) {

                            const icon =
                                mobileMenuButton.querySelector(
                                    "i"
                                );


                            if (icon) {

                                icon.className =
                                    "fa-solid fa-bars";

                            }

                        }

                    }
                );

            }
        );

}


/* =========================================================
   NEWSLETTER
========================================================= */

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const emailInput =
                document.getElementById(
                    "newsletterEmail"
                );


            if (!emailInput) {
                return;
            }


            const email =
                emailInput.value.trim();


            if (!email) {

                newsletterMessage.textContent =
                    "Please enter your email address.";

                newsletterMessage.style.color =
                    "#ef4444";

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    email
                )
            ) {

                newsletterMessage.textContent =
                    "Please enter a valid email address.";

                newsletterMessage.style.color =
                    "#ef4444";

                return;

            }


            newsletterMessage.textContent =
                "You're subscribed! Watch your inbox for Cartiva deals.";

            newsletterMessage.style.color =
                "#16a34a";


            emailInput.value = "";

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

renderDealsProducts();

updateCartCount();


/* =========================================================
   HANDLE STORAGE CHANGES
   Keeps cart count synchronized if another Cartiva
   page changes localStorage.
========================================================= */

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key ===
            "cartivaCart"
        ) {

            cart =
                getStoredData(
                    "cartivaCart",
                    []
                );


            updateCartCount();

        }


        if (
            event.key ===
            "cartivaWishlist"
        ) {

            wishlist =
                getStoredData(
                    "cartivaWishlist",
                    []
                );


            renderDealsProducts();

        }

    }
);


/* =========================================================
   IMAGE ERROR FALLBACK
========================================================= */

if (dealsProductGrid) {

    dealsProductGrid.addEventListener(
        "error",
        function (event) {

            if (
                event.target.tagName ===
                "IMG"
            ) {

                event.target.src =
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80";

            }

        },
        true
    );

}