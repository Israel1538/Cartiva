/* ==========================================
   CARTIVA
   script.js
========================================== */

// -----------------------------
// Sample Product Data
// -----------------------------

const products = [
{
id:1,
name:"Premium Wireless Headphones",
price:129.99,
oldPrice:179.99,
rating:4.8,
image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
},
{
id:2,
name:"Smart Watch Pro",
price:199.99,
oldPrice:249.99,
rating:4.7,
image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
},
{
id:3,
name:"Minimal Leather Backpack",
price:89.99,
oldPrice:119.99,
rating:4.9,
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
},
{
id:4,
name:"Modern Desk Lamp",
price:59.99,
oldPrice:79.99,
rating:4.6,
image:"https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800"
},
{
id:5,
name:"Bluetooth Speaker",
price:74.99,
oldPrice:99.99,
rating:4.5,
image:"https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800"
},
{
id:6,
name:"Running Sneakers",
price:109.99,
oldPrice:149.99,
rating:4.8,
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
},
{
id:7,
name:"Luxury Perfume",
price:95.00,
oldPrice:125.00,
rating:4.9,
image:"https://images.unsplash.com/photo-1541643600914-78b084683601?w=800"
},
{
id:8,
name:"Portable Camera",
price:329.99,
oldPrice:399.99,
rating:4.7,
image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"
}
];

// -----------------------------
// Local Storage
// -----------------------------

let cart = JSON.parse(localStorage.getItem("cartivaCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("cartivaWishlist")) || [];

// -----------------------------
// Render Products
// -----------------------------

const grid = document.getElementById("productGrid");

const shopGrid = document.getElementById("shopGrid");

if(grid){

grid.innerHTML = "";

products.forEach(product=>{

const stars = "★".repeat(Math.round(product.rating));

grid.innerHTML += `
<div class="product-card">

<div class="discount">
-${Math.round((1-product.price/product.oldPrice)*100)}%
</div>

<div class="wishlist" onclick="toggleWishlist(${product.id})">
<i class="fa-regular fa-heart"></i>
</div>

<div class="product-image">

<img src="${product.image}" alt="${product.name}">

</div>

<div class="product-info">

<h4>${product.name}</h4>

<div class="rating">
${stars}
<span>${product.rating}</span>
</div>

<div class="price">

<strong>$${product.price}</strong>

<span class="old">$${product.oldPrice}</span>

</div>

<button
class="add-cart"
onclick="addToCart(${product.id})">

Add to Cart

</button>

</div>

</div>
`;

});

}

// -----------------------------
// Cart
// -----------------------------

function addToCart(id){

const product = products.find(p=>p.id===id);

if(!product){
return;
}

const existing = cart.find(item=>item.id===id);

if(existing){

existing.quantity = (existing.quantity||1) + 1;

}else{

cart.push({...product, quantity:1});

}

localStorage.setItem("cartivaCart",JSON.stringify(cart));

updateCartCount();

showToast(`${product.name} added to cart`);

}

function updateCartCount(){

const badge = document.getElementById("cart-count");

if(badge){

const total = cart.reduce((sum,item)=>sum+(Number(item.quantity)||1),0);

badge.innerText = total;

}

}

updateCartCount();

// -----------------------------
// Wishlist
// -----------------------------

function toggleWishlist(id){

const exists = wishlist.find(item=>item.id===id);

const product = products.find(p=>p.id===id);

if(exists){

wishlist = wishlist.filter(item=>item.id!==id);

showToast("Removed from wishlist");

}else{

wishlist.push(product);

showToast("Added to wishlist");

}

localStorage.setItem("cartivaWishlist",JSON.stringify(wishlist));

}

// -----------------------------
// Countdown Timer
// -----------------------------

const countdown = document.getElementById("countdown");

if(countdown){

const target = new Date();

target.setDate(target.getDate()+5);

function updateCountdown(){

const now = new Date();

const diff = target-now;

const days = Math.floor(diff/1000/60/60/24);

const hours = Math.floor(diff/1000/60/60)%24;

const mins = Math.floor(diff/1000/60)%60;

const secs = Math.floor(diff/1000)%60;

countdown.innerHTML=`

<span>${days}<small>Days</small></span>

<span>${hours}<small>Hours</small></span>

<span>${mins}<small>Min</small></span>

<span>${secs}<small>Sec</small></span>

`;

}

updateCountdown();

setInterval(updateCountdown,1000);

}

// -----------------------------
// Newsletter
// -----------------------------

const form = document.querySelector(".newsletter form");

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault();

const email = form.querySelector("input").value.trim();

const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!regex.test(email)){

showToast("Please enter a valid email");

return;

}

showToast("Thanks for subscribing!");

form.reset();

});

}

// -----------------------------
// Mobile Menu
// -----------------------------

// -----------------------------
// Toast
// -----------------------------

function showToast(message){

const toast=document.createElement("div");

toast.className="toast";

toast.innerText=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("active");

},50);

setTimeout(()=>{

toast.classList.remove("active");

setTimeout(()=>toast.remove(),300);

},2500);

}

// -----------------------------
// Reveal Animation
// -----------------------------

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("fade-up");

}

});

},{
threshold:.2
});

document.querySelectorAll("section").forEach(section=>{

observer.observe(section);

});

// -----------------------------
// Smooth Scroll
// -----------------------------

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute("href"));

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

console.log("Cartiva Loaded Successfully");