/* ==========================================
   CARTIVA PRODUCT
   product.js
   PART 1 — PRODUCT DATA & STATE
========================================== */


/*
----------------------------------
PRODUCT DATABASE
----------------------------------
*/

const productDatabase = [

    {
        id: 1,

        name: "Premium Wireless Headphones",

        category: "Electronics",

        price: 129.99,

        oldPrice: 179.99,

        discount: 28,

        rating: 4.8,

        reviews: 128,

        popularity: 98,

        newest: 10,

        description:
            "Experience powerful sound, premium comfort and all-day battery life with these wireless headphones. Designed for music lovers who want exceptional audio quality wherever they go.",

        images: [

            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200",

            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200",

            "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=1200",

            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200"

        ],

        colors: [
            "Midnight Black",
            "Silver",
            "White",
            "Blue"
        ],

        sizes: [
            "Standard",
            "Large",
            "XL"
        ],

        specifications: {

            Brand: "Cartiva",

            Type: "Wireless Headphones",

            Connectivity: "Bluetooth 5.3",

            Battery: "Up to 40 hours",

            Charging: "USB-C",

            Weight: "265g",

            Warranty: "12 Months"

        }

    },


    {
        id: 2,

        name: "Urban Classic Sneakers",

        category: "Fashion",

        price: 74.99,

        oldPrice: 99.99,

        discount: 25,

        rating: 4.7,

        reviews: 94,

        popularity: 91,

        newest: 8,

        description:
            "Clean, versatile sneakers designed for everyday comfort. A lightweight sole and premium finish make them perfect for casual outfits.",

        images: [

            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200",

            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200",

            "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200"

        ],

        colors: [
            "Black",
            "White",
            "Red"
        ],

        sizes: [
            "7",
            "8",
            "9",
            "10",
            "11"
        ],

        specifications: {

            Brand: "Cartiva",

            Type: "Lifestyle Sneakers",

            Material: "Synthetic Leather",

            Sole: "Rubber",

            Weight: "310g",

            Warranty: "6 Months"

        }

    },


    {
        id: 3,

        name: "Minimalist Smart Watch",

        category: "Electronics",

        price: 149.99,

        oldPrice: 199.99,

        discount: 25,

        rating: 4.6,

        reviews: 76,

        popularity: 88,

        newest: 12,

        description:
            "A modern smartwatch with health tracking, notifications, fitness features and a bright edge-to-edge display.",

        images: [

            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200",

            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1200",

            "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=1200"

        ],

        colors: [
            "Black",
            "Silver",
            "Gold"
        ],

        sizes: [
            "40mm",
            "44mm"
        ],

        specifications: {

            Brand: "Cartiva",

            Display: "AMOLED",

            Connectivity: "Bluetooth",

            Battery: "Up to 7 days",

            WaterResistance: "5 ATM",

            Warranty: "12 Months"

        }

    },


    {
        id: 4,

        name: "Everyday Leather Backpack",

        category: "Accessories",

        price: 89.99,

        oldPrice: 119.99,

        discount: 25,

        rating: 4.9,

        reviews: 61,

        popularity: 84,

        newest: 7,

        description:
            "A refined everyday backpack with a spacious interior, laptop compartment and premium leather finish.",

        images: [

            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200",

            "https://images.unsplash.com/photo-1491637639811-60e20d0b48b1?w=1200",

            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1200"

        ],

        colors: [
            "Brown",
            "Black",
            "Tan"
        ],

        sizes: [
            "Standard"
        ],

        specifications: {

            Brand: "Cartiva",

            Material: "Premium Leather",

            Capacity: "22L",

            LaptopSize: "Up to 15.6 inches",

            Weight: "850g",

            Warranty: "12 Months"

        }

    },


    {
        id: 5,

        name: "Hydrating Glow Skincare Set",

        category: "Beauty",

        price: 54.99,

        oldPrice: 69.99,

        discount: 21,

        rating: 4.8,

        reviews: 113,

        popularity: 95,

        newest: 11,

        description:
            "A simple skincare routine designed to hydrate, refresh and give your skin a healthy natural glow.",

        images: [

            "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=1200",

            "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200",

            "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200"

        ],

        colors: [
            "Original"
        ],

        sizes: [
            "Standard"
        ],

        specifications: {

            Brand: "Cartiva Beauty",

            SkinType: "All Skin Types",

            Products: "4 Piece Set",

            CrueltyFree: "Yes",

            Volume: "240ml",

            Warranty: "N/A"

        }

    }

];


/*
----------------------------------
CART & WISHLIST STATE
----------------------------------
*/

let cart = [];

let wishlist = [];


/*
----------------------------------
CURRENT PRODUCT
----------------------------------
*/

let currentProduct = null;


/*
----------------------------------
SELECTED VARIANTS
----------------------------------
*/

let selectedColor = "";

let selectedSize = "";

let selectedQuantity = 1;


/*
----------------------------------
LOAD CART
----------------------------------
*/

function loadProductCart(){

    try{

        const savedCart =
            JSON.parse(
                localStorage.getItem("cartivaCart")
            );

        if(Array.isArray(savedCart)){

            cart = savedCart;

        }

    }catch(error){

        console.warn(
            "Unable to load cart.",
            error
        );

        cart = [];

    }

}


/*
----------------------------------
LOAD WISHLIST
----------------------------------
*/

function loadProductWishlist(){

    try{

        const savedWishlist =
            JSON.parse(
                localStorage.getItem("cartivaWishlist")
            );

        if(Array.isArray(savedWishlist)){

            wishlist = savedWishlist;

        }

    }catch(error){

        console.warn(
            "Unable to load wishlist.",
            error
        );

        wishlist = [];

    }

}


/*
----------------------------------
GET PRODUCT FROM URL
----------------------------------
*/

function getProductIdFromURL(){

    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        Number(
            params.get("id")
        );


    return id || 1;

}


/*
----------------------------------
GET CURRENT PRODUCT
----------------------------------
*/

function getCurrentProduct(){

    const productId =
        getProductIdFromURL();


    return productDatabase.find(
        product =>
            product.id === productId
    ) || productDatabase[0];

}


/*
----------------------------------
INITIAL PRODUCT
----------------------------------
*/

currentProduct =
    getCurrentProduct();


/*
----------------------------------
INITIAL VARIANTS
----------------------------------
*/

if(currentProduct){

    selectedColor =
        currentProduct.colors[0] || "";

    selectedSize =
        currentProduct.sizes[0] || "";

}


/*
----------------------------------
LOAD SAVED DATA
----------------------------------
*/

loadProductCart();

loadProductWishlist();
/* ==========================================
   CARTIVA PRODUCT
   product.js
   PART 2 — RENDER PRODUCT
========================================== */


/*
----------------------------------
ELEMENT HELPER
----------------------------------
*/

function productElement(id){

    return document.getElementById(id);

}


/*
----------------------------------
FORMAT PRICE
----------------------------------
*/

function formatProductPrice(price){

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD"
        }
    ).format(price);

}


/*
----------------------------------
UPDATE PAGE TITLE
----------------------------------
*/

function updateProductTitle(){

    if(!currentProduct){

        return;

    }

    document.title =
        `${currentProduct.name} | Cartiva`;

}


/*
----------------------------------
UPDATE BREADCRUMB
----------------------------------
*/

function updateProductBreadcrumb(){

    const breadcrumb =
        productElement(
            "breadcrumbProduct"
        );


    if(breadcrumb){

        breadcrumb.textContent =
            currentProduct.name;

    }

}


/*
----------------------------------
UPDATE BASIC PRODUCT INFO
----------------------------------
*/

function renderProductInformation(){

    if(!currentProduct){

        return;

    }


    const name =
        productElement(
            "productName"
        );

    const category =
        productElement(
            "productCategory"
        );

    const price =
        productElement(
            "productPrice"
        );

    const oldPrice =
        productElement(
            "productOldPrice"
        );

    const description =
        productElement(
            "productDescription"
        );

    const rating =
        productElement(
            "productRating"
        );

    const discount =
        productElement(
            "productDiscount"
        );


    if(name){

        name.textContent =
            currentProduct.name;

    }


    if(category){

        category.textContent =
            currentProduct.category;

    }


    if(price){

        price.textContent =
            formatProductPrice(
                currentProduct.price
            );

    }


    if(oldPrice){

        if(currentProduct.oldPrice){

            oldPrice.textContent =
                formatProductPrice(
                    currentProduct.oldPrice
                );

        }else{

            oldPrice.style.display =
                "none";

        }

    }


    if(description){

        description.textContent =
            currentProduct.description;

    }


    if(rating){

        rating.textContent =
            currentProduct.rating;

    }


    if(discount){

        if(currentProduct.discount){

            discount.textContent =
                `-${currentProduct.discount}%`;

        }else{

            discount.style.display =
                "none";

        }

    }

}


/*
----------------------------------
MAIN PRODUCT IMAGE
----------------------------------
*/

function renderMainProductImage(){

    if(!currentProduct){

        return;

    }


    const mainImage =
        productElement(
            "mainProductImage"
        );


    if(
        mainImage &&
        currentProduct.images.length
    ){

        mainImage.src =
            currentProduct.images[0];

        mainImage.alt =
            currentProduct.name;

    }

}


/*
----------------------------------
 PRODUCT THUMBNAILS
----------------------------------
*/

function renderProductThumbnails(){

    if(!currentProduct){

        return;

    }


    const container =
        productElement(
            "productThumbnails"
        );


    if(!container){

        return;

    }


    container.innerHTML = "";


    currentProduct.images.forEach(
        (image,index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.className =
                "thumbnail";


            if(index === 0){

                button.classList.add(
                    "active"
                );

            }


            button.innerHTML = `

                <img
                    src="${image}"
                    alt="${currentProduct.name} view ${index + 1}">

            `;


            button.addEventListener(
                "click",
                () => {

                    changeMainProductImage(
                        image,
                        button
                    );

                }
            );


            container.appendChild(
                button
            );

        }
    );

}


/*
----------------------------------
CHANGE MAIN IMAGE
----------------------------------
*/

function changeMainProductImage(
    image,
    thumbnail
){

    const mainImage =
        productElement(
            "mainProductImage"
        );


    if(mainImage){

        mainImage.src =
            image;

    }


    document
        .querySelectorAll(
            ".product-thumbnails .thumbnail"
        )
        .forEach(
            button => {

                button.classList.remove(
                    "active"
                );

            }
        );


    if(thumbnail){

        thumbnail.classList.add(
            "active"
        );

    }

}


/*
----------------------------------
RENDER COLORS
----------------------------------
*/

function renderProductColors(){

    if(!currentProduct){

        return;

    }


    const container =
        document.querySelector(
            ".color-options"
        );


    if(!container){

        return;

    }


    container.innerHTML = "";


    const colorStyles = {

        "Midnight Black": "#111827",

        "Black": "#111827",

        "Silver": "#cbd5e1",

        "White": "#ffffff",

        "Blue": "#2563eb",

        "Red": "#dc2626",

        "Gold": "#eab308",

        "Brown": "#78350f",

        "Tan": "#d6a77a",

        "Original": "#f1c7b8"

    };


    currentProduct.colors.forEach(
        (color,index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.className =
                "color-option";


            button.dataset.color =
                color;


            button.setAttribute(
                "aria-label",
                color
            );


            button.style.background =
                colorStyles[color] ||
                "#64748b";


            if(
                color === selectedColor ||
                index === 0
            ){

                button.classList.add(
                    "active"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    selectProductColor(
                        color
                    );

                }
            );


            container.appendChild(
                button
            );

        }
    );


    updateSelectedColor();

}


/*
----------------------------------
SELECT COLOR
----------------------------------
*/

function selectProductColor(color){

    selectedColor =
        color;


    document
        .querySelectorAll(
            ".color-option"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.color === color
                );

            }
        );


    updateSelectedColor();

}


/*
----------------------------------
UPDATE COLOR TEXT
----------------------------------
*/

function updateSelectedColor(){

    const element =
        productElement(
            "selectedColor"
        );


    if(element){

        element.textContent =
            selectedColor;

    }

}


/*
----------------------------------
RENDER SIZES
----------------------------------
*/

function renderProductSizes(){

    if(!currentProduct){

        return;

    }


    const container =
        document.querySelector(
            ".size-options"
        );


    if(!container){

        return;

    }


    container.innerHTML = "";


    currentProduct.sizes.forEach(
        (size,index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.className =
                "size-option";


            button.dataset.size =
                size;


            button.textContent =
                size;


            if(
                size === selectedSize ||
                index === 0
            ){

                button.classList.add(
                    "active"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    selectProductSize(
                        size
                    );

                }
            );


            container.appendChild(
                button
            );

        }
    );


    updateSelectedSize();

}


/*
----------------------------------
SELECT SIZE
----------------------------------
*/

function selectProductSize(size){

    selectedSize =
        size;


    document
        .querySelectorAll(
            ".size-option"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.size === size
                );

            }
        );


    updateSelectedSize();

}


/*
----------------------------------
UPDATE SIZE TEXT
----------------------------------
*/

function updateSelectedSize(){

    const element =
        productElement(
            "selectedSize"
        );


    if(element){

        element.textContent =
            selectedSize;

    }

}


/*
----------------------------------
RENDER SPECIFICATIONS
----------------------------------
*/

function renderProductSpecifications(){

    if(!currentProduct){

        return;

    }


    const container =
        document.querySelector(
            ".specifications-table"
        );


    if(!container){

        return;

    }


    container.innerHTML = "";


    Object.entries(
        currentProduct.specifications
    ).forEach(
        ([name,value]) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "spec-row";


            row.innerHTML = `

                <span>
                    ${name}
                </span>

                <strong>
                    ${value}
                </strong>

            `;


            container.appendChild(
                row
            );

        }
    );

}


/*
----------------------------------
RENDER EVERYTHING
----------------------------------
*/

function renderCurrentProduct(){

    if(!currentProduct){

        return;

    }


    updateProductTitle();

    updateProductBreadcrumb();

    renderProductInformation();

    renderMainProductImage();

    renderProductThumbnails();

    renderProductColors();

    renderProductSizes();

    renderProductSpecifications();

}
/* ==========================================
   CARTIVA PRODUCT
   product.js
   PART 3 — CART, QUANTITY & WISHLIST
========================================== */


/*
----------------------------------
SAVE CART
----------------------------------
*/

function saveProductCart(){

    localStorage.setItem(
        "cartivaCart",
        JSON.stringify(cart)
    );

}


/*
----------------------------------
SAVE WISHLIST
----------------------------------
*/

function saveProductWishlist(){

    localStorage.setItem(
        "cartivaWishlist",
        JSON.stringify(wishlist)
    );

}


/*
----------------------------------
UPDATE CART COUNTER
----------------------------------
*/

function updateProductCartCount(){

    const counters =
        document.querySelectorAll(
            "#cart-count"
        );


    const total =
        cart.reduce(
            (sum,item) =>
                sum + (item.quantity || 1),
            0
        );


    counters.forEach(
        counter => {

            counter.textContent =
                total;

        }
    );

}


/*
----------------------------------
UPDATE WISHLIST COUNTER
----------------------------------
*/

function updateProductWishlistCount(){

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
QUANTITY INPUT
----------------------------------
*/

function updateQuantityDisplay(){

    const input =
        productElement(
            "productQuantity"
        );


    if(input){

        input.value =
            selectedQuantity;

    }

}


/*
----------------------------------
INCREASE QUANTITY
----------------------------------
*/

function increaseProductQuantity(){

    if(selectedQuantity >= 99){

        showProductToast(
            "Maximum quantity is 99."
        );

        return;

    }


    selectedQuantity++;

    updateQuantityDisplay();

}


/*
----------------------------------
DECREASE QUANTITY
----------------------------------
*/

function decreaseProductQuantity(){

    if(selectedQuantity <= 1){

        return;

    }


    selectedQuantity--;

    updateQuantityDisplay();

}


/*
----------------------------------
MANUAL QUANTITY INPUT
----------------------------------
*/

function handleQuantityInput(){

    const input =
        productElement(
            "productQuantity"
        );


    if(!input){

        return;

    }


    let value =
        Number(input.value);


    if(
        !Number.isFinite(value) ||
        value < 1
    ){

        value = 1;

    }


    if(value > 99){

        value = 99;

    }


    selectedQuantity =
        Math.floor(value);


    updateQuantityDisplay();

}


/*
----------------------------------
FIND CART PRODUCT
----------------------------------
*/

function findCartProduct(id){

    return cart.find(
        item =>
            Number(item.id) === Number(id)
    );

}


/*
----------------------------------
ADD PRODUCT TO CART
----------------------------------
*/

function addCurrentProductToCart(){

    if(!currentProduct){

        showProductToast(
            "Product is unavailable."
        );

        return;

    }


    const existing =
        findCartProduct(
            currentProduct.id
        );


    if(existing){

        existing.quantity =
            (existing.quantity || 1)
            +
            selectedQuantity;

    }else{

        cart.push({

            ...currentProduct,

            quantity:
                selectedQuantity,

            selectedColor:
                selectedColor,

            selectedSize:
                selectedSize

        });

    }


    saveProductCart();

    updateProductCartCount();


    showProductToast(
        `${currentProduct.name} added to cart.`
    );

}


/*
----------------------------------
BUY NOW
----------------------------------
*/

function buyCurrentProduct(){

    if(!currentProduct){

        return;

    }


    const existing =
        findCartProduct(
            currentProduct.id
        );


    if(existing){

        existing.quantity =
            (existing.quantity || 1)
            +
            selectedQuantity;

    }else{

        cart.push({

            ...currentProduct,

            quantity:
                selectedQuantity,

            selectedColor:
                selectedColor,

            selectedSize:
                selectedSize

        });

    }


    saveProductCart();

    updateProductCartCount();


    /*
    Go to checkout.
    */

    window.location.href =
        "checkout.html";

}


/*
----------------------------------
CHECK WISHLIST
----------------------------------
*/

function productIsInWishlist(){

    if(!currentProduct){

        return false;

    }


    return wishlist.some(
        item =>
            Number(item.id) ===
            Number(currentProduct.id)
    );

}


/*
----------------------------------
UPDATE WISHLIST BUTTON
----------------------------------
*/

function updateProductWishlistButton(){

    const buttons = [

        productElement(
            "productWishlist"
        ),

        productElement(
            "galleryWishlist"
        )

    ];


    const active =
        productIsInWishlist();


    buttons.forEach(
        button => {

            if(!button){

                return;

            }


            const icon =
                button.querySelector(
                    "i"
                );


            if(active){

                button.classList.add(
                    "active"
                );


                if(icon){

                    icon.className =
                        "fa-solid fa-heart";

                }


                if(
                    button.id ===
                    "productWishlist"
                ){

                    /*
                    Preserve icon and change
                    the text without destroying
                    the icon.
                    */

                    button.innerHTML = `

                        <i class="fa-solid fa-heart"></i>

                        Added to Wishlist

                    `;

                }

            }else{

                button.classList.remove(
                    "active"
                );


                if(icon){

                    icon.className =
                        "fa-regular fa-heart";

                }


                if(
                    button.id ===
                    "productWishlist"
                ){

                    button.innerHTML = `

                        <i class="fa-regular fa-heart"></i>

                        Add to Wishlist

                    `;

                }

            }

        }
    );

}


/*
----------------------------------
TOGGLE WISHLIST
----------------------------------
*/

function toggleCurrentProductWishlist(){

    if(!currentProduct){

        return;

    }


    const index =
        wishlist.findIndex(
            item =>
                Number(item.id) ===
                Number(currentProduct.id)
        );


    if(index !== -1){

        wishlist.splice(
            index,
            1
        );


        showProductToast(
            `${currentProduct.name} removed from wishlist.`
        );

    }else{

        wishlist.push({

            ...currentProduct

        });


        showProductToast(
            `${currentProduct.name} added to wishlist.`
        );

    }


    saveProductWishlist();

    updateProductWishlistCount();

    updateProductWishlistButton();

}


/*
----------------------------------
TOAST
----------------------------------
*/

function showProductToast(message){

    const toast =
        productElement(
            "productToast"
        );


    if(!toast){

        return;

    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.cartivaToastTimer
    );


    window.cartivaToastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/*
----------------------------------
QUANTITY BUTTON EVENTS
----------------------------------
*/

const quantityMinus =
    productElement(
        "quantityMinus"
    );


const quantityPlus =
    productElement(
        "quantityPlus"
    );


const quantityInput =
    productElement(
        "productQuantity"
    );


if(quantityMinus){

    quantityMinus.addEventListener(
        "click",
        decreaseProductQuantity
    );

}


if(quantityPlus){

    quantityPlus.addEventListener(
        "click",
        increaseProductQuantity
    );

}


if(quantityInput){

    quantityInput.addEventListener(
        "input",
        handleQuantityInput
    );

}


/*
----------------------------------
ADD TO CART BUTTON
----------------------------------
*/

const addToCartButton =
    productElement(
        "addProductToCart"
    );


if(addToCartButton){

    addToCartButton.addEventListener(
        "click",
        addCurrentProductToCart
    );

}


/*
----------------------------------
BUY NOW BUTTON
----------------------------------
*/

const buyNowButton =
    productElement(
        "buyNow"
    );


if(buyNowButton){

    buyNowButton.addEventListener(
        "click",
        buyCurrentProduct
    );

}


/*
----------------------------------
WISHLIST BUTTONS
----------------------------------
*/

const productWishlistButton =
    productElement(
        "productWishlist"
    );


const galleryWishlistButton =
    productElement(
        "galleryWishlist"
    );


if(productWishlistButton){

    productWishlistButton.addEventListener(
        "click",
        toggleCurrentProductWishlist
    );

}


if(galleryWishlistButton){

    galleryWishlistButton.addEventListener(
        "click",
        toggleCurrentProductWishlist
    );

}


/*
----------------------------------
INITIAL COUNTERS
----------------------------------
*/

updateProductCartCount();

updateProductWishlistCount();

updateProductWishlistButton();
/* ==========================================
   CARTIVA PRODUCT
   product.js
   PART 4 — TABS, REVIEWS & RELATED PRODUCTS
========================================== */


/*
----------------------------------
PRODUCT TABS
----------------------------------
*/

function setupProductTabs(){

    const tabs =
        document.querySelectorAll(
            ".product-tab"
        );

    const contents =
        document.querySelectorAll(
            ".tab-content"
        );


    if(!tabs.length){

        return;

    }


    tabs.forEach(tab => {

        tab.addEventListener(
            "click",
            function(){

                const target =
                    this.dataset.tab;


                /*
                Remove active state
                from all tabs.
                */

                tabs.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                /*
                Remove active state
                from all content.
                */

                contents.forEach(
                    content => {

                        content.classList.remove(
                            "active"
                        );

                    }
                );


                /*
                Activate selected tab.
                */

                this.classList.add(
                    "active"
                );


                const selectedContent =
                    document.getElementById(
                        target
                    );


                if(selectedContent){

                    selectedContent.classList.add(
                        "active"
                    );

                }

            }
        );

    });

}


/*
----------------------------------
RELATED PRODUCTS
----------------------------------
*/

function renderRelatedProducts(){

    const container =
        productElement(
            "relatedProducts"
        );


    if(!container){

        return;

    }


    /*
    Find products from the same
    category first.
    */

    let related =
        productDatabase.filter(
            product =>
                product.id !==
                currentProduct.id &&
                product.category ===
                currentProduct.category
        );


    /*
    If there aren't enough products
    from the same category, add
    other popular products.
    */

    if(related.length < 4){

        const additional =
            productDatabase.filter(
                product =>
                    product.id !==
                    currentProduct.id &&
                    !related.some(
                        item =>
                            item.id ===
                            product.id
                    )
            );


        related =
            [
                ...related,
                ...additional
            ];

    }


    /*
    Limit related products.
    */

    related =
        related.slice(
            0,
            4
        );


    container.innerHTML = "";


    related.forEach(
        product => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "related-product-card";


            card.innerHTML = `

                <a
                    href="product.html?id=${product.id}"
                    class="related-product-image">

                    <img
                        src="${product.images[0]}"
                        alt="${product.name}"
                        loading="lazy">

                    ${
                        product.discount
                        ?
                        `
                        <span class="related-discount">
                            -${product.discount}%
                        </span>
                        `
                        :
                        ""
                    }

                </a>


                <div class="related-product-info">

                    <span class="related-category">

                        ${product.category}

                    </span>


                    <h3>

                        <a
                            href="product.html?id=${product.id}">

                            ${product.name}

                        </a>

                    </h3>


                    <div class="related-rating">

                        <span>
                            ★★★★★
                        </span>

                        <small>
                            ${product.rating}
                        </small>

                    </div>


                    <div class="related-price">

                        <strong>

                            ${formatProductPrice(
                                product.price
                            )}

                        </strong>


                        ${
                            product.oldPrice
                            ?
                            `
                            <del>

                                ${formatProductPrice(
                                    product.oldPrice
                                )}

                            </del>
                            `
                            :
                            ""
                        }

                    </div>


                    <button
                        class="related-add-cart"
                        data-product-id="${product.id}"
                        type="button">

                        <i class="fa-solid fa-cart-shopping"></i>

                        Add to Cart

                    </button>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );


    /*
    Add-to-cart events.
    */

    container
        .querySelectorAll(
            ".related-add-cart"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function(){

                        const id =
                            Number(
                                this.dataset.productId
                            );


                        const product =
                            productDatabase.find(
                                item =>
                                    item.id === id
                            );


                        if(!product){

                            return;

                        }


                        const existing =
                            cart.find(
                                item =>
                                    Number(item.id) === id
                            );


                        if(existing){

                            existing.quantity =
                                (existing.quantity || 1) + 1;

                        }else{

                            cart.push({

                                ...product,

                                quantity:1

                            });

                        }


                        saveProductCart();

                        updateProductCartCount();


                        showProductToast(
                            `${product.name} added to cart.`
                        );

                    }
                );

            }
        );

}


/*
----------------------------------
REVIEW LOADING
----------------------------------
*/

const loadReviewsButton =
    productElement(
        "loadReviews"
    );


if(loadReviewsButton){

    loadReviewsButton.addEventListener(
        "click",
        function(){

            /*
            This is mock review functionality.
            In a real backend, additional reviews
            would be fetched from an API.
            */

            const reviewsGrid =
                document.querySelector(
                    ".reviews-grid"
                );


            if(!reviewsGrid){

                return;

            }


            const additionalReviews = [

                {
                    initials:"SO",
                    name:"Sarah Okafor",
                    rating:"★★★★★",
                    title:"Worth every penny",
                    text:"The build quality is excellent and the headphones feel much more expensive than they actually are.",
                    date:"July 21, 2026"
                },

                {
                    initials:"MT",
                    name:"Michael Thompson",
                    rating:"★★★★★",
                    title:"Fantastic purchase",
                    text:"Delivery was quick and the product arrived perfectly packaged. I've been using it every day since.",
                    date:"July 16, 2026"
                },

                {
                    initials:"LN",
                    name:"Lisa Nguyen",
                    rating:"★★★★☆",
                    title:"Very impressed",
                    text:"Great product overall. The sound quality and comfort are the highlights for me.",
                    date:"July 10, 2026"
                }

            ];


            additionalReviews.forEach(
                review => {

                    const article =
                        document.createElement(
                            "article"
                        );


                    article.className =
                        "review-card";


                    article.innerHTML = `

                        <div class="review-header">

                            <div class="review-avatar">

                                ${review.initials}

                            </div>


                            <div>

                                <h3>
                                    ${review.name}
                                </h3>

                                <small>
                                    Verified Purchase
                                </small>

                            </div>

                        </div>


                        <div class="review-stars">

                            ${review.rating}

                        </div>


                        <h4>

                            ${review.title}

                        </h4>


                        <p>

                            ${review.text}

                        </p>


                        <span class="review-date">

                            ${review.date}

                        </span>

                    `;


                    reviewsGrid.appendChild(
                        article
                    );

                }
            );


            /*
            Prevent loading the same
            reviews repeatedly.
            */

            this.disabled = true;

            this.textContent =
                "All Reviews Loaded";

        }
    );

}


/*
----------------------------------
NEWSLETTER
----------------------------------
*/

function setupProductNewsletter(){

    const form =
        productElement(
            "newsletterForm"
        );


    if(!form){

        return;

    }


    form.addEventListener(
        "submit",
        function(event){

            event.preventDefault();


            const input =
                productElement(
                    "newsletterEmail"
                );


            if(!input){

                return;

            }


            const email =
                input.value.trim();


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if(!emailPattern.test(email)){

                showProductToast(
                    "Please enter a valid email address."
                );

                input.focus();

                return;

            }


            localStorage.setItem(
                "cartivaNewsletter",
                email
            );


            showProductToast(
                "You're subscribed to Cartiva deals!"
            );


            form.reset();

        }
    );

}


/*
----------------------------------
IMAGE FALLBACK
----------------------------------
*/

function setupProductImageFallback(){

    document
        .querySelectorAll(
            "img"
        )
        .forEach(
            image => {

                image.addEventListener(
                    "error",
                    function(){

                        this.src =
                            "https://placehold.co/800x800/e2e8f0/475569?text=Cartiva";

                    },
                    {
                        once:true
                    }
                );

            }
        );

}


/*
----------------------------------
RELATED IMAGE FALLBACK
----------------------------------
*/

function setupRelatedImageFallback(){

    document
        .querySelectorAll(
            ".related-product-card img"
        )
        .forEach(
            image => {

                image.addEventListener(
                    "error",
                    function(){

                        this.src =
                            "https://placehold.co/800x800/e2e8f0/475569?text=Cartiva";

                    },
                    {
                        once:true
                    }
                );

            }
        );

}
/* ==========================================
   CARTIVA PRODUCT
   product.js
   PART 5 — INITIALIZATION
========================================== */


/*
----------------------------------
INITIALIZE PRODUCT PAGE
----------------------------------
*/

function initializeProductPage(){

    /*
    Make sure the current product
    exists before doing anything.
    */

    if(!currentProduct){

        console.error(
            "Cartiva: Product not found."
        );

        return;

    }


    /*
    Render the product.
    */

    renderCurrentProduct();


    /*
    Render related products.
    */

    renderRelatedProducts();


    /*
    Setup product tabs.
    */

    setupProductTabs();


    /*
    Setup newsletter.
    */

    setupProductNewsletter();


    /*
    Setup image fallbacks.
    */

    setupProductImageFallback();


    /*
    Setup related image fallbacks.
    */

    setupRelatedImageFallback();


    /*
    Update cart information.
    */

    updateProductCartCount();


    /*
    Update wishlist information.
    */

    updateProductWishlistCount();

    updateProductWishlistButton();


    /*
    Set initial quantity.
    */

    selectedQuantity = 1;

    updateQuantityDisplay();


    /*
    Small entrance animation.
    */

    document
        .querySelectorAll(
            ".product-main-section, .product-tabs-section, .reviews-section, .related-products"
        )
        .forEach(
            (section,index) => {

                section.style.opacity = "0";

                section.style.transform =
                    "translateY(20px)";


                setTimeout(
                    () => {

                        section.style.transition =
                            "opacity 0.6s ease, transform 0.6s ease";

                        section.style.opacity =
                            "1";

                        section.style.transform =
                            "translateY(0)";

                    },
                    index * 100
                );

            }
        );

}


/*
----------------------------------
DOM READY
----------------------------------
*/

if(
    document.readyState ===
    "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        initializeProductPage
    );

}else{

    initializeProductPage();

}


/*
----------------------------------
HANDLE PAGE VISIBILITY
----------------------------------
*/

document.addEventListener(
    "visibilitychange",
    function(){

        if(
            document.visibilityState ===
            "visible"
        ){

            /*
            Refresh counters if the
            user returns to this tab.
            */

            loadProductCart();

            loadProductWishlist();

            updateProductCartCount();

            updateProductWishlistCount();

            updateProductWishlistButton();

        }

    }
);


/*
----------------------------------
HANDLE STORAGE CHANGES
----------------------------------
*/

window.addEventListener(
    "storage",
    function(event){

        if(event.key === "cartivaCart"){

            loadProductCart();

            updateProductCartCount();

        }


        if(event.key === "cartivaWishlist"){

            loadProductWishlist();

            updateProductWishlistCount();

            updateProductWishlistButton();

        }

    }
);


/*
----------------------------------
PRODUCT PAGE ERROR HANDLER
----------------------------------
*/

window.addEventListener(
    "error",
    function(event){

        console.error(
            "Cartiva product page error:",
            event.error || event.message
        );

    }
);


/*
----------------------------------
KEYBOARD ACCESSIBILITY
----------------------------------
*/

document.addEventListener(
    "keydown",
    function(event){

        /*
        Escape closes visible toast.
        */

        if(
            event.key ===
            "Escape"
        ){

            const toast =
                productElement(
                    "productToast"
                );


            if(toast){

                toast.classList.remove(
                    "show"
                );

            }

        }

    }
);