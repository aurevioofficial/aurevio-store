const products = [
 {id:1,name:"AUREVIO Classic",category:"Men's Watches",price:3499,desc:"A clean, versatile everyday timepiece.",symbol:"◷"},
 {id:2,name:"AUREVIO Elegance",category:"Women's Watches",price:3299,desc:"Refined lines with a warm gold finish.",symbol:"◷"},
 {id:3,name:"AUREVIO Pro Audio",category:"Headphones",price:2999,desc:"Immersive sound for everyday listening.",symbol:"♫"},
 {id:4,name:"AUREVIO SoundBox",category:"Speakers",price:2499,desc:"Portable sound, considered design.",symbol:"▣"},
 {id:5,name:"AUREVIO Buds",category:"Gadgets",price:1999,desc:"Compact wireless listening companion.",symbol:"◖"},
 {id:6,name:"AUREVIO Power",category:"Gadgets",price:1499,desc:"A practical essential for life on the move.",symbol:"ϟ"},
 {id:7,name:"AUREVIO Meridian",category:"Men's Watches",price:3999,desc:"A contemporary silhouette with presence.",symbol:"◷"},
 {id:8,name:"AUREVIO Lumière",category:"Women's Watches",price:2899,desc:"Minimal elegance for every occasion.",symbol:"◷"}
];
const money = n => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
let cart = [];
let activeFilter = "All";
const grid = document.getElementById("productGrid");
const count = document.getElementById("cartCount");
const overlay = document.getElementById("cartOverlay");
function renderProducts(){
 const visible = activeFilter==="All" ? products : products.filter(p=>p.category===activeFilter);
 grid.innerHTML = visible.map(p=>`<article class="product-card"><div class="product-image"><span class="product-symbol" aria-hidden="true">${p.symbol}</span></div><div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p class="product-description">${p.desc}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.id}">Add to bag +</button></div></div></article>`).join("");
 grid.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>addToCart(Number(b.dataset.add))));
}
function addToCart(id){const item=cart.find(x=>x.id===id); if(item)item.qty++;else cart.push({id,qty:1}); renderCart(); toast("Added to your bag");}
function renderCart(){
 const totalQty=cart.reduce((n,x)=>n+x.qty,0);count.textContent=totalQty;
 const items=document.getElementById("cartItems");
 if(!cart.length){items.innerHTML='<p class="empty">Your bag is waiting for something timeless.</p>';}
 else{items.innerHTML=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-row"><div><strong>${p.name}</strong><small>${p.category}</small><div class="quantity"><button data-minus="${p.id}" aria-label="Decrease quantity">−</button><span>${x.qty}</span><button data-plus="${p.id}" aria-label="Increase quantity">+</button></div><button class="remove" data-remove="${p.id}">Remove</button></div><b>${money(p.price*x.qty)}</b></div>`}).join("");
 items.querySelectorAll("[data-minus]").forEach(b=>b.onclick=()=>changeQty(+b.dataset.minus,-1));
 items.querySelectorAll("[data-plus]").forEach(b=>b.onclick=()=>changeQty(+b.dataset.plus,1));
 items.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{cart=cart.filter(x=>x.id!==+b.dataset.remove);renderCart()});
 }
 document.getElementById("subtotal").textContent=money(cart.reduce((n,x)=>n+products.find(p=>p.id===x.id).price*x.qty,0));
}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<1)cart=cart.filter(x=>x.id!==id);renderCart()}
function openCart(){overlay.hidden=false;document.body.style.overflow="hidden"}
function closeCart(){overlay.hidden=true;document.body.style.overflow=""}
function toast(message){const el=document.getElementById("toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),1800)}
document.getElementById("openCart").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("closeCartBackdrop").onclick=closeCart;
document.getElementById("checkoutButton").onclick=()=>toast("Checkout is not connected yet. Do not accept payments on this preview.");
document.getElementById("filters").querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{activeFilter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
document.querySelectorAll(".category-card").forEach(b=>b.onclick=()=>{activeFilter=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===activeFilter));renderProducts();document.getElementById("shop").scrollIntoView({behavior:"smooth"})});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
