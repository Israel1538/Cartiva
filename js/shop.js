/* ==========================================
   CARTIVA SHOP
   shop.js
   PART 1
========================================== */

/*
----------------------------------
PRODUCT DATABASE
----------------------------------
*/

const shopProducts = [

{
id:1,
name:"Premium Wireless Headphones",
category:"Electronics",
price:129.99,
oldPrice:179.99,
rating:4.8,
popularity:98,
newest:8,
image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30?w=800"
},

{
id:2,
name:"Luxury Smart Watch",
category:"Electronics",
price:229.99,
oldPrice:279.99,
rating:4.9,
popularity:99,
newest:7,
image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
},

{
id:3,
name:"Minimal Leather Backpack",
category:"Accessories",
price:89.99,
oldPrice:120,
rating:4.7,
popularity:91,
newest:5,
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
},

{
id:4,
name:"Modern Desk Lamp",
category:"Home",
price:59.99,
oldPrice:79.99,
rating:4.5,
popularity:80,
newest:4,
image:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800"
},

{
id:5,
name:"Luxury Perfume",
category:"Beauty",
price:95,
oldPrice:130,
rating:4.9,
popularity:94,
newest:6,
image:"https://images.unsplash.com/photo-1541643600914-78b084683601?w=800"
},

{
id:6,
name:"Running Sneakers",
category:"Fashion",
price:115,
oldPrice:150,
rating:4.6,
popularity:90,
newest:9,
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
},

{
id:7,
name:"Bluetooth Speaker",
category:"Electronics",
price:74.99,
oldPrice:99.99,
rating:4.4,
popularity:82,
newest:3,
image:"https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800"
},

{
id:8,
name:"Designer Handbag",
category:"Fashion",
price:140,
oldPrice:180,
rating:4.8,
popularity:88,
newest:2,
image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800"
}

];
window.shopProducts = shopProducts;

/*
----------------------------------
STATE
----------------------------------
*/

let displayedProducts = [...shopProducts];

let visibleProducts = 8;

let cart =
    JSON.parse(
        localStorage.getItem("cartivaCart") || "[]"
    );

let wishlist =
JSON.parse(localStorage.getItem("cartivaWishlist")) || [];

/*
----------------------------------
ELEMENTS
----------------------------------
*/

const shopGrid =
document.getElementById("shopGrid");

const productCount =
document.getElementById("productCount");

const emptyState =
document.getElementById("emptyState");

const loadMore =
document.getElementById("loadMore");
/* ==========================================
   CARTIVA SHOP
   shop.js
   PART 2 — PRODUCT RENDERING
========================================== */


/*
----------------------------------
CREATE STAR RATING
----------------------------------
*/

function createStars(rating){

    const roundedRating = Math.round(rating);

    let stars = "";

    for(let i = 1; i <= 5; i++){

        if(i <= roundedRating){

            stars += "★";

        }else{

            stars += "☆";

        }

    }

    return stars;
}


/*
----------------------------------
CALCULATE DISCOUNT
----------------------------------
*/

function calculateDiscount(price, oldPrice){

    if(!oldPrice || oldPrice <= price){

        return 0;

    }

    return Math.round(
        ((oldPrice - price) / oldPrice) * 100
    );

}


/*
----------------------------------
CREATE PRODUCT CARD
----------------------------------
*/

function createProductCard(product){

    const discount =
        calculateDiscount(
            product.price,
            product.oldPrice
        );

    const isWishlisted =
        wishlist.some(
            item => item.id === product.id
        );

    return `

        <article
            class="product-card"
            data-product-id="${product.id}"
        >

            <div class="product-image">

                ${
                    discount > 0
                    ?
                    `
                    <span class="discount">
                        -${discount}%
                    </span>
                    `
                    :
                    ""
                }

                <button
                    class="wishlist"
                    type="button"
                    aria-label="Add ${product.name} to wishlist"
                    onclick="toggleShopWishlist(${product.id})"
                >

                    <i
                        class="${
                            isWishlisted
                            ? "fa-solid"
                            : "fa-regular"
                        } fa-heart"
                    ></i>

                </button>

                <a
                    href="product.html?id=${product.id}"
                    class="product-image-link"
                >

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                </a>

            </div>


            <div class="product-info">

                <small class="product-category">
                    ${product.category}
                </small>

                <h4>
                    ${product.name}
                </h4>


                <div class="rating">

                    <span class="stars">
                        ${createStars(product.rating)}
                    </span>

                    <span class="rating-number">
                        ${product.rating}
                    </span>

                </div>


                <div class="price">

                    <strong>
                        $${product.price.toFixed(2)}
                    </strong>

                    ${
                        product.oldPrice
                        ?
                        `
                        <span class="old">
                            $${product.oldPrice.toFixed(2)}
                        </span>
                        `
                        :
                        ""
                    }

                </div>


                <button
                    class="add-cart"
                    type="button"
                    onclick="addShopToCart(${product.id})"
                >

                    <i class="fa-solid fa-cart-shopping"></i>

                    Add to Cart

                </button>

            </div>

        </article>

    `;

}


/*
----------------------------------
RENDER PRODUCTS
----------------------------------
*/
function renderShopProducts(){

    if(!shopGrid){

        return;

    }


    /*
    Clear current products
    */

    shopGrid.innerHTML = "";


    /*
    Determine products to display
    */

    const productsToDisplay =
        displayedProducts.slice(
            0,
            visibleProducts
        );


    /*
    Handle empty results
    */

    if(productsToDisplay.length === 0){

        shopGrid.classList.add("hidden");

        if(emptyState){

            emptyState.classList.remove("hidden");

        }

        if(productCount){

            productCount.textContent = "0";

        }

        if(loadMore){

            loadMore.style.display = "none";

        }

        return;

    }


    /*
    Show product grid
    */

    shopGrid.classList.remove("hidden");


    if(emptyState){

        emptyState.classList.add("hidden");

    }


    /*
    Generate product cards
    */

    productsToDisplay.forEach(product => {

        shopGrid.innerHTML +=
            createProductCard(product);

    });


    /*
    Update product count
    */

    if(productCount){

        productCount.textContent =
            displayedProducts.length;

    }


    /*
    Update Load More button
    */

    if(loadMore){

        if(
            visibleProducts >=
            displayedProducts.length
        ){

            loadMore.style.display = "none";

        }else{

            loadMore.style.display = "inline-flex";

        }

    }

}


/*
----------------------------------
INITIAL RENDER
----------------------------------
*/

renderShopProducts();
/* ==========================================
   CARTIVA SHOP
   shop.js
   PART 3 — SEARCH & FILTERS
========================================== */


/*
----------------------------------
FILTER ELEMENTS
----------------------------------
*/

const productSearch =
    document.getElementById("productSearch");

const categoryCheckboxes =
    document.querySelectorAll(
        '.filter-group input[type="checkbox"]'
    );

const priceRange =
    document.getElementById("priceRange");

const priceValue =
    document.getElementById("priceValue");

const ratingFilter =
    document.getElementById("ratingFilter");

const clearFilters =
    document.getElementById("clearFilters");

const resetSearch =
    document.getElementById("resetSearch");


/*
----------------------------------
FILTER STATE
----------------------------------
*/

let activeFilters = {

    search: "",

    categories: [],

    maxPrice: 1000,

    minRating: 0

};


/*
----------------------------------
 GET SELECTED CATEGORIES
----------------------------------
*/

function getSelectedCategories(){

    const selected = [];

    categoryCheckboxes.forEach(
        checkbox => {

            if(checkbox.checked){

                selected.push(
                    checkbox.value
                );

            }

        }
    );

    return selected;

}


/*
----------------------------------
 APPLY ALL FILTERS
----------------------------------
*/

function applyShopFilters(){

    const searchTerm =
        activeFilters.search
            .toLowerCase()
            .trim();


    displayedProducts =
        shopProducts.filter(product => {


            /*
            Search filter
            */

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm);


            /*
            Category filter
            */

            const matchesCategory =
                activeFilters.categories.length === 0
                ||
                activeFilters.categories.includes(
                    product.category
                );


            /*
            Price filter
            */

            const matchesPrice =
                product.price <=
                activeFilters.maxPrice;


            /*
            Rating filter
            */

            const matchesRating =
                product.rating >=
                activeFilters.minRating;


            /*
            Product must pass
            every active filter
            */

            return (
                matchesSearch &&
                matchesCategory &&
                matchesPrice &&
                matchesRating
            );

        });


    /*
    Reset pagination
    */

    visibleProducts = 8;


    /*
    Render results
    */

    renderShopProducts();

}


/*
----------------------------------
 SEARCH
----------------------------------
*/

if(productSearch){

    productSearch.addEventListener(
        "input",
        function(){

            activeFilters.search =
                this.value;

            applyShopFilters();

        }
    );

}


/*
----------------------------------
 CATEGORY FILTERS
----------------------------------
*/

categoryCheckboxes.forEach(
    checkbox => {

        checkbox.addEventListener(
            "change",
            function(){

                activeFilters.categories =
                    getSelectedCategories();

                applyShopFilters();

            }
        );

    }
);


/*
----------------------------------
 PRICE FILTER
----------------------------------
*/

if(priceRange){

    priceRange.addEventListener(
        "input",
        function(){

            const value =
                Number(this.value);

            activeFilters.maxPrice =
                value;


            /*
            Update visible price
            */

            if(priceValue){

                priceValue.textContent =
                    value;

            }


            applyShopFilters();

        }
    );

}


/*
----------------------------------
 RATING FILTER
----------------------------------
*/

if(ratingFilter){

    ratingFilter.addEventListener(
        "change",
        function(){

            activeFilters.minRating =
                Number(this.value);

            applyShopFilters();

        }
    );

}


/*
----------------------------------
 CLEAR FILTERS
----------------------------------
*/

function resetAllShopFilters(){

    if(sortProducts){

        sortProducts.value = "featured";

    }

    /*
    Reset search
    */

    activeFilters.search = "";


    /*
    Reset categories
    */

    activeFilters.categories = [];


    /*
    Reset price
    */

    activeFilters.maxPrice = 1000;


    /*
    Reset rating
    */

    activeFilters.minRating = 0;


    /*
    Reset search input
    */

    if(productSearch){

        productSearch.value = "";

    }


    /*
    Uncheck categories
    */

    categoryCheckboxes.forEach(
        checkbox => {

            checkbox.checked = false;

        }
    );


    /*
    Reset price slider
    */

    if(priceRange){

        priceRange.value = 1000;

    }


    /*
    Reset displayed price
    */

    if(priceValue){

        priceValue.textContent = "1000";

    }


    /*
    Reset rating
    */

    if(ratingFilter){

        ratingFilter.value = "0";

    }


    /*
    Render original products
    */

    displayedProducts =
        [...shopProducts];

    visibleProducts = 8;

    renderShopProducts();

}


/*
----------------------------------
 CLEAR FILTER BUTTON
----------------------------------
*/

if(clearFilters){

    clearFilters.addEventListener(
        "click",
        resetAllShopFilters
    );

}


/*
----------------------------------
 EMPTY STATE RESET
----------------------------------
*/

if(resetSearch){

    resetSearch.addEventListener(
        "click",
        resetAllShopFilters
    );

}
/* ==========================================
   CARTIVA SHOP
   shop.js
   PART 4 — SORTING
========================================== */


/*
----------------------------------
SORT ELEMENT
----------------------------------
*/

const sortProducts =
    document.getElementById("sortProducts");


/*
----------------------------------
SORT PRODUCTS
----------------------------------
*/

function sortShopProducts(sortType){

    /*
    Start with a copy of the
    currently filtered products.
    */

    const sorted =
        [...displayedProducts];


    switch(sortType){


        /*
        ----------------------------------
        FEATURED
        ----------------------------------
        */

        case "featured":

            sorted.sort(
                (a,b) =>
                    b.popularity -
                    a.popularity
            );

            break;


        /*
        ----------------------------------
        POPULARITY
        ----------------------------------
        */

        case "popular":

            sorted.sort(
                (a,b) =>
                    b.popularity -
                    a.popularity
            );

            break;


        /*
        ----------------------------------
        LOWEST PRICE
        ----------------------------------
        */

        case "low":

            sorted.sort(
                (a,b) =>
                    a.price -
                    b.price
            );

            break;


        /*
        ----------------------------------
        HIGHEST PRICE
        ----------------------------------
        */

        case "high":

            sorted.sort(
                (a,b) =>
                    b.price -
                    a.price
            );

            break;


        /*
        ----------------------------------
        HIGHEST RATING
        ----------------------------------
        */

        case "rating":

            sorted.sort(
                (a,b) =>
                    b.rating -
                    a.rating
            );

            break;


        /*
        ----------------------------------
        NEWEST
        ----------------------------------
        */

        case "newest":

            sorted.sort(
                (a,b) =>
                    b.newest -
                    a.newest
            );

            break;


        /*
        ----------------------------------
        DEFAULT
        ----------------------------------
        */

        default:

            break;

    }


    /*
    Replace current
    displayed products.
    */

    displayedProducts = sorted;


    /*
    Reset visible products.
    */

    visibleProducts = 8;


    /*
    Render sorted products.
    */

    renderShopProducts();

}


/*
----------------------------------
SORT EVENT
----------------------------------
*/

if(sortProducts){

    sortProducts.addEventListener(
        "change",
        function(){

            sortShopProducts(
                this.value
            );

        }
    );

}
/* ==========================================
   CARTIVA SHOP
   shop.js
   PART 5 — LOAD MORE / PAGINATION
========================================== */


/*
----------------------------------
LOAD MORE PRODUCTS
----------------------------------
*/

if(loadMore){

    loadMore.addEventListener(
        "click",
        function(){

            /*
            Increase the number of
            visible products.
            */

            visibleProducts += 4;


            /*
            Render the additional
            products.
            */

            renderShopProducts();


            /*
            find the newly displayed 
            products.
            */

            setTimeout(() => {

                const cards =
                    document.querySelectorAll(
                        "#shopGrid .product-card"
                    );

                if(cards.length > 0){

                    const newcardIndex =
                            Math.max(
                                cards.length - 4,
                                0
                            );

                    const newCard =
                        cards[newCardIndex];

                    if(newCard){

                        newCard.scrollIntoView({
                            behavior: "smooth",
                            block: "center" 
                        });

                    }

                }

            },150);

        }
    );

}

/*----------------------------------
END LOAD MORE PRODUCTS
----------------------------------
*/


/*
----------------------------------
 UPDATE LOAD MORE STATE
----------------------------------
*/

function updateLoadMoreButton(){

    if(!loadMore){

        return;

    }


    /*
    No products
    */

    if(displayedProducts.length === 0){

        loadMore.style.display = "none";

        return;

    }


    /*
    All products displayed
    */

    if(
        visibleProducts >=
        displayedProducts.length
    ){

        loadMore.style.display = "none";

        return;

    }


    /*
    More products available
    */

    loadMore.style.display = "inline-flex";

}


/*
----------------------------------
 PRODUCT COUNT
----------------------------------
*/

function updateProductCount(){

    if(!productCount){

        return;

    }

    productCount.textContent =
        displayedProducts.length;

}


/*
----------------------------------
 SHOP STATUS
----------------------------------
*/

function updateShopStatus(){

    updateProductCount();

    updateLoadMoreButton();

}


/*
----------------------------------
 REFRESH SHOP
----------------------------------
*/

function refreshShop(){

    renderShopProducts();

    updateShopStatus();

}


/*
----------------------------------
 INITIAL SHOP STATUS
----------------------------------
*/

updateShopStatus();
/* ==========================================
   CARTIVA SHOP
   shop.js
   PART 6 — CART FUNCTIONALITY
========================================== */


/*
----------------------------------
SAVE CART
----------------------------------
*/

function saveShopCart(){

    localStorage.setItem(
        "cartivaCart",
        JSON.stringify(cart)
    );

}


/*
----------------------------------
UPDATE CART COUNTER
----------------------------------
*/

function updateShopCartCount(){

    const cartCounters =
        document.querySelectorAll(
            "#cart-count"
        );


    /*
    Count quantities rather than
    simply counting products.
    */

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + (item.quantity || 1),
            0
        );


    cartCounters.forEach(
        counter => {

            counter.textContent =
                totalItems;

        }
    );

}


/*
----------------------------------
FIND PRODUCT
----------------------------------
*/

function findShopProduct(id){

    return shopProducts.find(
        product =>
            product.id === Number(id)
    );

}


/*
----------------------------------
ADD PRODUCT TO CART
----------------------------------
*/

function addShopToCart(id){

    const product =
        findShopProduct(id);


    /*
    Make sure the product exists.
    */

    if(!product){

        showShopToast(
            "Product could not be found."
        );

        return;

    }


    /*
    Check whether the product
    already exists in the cart.
    */

    const existingProduct =
        cart.find(
            item =>
                item.id === product.id
        );


    if(existingProduct){

        /*
        Increase quantity instead
        of creating another cart item.
        */

        existingProduct.quantity =
            (existingProduct.quantity || 1) + 1;

    }else{

        /*
        Add a new product with
        quantity set to one.
        */

        cart.push({

            ...product,

            quantity:1

        });

    }


    /*
    Save updated cart.
    */

    saveShopCart();


    /*
    Update navigation counter.
    */

    updateShopCartCount();


    /*
    Show confirmation.
    */

    showShopToast(
        `${product.name} added to your cart.`
    );

}


/*
----------------------------------
REMOVE PRODUCT FROM CART
----------------------------------
*/

function removeShopFromCart(id){

    const product =
        findShopProduct(id);


    cart =
        cart.filter(
            item =>
                item.id !== Number(id)
        );


    saveShopCart();

    updateShopCartCount();


    if(product){

        showShopToast(
            `${product.name} removed from your cart.`
        );

    }

}


/*
----------------------------------
CHANGE CART QUANTITY
----------------------------------
*/

function updateShopCartQuantity(
    id,
    quantity
){

    const item =
        cart.find(
            product =>
                product.id === Number(id)
        );


    if(!item){

        return;

    }


    /*
    Convert quantity to a number.
    */

    const newQuantity =
        Number(quantity);


    /*
    Remove the product if
    quantity becomes zero.
    */

    if(newQuantity <= 0){

        removeShopFromCart(id);

        return;

    }


    item.quantity =
        newQuantity;


    saveShopCart();

    updateShopCartCount();

}


/*
----------------------------------
GET CART TOTAL ITEMS
----------------------------------
*/

function getShopCartItemCount(){

    return cart.reduce(
        (total,item) =>
            total + (item.quantity || 1),
        0
    );

}


/*
----------------------------------
GET CART SUBTOTAL
----------------------------------
*/

function getShopCartSubtotal(){

    return cart.reduce(
        (total,item) => {

            const quantity =
                item.quantity || 1;

            return total +
                (item.price * quantity);

        },
        0
    );

}


/*
----------------------------------
 FORMAT MONEY
----------------------------------
*/

function formatShopPrice(amount){

    return new Intl.NumberFormat(
        "en-US",
        {
            style:"currency",
            currency:"USD"
        }
    ).format(amount);

}


/*
----------------------------------
 CART SUMMARY
----------------------------------
*/

function getShopCartSummary(){

    const itemCount =
        getShopCartItemCount();

    const subtotal =
        getShopCartSubtotal();


    return {

        itemCount:itemCount,

        subtotal:subtotal,

        formattedSubtotal:
            formatShopPrice(subtotal)

    };

}


/*
----------------------------------
 INITIAL CART COUNTER
----------------------------------
*/

updateShopCartCount();
/* ==========================================
   CARTIVA SHOP
   shop.js
   PART 7 — WISHLIST FUNCTIONALITY
========================================== */


/*
----------------------------------
SAVE WISHLIST
----------------------------------
*/

function saveShopWishlist(){

    localStorage.setItem(
        "cartivaWishlist",
        JSON.stringify(wishlist)
    );

}


/*
----------------------------------
CHECK WISHLIST
----------------------------------
*/

function isShopWishlisted(id){

    return wishlist.some(
        item =>
            item.id === Number(id)
    );

}


/*
----------------------------------
ADD / REMOVE WISHLIST
----------------------------------
*/

function toggleShopWishlist(id){

    const product =
        findShopProduct(id);


    /*
    Make sure product exists.
    */

    if(!product){

        showShopToast(
            "Product could not be found."
        );

        return;

    }


    /*
    Check current wishlist state.
    */

    const alreadyWishlisted =
        isShopWishlisted(id);


    if(alreadyWishlisted){

        /*
        Remove product.
        */

        wishlist =
            wishlist.filter(
                item =>
                    item.id !== Number(id)
            );


        showShopToast(
            `${product.name} removed from wishlist.`
        );

    }else{

        /*
        Add product.
        */

        wishlist.push({

            ...product

        });


        showShopToast(
            `${product.name} added to wishlist.`
        );

    }


    /*
    Save wishlist.
    */

    saveShopWishlist();


    /*
    Refresh product cards so
    the heart icon changes.
    */

    renderShopProducts();

}


/*
----------------------------------
REMOVE FROM WISHLIST
----------------------------------
*/

function removeShopWishlist(id){

    const product =
        findShopProduct(id);


    wishlist =
        wishlist.filter(
            item =>
                item.id !== Number(id)
        );


    saveShopWishlist();


    if(product){

        showShopToast(
            `${product.name} removed from wishlist.`
        );

    }


    /*
    Refresh the shop if we are
    currently viewing it.
    */

    renderShopProducts();

}


/*
----------------------------------
CLEAR WISHLIST
----------------------------------
*/

function clearShopWishlist(){

    if(wishlist.length === 0){

        showShopToast(
            "Your wishlist is already empty."
        );

        return;

    }


    wishlist = [];


    saveShopWishlist();


    renderShopProducts();


    showShopToast(
        "Wishlist cleared."
    );

}


/*
----------------------------------
GET WISHLIST COUNT
----------------------------------
*/

function getShopWishlistCount(){

    return wishlist.length;

}


/*
----------------------------------
UPDATE WISHLIST COUNTER
----------------------------------
*/

function updateShopWishlistCount(){

    const counters =
        document.querySelectorAll(
            "#wishlist-count"
        );


    counters.forEach(
        counter => {

            counter.textContent =
                wishlist.length;

        }
    );

}


/*
----------------------------------
INITIAL WISHLIST COUNTER
----------------------------------
*/

updateShopWishlistCount();
/* ==========================================
   CARTIVA SHOP
   shop.js
   PART 8 — FINAL INITIALIZATION
========================================== */


/*
----------------------------------
SAFE LOCAL STORAGE
----------------------------------
*/

function safelyLoadShopStorage(){

    try{

        const savedCart =
            JSON.parse(
                localStorage.getItem("cartivaCart")
            );

        const savedWishlist =
            JSON.parse(
                localStorage.getItem("cartivaWishlist")
            );


        if(Array.isArray(savedCart)){

            cart = savedCart;

        }


        if(Array.isArray(savedWishlist)){

            wishlist = savedWishlist;

        }

    }catch(error){

        console.warn(
            "Cartiva storage could not be loaded.",
            error
        );

        cart = [];

        wishlist = [];

    }

}


/*
----------------------------------
REFRESH SHOP UI
----------------------------------
*/

function refreshShopUI(){

    updateShopCartCount();

    updateShopWishlistCount();

    renderShopProducts();

    updateShopStatus();

}


/*
----------------------------------
 PRODUCT IMAGE ERROR HANDLER
----------------------------------
*/

function setupProductImageFallback(){

    const images =
        document.querySelectorAll(
            ".product-card img"
        );


    images.forEach(image => {

        image.addEventListener(
            "error",
            function(){

                /*
                Replace broken image with
                a clean placeholder.
                */

                this.src =
                    "https://placehold.co/800x800/e2e8f0/475569?text=Cartiva+Product";

            },
            {
                once:true
            }
        );

    });

}


/*
----------------------------------
 OBSERVE NEW PRODUCT CARDS
----------------------------------
*/

function observeProductCards(){

    setupProductImageFallback();

}


/*
----------------------------------
 UPDATE AFTER RENDER
----------------------------------
*/

const originalRenderShopProducts =
    renderShopProducts;


renderShopProducts = function(){

    originalRenderShopProducts();

    observeProductCards();

};


/*
----------------------------------
 KEYBOARD ACCESSIBILITY
----------------------------------
*/

document.addEventListener(
    "keydown",
    function(event){

        /*
        Escape closes mobile menu.
        */

        if(event.key === "Escape"){

            const navLinks =
                document.querySelector(
                    ".nav-links"
                );

            if(navLinks){

                navLinks.classList.remove(
                    "show"
                );

            }

        }

    }
);


/*
----------------------------------
 MOBILE MENU
----------------------------------
*/

const shopMenuButton =
    document.getElementById(
        "menuBtn"
    );


if(
    shopMenuButton &&
    typeof navLinks !== "undefined" &&
    navLinks
){

    shopMenuButton.addEventListener(
        "click",
        function(){

            const isOpen =
                navLinks.classList.toggle(
                    "show"
                );


            /*
            Update accessibility state.
            */

            this.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        }
    );

}


/*
----------------------------------
 CLOSE MOBILE MENU AFTER LINK
----------------------------------
*/

document
    .querySelectorAll(
        ".nav-links a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            function(){

                if(
                    typeof navLinks !== "undefined" &&
                    navLinks
                ){

                    navLinks.classList.remove(
                        "show"
                    );

                }

            }
        );

    });


/*
----------------------------------
 NEWSLETTER
----------------------------------
*/

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );


if(newsletterForm){

    newsletterForm.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const emailInput =
                document.getElementById(
                    "newsletterEmail"
                );


            if(!emailInput){

                return;

            }


            const email =
                emailInput.value.trim();


            /*
            Basic email validation.
            */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if(!emailPattern.test(email)){

                showShopToast(
                    "Please enter a valid email address."
                );

                emailInput.focus();

                return;

            }


            /*
            Save newsletter subscription
            locally for this demo.
            */

            localStorage.setItem(
                "cartivaNewsletter",
                email
            );


            showShopToast(
                "You're subscribed to Cartiva deals!"
            );


            newsletterForm.reset();

        }
    );

}


/*
----------------------------------
 PAGE VISIBILITY
----------------------------------
*/

document.addEventListener(
    "visibilitychange",
    function(){

        /*
        When the user returns to the
        tab, synchronize localStorage.
        */

        if(
            document.visibilityState ===
            "visible"
        ){

            safelyLoadShopStorage();

            refreshShopUI();

        }

    }
);


/*
----------------------------------
 FINAL INITIALIZATION
----------------------------------
*/

function initializeCartivaShop(){

    /*
    Load saved data.
    */

    safelyLoadShopStorage();


    /*
    Update counters.
    */

    updateShopCartCount();

    updateShopWishlistCount();


    /*
    Render products.
    */

    renderShopProducts();


    /*
    Update buttons/counts.
    */

    updateShopStatus();


    /*
    Make sure images have fallbacks.
    */

    observeProductCards();


    console.log(
        "Cartiva Shop initialized successfully."
    );

}


/*
----------------------------------
 START SHOP
----------------------------------
*/

if(
    document.readyState ===
    "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        initializeCartivaShop
    );

}else{

    initializeCartivaShop();

}
/* =====================================================
   CARTIVA — LOAD MORE PRODUCTS
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const loadMoreBtn = document.getElementById("loadMore");
    const productGrid = document.querySelector(".product-grid");

    if (!loadMoreBtn || !productGrid) {
        return;
    }

    const products = Array.from(
        productGrid.querySelectorAll(".product-card")
    );

    // Number of products visible when the page first loads
    const initialProducts = 8;

    // Number of products revealed per click
    const productsPerLoad = 4;

    let visibleProducts = initialProducts;


    function updateProducts() {

        products.forEach((product, index) => {

            if (index < visibleProducts) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });


        // Change button when everything has been displayed
        if (visibleProducts >= products.length) {

            loadMoreBtn.textContent = "All Products Loaded";

            loadMoreBtn.disabled = true;

            loadMoreBtn.style.opacity = "0.55";

            loadMoreBtn.style.cursor = "not-allowed";

        } else {

            loadMoreBtn.textContent = "Load More Products";

            loadMoreBtn.disabled = false;

            loadMoreBtn.style.opacity = "1";

            loadMoreBtn.style.cursor = "pointer";

        }

    }


    loadMoreBtn.addEventListener("click", function () {

        // Reveal 4 more products
        visibleProducts += productsPerLoad;

        updateProducts();


        // Smoothly move toward the newly revealed products
        const nextProduct =
            products[Math.min(
                visibleProducts - productsPerLoad,
                products.length - 1
            )];

        if (nextProduct) {

            setTimeout(() => {

                nextProduct.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 100);

        }

    });


    // Run when the page first loads
    //updateProducts();

});
renderShopProducts();
window.getProductById = function(id){

    return window.shopProducts.find(
        product => product.id === Number(id)
    );

};