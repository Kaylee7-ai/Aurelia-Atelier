/* VECLÉRIA storefront — shared site behaviour */
(function () {
  "use strict";

  const CONFIG = {
    whatsapp: "233534332751",
    phone: "+233 53 433 2751",
    email: "cartoon247412@gmail.com",
    address: "Ghana",
    instagram: "@adjoayeboahclothing",
    instagramUrl: "https://www.instagram.com/adjoayeboahclothing/",
    hours: "Monday to Saturday, 9:00am – 7:00pm",
    currency: "GH₵",
    promo: { VELERIA10: 0.10 }
  };

  const PRODUCTS = [
    { id:"p01", name:"The Aurelia Evening Dress", category:"Dresses", price:680, tag:"Bestseller", description:"A refined evening silhouette with an elegant drape and timeless finish." },
    { id:"p02", name:"The Celeste Satin Midi", category:"Dresses", price:520, tag:"New", description:"A fluid satin-inspired midi for celebrations and special evenings." },
    { id:"p03", name:"The Solene Occasion Gown", category:"Dresses", price:890, tag:"Signature", description:"A statement occasion gown with graceful lines and a polished finish." },
    { id:"p04", name:"The Amara Tailored Dress", category:"Dresses", price:460, tag:"Essential", description:"A versatile tailored dress designed for day-to-evening styling." },
    { id:"p05", name:"The Élise Classic Heel", category:"Shoes", price:390, tag:"Bestseller", description:"A classic heel designed to complement occasion and everyday looks." },
    { id:"p06", name:"The Sienna Evening Heel", category:"Shoes", price:440, tag:"New", description:"An elegant evening shoe with a clean, modern profile." },
    { id:"p07", name:"The Muse Minimal Sandal", category:"Shoes", price:320, tag:"Essential", description:"A minimal sandal that pairs effortlessly with warm-weather outfits." },
    { id:"p08", name:"The Noelle Structured Bag", category:"Bags", price:560, tag:"Bestseller", description:"A structured handbag with a timeless shape and considered details." },
    { id:"p09", name:"The Camille Shoulder Bag", category:"Bags", price:480, tag:"New", description:"A polished shoulder bag for everyday elegance." },
    { id:"p10", name:"The Siena Mini Bag", category:"Bags", price:350, tag:"Essential", description:"A compact accessory for dinners, events and weekends." },
    { id:"p11", name:"The Lumière Pendant", category:"Jewellery", price:210, tag:"Signature", description:"A delicate pendant to add a subtle finishing touch." },
    { id:"p12", name:"The Sol Pearl Earrings", category:"Jewellery", price:185, tag:"Bestseller", description:"Pearl-inspired earrings with an understated, graceful look." },
    { id:"p13", name:"The Étoile Cuff", category:"Jewellery", price:240, tag:"New", description:"A sculptural cuff designed to stand beautifully on its own." },
    { id:"p14", name:"The Maison Silk Scarf", category:"Accessories", price:160, tag:"Essential", description:"A versatile scarf to style around the neck, hair or handbag." },
    { id:"p15", name:"The Élégance Belt", category:"Accessories", price:190, tag:"New", description:"A refined belt that brings definition to dresses and separates." },
    { id:"p16", name:"The Signature Sunglasses", category:"Accessories", price:260, tag:"Signature", description:"A modern finishing piece for a confident everyday look." }
  ];

  const CATEGORIES = ["All", "Dresses", "Shoes", "Bags", "Jewellery", "Accessories"];
  const KEYS = { cart:"vecleria_cart_v1", saved:"vecleria_saved_v1", promo:"vecleria_promo_v1" };
  const page = document.body.dataset.page || "index";
  const $ = (selector, root=document) => root.querySelector(selector);
  const money = value => CONFIG.currency + Number(value || 0).toLocaleString("en-GH", { maximumFractionDigits: 2 });
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (_) { return fallback; } };
  const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {} };
  let cart = read(KEYS.cart, []);
  let saved = read(KEYS.saved, []);
  let promoCode = read(KEYS.promo, "");

  function product(id) { return PRODUCTS.find(item => item.id === id); }
  function image(id, alt) {
    return '<div class="ph"><img src="images/' + id + '.jpg" alt="' + escapeHtml(alt) + '" loading="lazy" onerror="this.style.display=\'none\'"></div>';
  }
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
  }
  function toast(message) {
    let node = $(".toast");
    if (!node) { node = document.createElement("div"); node.className = "toast"; node.setAttribute("role","status"); document.body.appendChild(node); }
    node.textContent = message; node.classList.add("show");
    window.clearTimeout(toast.timer); toast.timer = window.setTimeout(() => node.classList.remove("show"), 2400);
  }
  function cartCount() { return cart.reduce((sum, item) => sum + item.qty, 0); }
  function saveState() { write(KEYS.cart, cart); write(KEYS.saved, saved); write(KEYS.promo, promoCode); updateCounts(); }
  function updateCounts() {
    const count = cartCount();
    document.querySelectorAll("[data-cart-count]").forEach(node => node.textContent = count);
    document.querySelectorAll("[data-saved-count]").forEach(node => node.textContent = saved.length);
  }
  function whatsappUrl(message) { return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(message); }

  function renderShell() {
    const header = $("#siteHeader");
    if (header) header.innerHTML = `
      <div class="topbar">A considered collection · Made to be remembered</div>
      <header class="header"><div class="container header-inner">
        <nav aria-label="Main navigation"><ul class="nav">
          <li><a href="index.html" class="${page==="index"?"active":""}">Home</a></li>
          <li><a href="shop.html" class="${page==="shop"||page==="product"?"active":""}">Shop</a></li>
          <li><a href="about.html" class="${page==="about"?"active":""}">About</a></li>
          <li><a href="journal.html" class="${page==="journal"?"active":""}">Journal</a></li>
          <li><a href="contact.html" class="${page==="contact"?"active":""}">Contact</a></li>
        </ul></nav>
        <a class="logo" href="index.html" aria-label="VECLÉRIA home">VECLÉRIA</a>
        <div class="header-icons">
          <a class="icon-btn" href="shop.html?saved=1" aria-label="Saved items">♡<span class="count" data-saved-count>${saved.length}</span></a>
          <a class="icon-btn" href="cart.html" aria-label="Shopping bag">♧<span class="count" data-cart-count>${cartCount()}</span></a>
        </div>
      </div></header>`;
    const footer = $("#siteFooter");
    if (footer) footer.innerHTML = `
      <footer class="footer"><div class="container">
        <div class="footer-grid">
          <div><a class="logo" href="index.html">VECLÉRIA</a><p>Premium fashion, considered details and pieces made to be remembered.</p><p><a href="https://www.instagram.com/adjoayeboahclothing/" target="_blank" rel="noopener noreferrer">${CONFIG.instagram}</a></p></div>
          <div><h4>Explore</h4><ul><li><a href="shop.html">Shop all</a></li><li><a href="customise.html">Bespoke atelier</a></li><li><a href="about.html">Our story</a></li><li><a href="journal.html">The journal</a></li></ul></div>
          <div><h4>Help</h4><ul><li><a href="contact.html">Contact us</a></li><li><a href="cart.html">Shopping bag</a></li><li><a href="mailto:${CONFIG.email}">Email us</a></li><li><a href="${whatsappUrl("Hello VECLÉRIA, I have an enquiry.")}" target="_blank" rel="noopener">WhatsApp</a></li></ul></div>
          <div><h4>Visit / Connect</h4><p>${CONFIG.address}<br>${CONFIG.phone}<br><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></p><p>${CONFIG.hours}</p></div>
        </div>
        <div class="footer-bottom">© ${new Date().getFullYear()} VECLÉRIA. All rights reserved. <span style="float:right">Demo collection · Prices subject to confirmation</span></div>
      </div></footer>`;
  }

  function card(item) {
    const isSaved = saved.includes(item.id);
    return `<article class="card">
      <a href="product.html?id=${encodeURIComponent(item.id)}" aria-label="View ${escapeHtml(item.name)}">${image(item.id, item.name)}</a>
      <span class="tag">${escapeHtml(item.tag)}</span>
      <button class="wish ${isSaved?"on":""}" type="button" data-wish="${item.id}" aria-label="${isSaved?"Remove from":"Add to"} saved items" aria-pressed="${isSaved}">${isSaved?"♥":"♡"}</button>
      <div class="meta">${escapeHtml(item.category)}</div>
      <h3><a href="product.html?id=${encodeURIComponent(item.id)}">${escapeHtml(item.name)}</a></h3>
      <div class="price">${money(item.price)}</div>
      <div class="quick"><button class="btn btn-dark" type="button" data-add="${item.id}">Add to bag</button></div>
    </article>`;
  }
  function addToCart(id, qty=1) {
    const item = product(id); if (!item) return;
    const existing = cart.find(row => row.id === id);
    if (existing) existing.qty += qty; else cart.push({ id, qty });
    saveState(); toast("Added to your bag");
  }
  function toggleSaved(id) {
    saved = saved.includes(id) ? saved.filter(value => value !== id) : [...saved, id];
    saveState(); renderShop(); renderFeatured(); renderProduct();
    toast(saved.includes(id) ? "Saved to your favourites" : "Removed from saved items");
  }
  function renderFeatured() {
    const target = $("#featured"); if (!target) return;
    target.innerHTML = PRODUCTS.slice(0, 4).map(card).join("");
    const marquee = $("#marquee");
    if (marquee) marquee.innerHTML = Array(2).fill('<span>VECLÉRIA · DRESS WITH INTENTION · QUIET LUXURY ·</span>').join("");
  }
  function renderShop() {
    const grid = $("#shopGrid"); if (!grid) return;
    const query = ($("#q")?.value || "").trim().toLowerCase();
    const selected = $("#catChips")?.dataset.category || new URLSearchParams(location.search).get("cat") || "All";
    const onlySaved = $("#savedChip")?.getAttribute("aria-pressed") === "true" || new URLSearchParams(location.search).get("saved") === "1";
    let items = PRODUCTS.filter(item => (selected === "All" || item.category === selected) &&
      (!onlySaved || saved.includes(item.id)) &&
      (!query || (item.name + " " + item.category + " " + item.description).toLowerCase().includes(query)));
    const sort = $("#sort")?.value || "featured";
    if (sort === "low") items.sort((a,b)=>a.price-b.price);
    if (sort === "high") items.sort((a,b)=>b.price-a.price);
    $("#count").textContent = items.length + (items.length===1 ? " piece" : " pieces");
    grid.innerHTML = items.length ? items.map(card).join("") : '<div class="empty"><h3>No pieces found</h3><p>Try another search or category.</p></div>';
  }
  function setupShop() {
    const chips = $("#catChips"); if (!chips) return;
    const initial = new URLSearchParams(location.search).get("cat") || "All";
    chips.dataset.category = CATEGORIES.includes(initial) ? initial : "All";
    chips.innerHTML = CATEGORIES.map(cat => `<button type="button" class="chip" data-category="${cat}" aria-pressed="${cat===chips.dataset.category}">${cat}</button>`).join("");
    const savedOnly = new URLSearchParams(location.search).get("saved")==="1";
    $("#savedChip")?.setAttribute("aria-pressed", String(savedOnly));
    $("#q")?.addEventListener("input", renderShop);
    $("#sort")?.addEventListener("change", renderShop);
    chips.addEventListener("click", event => {
      const button = event.target.closest("[data-category]"); if (!button) return;
      chips.dataset.category = button.dataset.category;
      chips.querySelectorAll("button").forEach(node => node.setAttribute("aria-pressed", String(node===button)));
      renderShop();
    });
    $("#savedChip")?.addEventListener("click", event => {
      const button = event.currentTarget;
      button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed")!=="true"));
      renderShop();
    });
    renderShop();
  }
  function renderProduct() {
    const box = $("#productBox"); if (!box) return;
    const id = new URLSearchParams(location.search).get("id") || "p01";
    const item = product(id) || PRODUCTS[0];
    $("#crumb").textContent = item.name;
    box.innerHTML = `
      <div>${image(item.id,item.name)}</div>
      <div><span class="eyebrow">${escapeHtml(item.category)}</span><h1>${escapeHtml(item.name)}</h1>
        <div class="price">${money(item.price)}</div><p>${escapeHtml(item.description)}</p>
        <p class="meta">Demo price · Confirm availability before ordering</p>
        <div class="opt"><b>Quantity</b><div class="qty"><button type="button" data-qty="-1" aria-label="Decrease quantity">−</button><span id="productQty">1</span><button type="button" data-qty="1" aria-label="Increase quantity">+</button></div></div>
        <div class="hero-actions"><button class="btn btn-dark" type="button" data-add-detail="${item.id}">Add to bag</button><button class="btn btn-line" type="button" data-wish="${item.id}">${saved.includes(item.id)?"♥ Saved":"♡ Save item"}</button></div>
        <p style="margin-top:1.5rem">Need a different fit or finish? <a class="link-btn" href="customise.html">Request a custom piece</a>.</p>
      </div>`;
    const related = $("#related");
    if (related) related.innerHTML = PRODUCTS.filter(p=>p.category===item.category && p.id!==item.id).slice(0,3).map(card).join("");
  }

  function renderCart() {
    const target = $("#cartItems"); if (!target) return;
    if (!cart.length) target.innerHTML = '<div class="empty"><h3>Your bag is waiting</h3><p>Explore the collection and add a piece you love.</p><a class="btn btn-dark" href="shop.html">Explore the collection</a></div>';
    else target.innerHTML = cart.map(row => {
      const item = product(row.id); if (!item) return "";
      return `<div class="line-item"><a href="product.html?id=${item.id}">${image(item.id,item.name)}</a><div><h3><a href="product.html?id=${item.id}">${escapeHtml(item.name)}</a></h3><p class="meta">${escapeHtml(item.category)}</p><div class="qty"><button type="button" data-cart-qty="-1" data-id="${item.id}">−</button><span>${row.qty}</span><button type="button" data-cart-qty="1" data-id="${item.id}">+</button></div><p><button class="link-btn" type="button" data-remove="${item.id}">Remove</button></p></div><strong>${money(item.price*row.qty)}</strong></div>`;
    }).join("");
    const subtotal = cart.reduce((sum,row)=>sum+(product(row.id)?.price||0)*row.qty,0);
    const discount = CONFIG.promo[promoCode] ? subtotal*CONFIG.promo[promoCode] : 0;
    const total = subtotal-discount;
    $("#sumRows").innerHTML = `<div class="row"><span>Subtotal</span><strong>${money(subtotal)}</strong></div>${discount?'<div class="row save"><span>Promo ('+escapeHtml(promoCode)+')</span><strong>−'+money(discount)+'</strong></div>':""}<div class="row"><span>Delivery</span><span>Confirmed on WhatsApp</span></div><div class="row total"><span>Estimated total</span><strong>${money(total)}</strong></div>`;
    if ($("#promoInput") && promoCode) $("#promoInput").value = promoCode;
    const order = $("#placeOrder");
    if (order) {
      const lines = cart.map(row => { const item=product(row.id); return item ? "- "+item.name+" × "+row.qty+" = "+money(item.price*row.qty) : ""; }).filter(Boolean).join("\n");
      const details = ["Hello VECLÉRIA, I would like to place an order.","",lines,"","Subtotal: "+money(subtotal),"Discount: "+money(discount),"Estimated total: "+money(total),"","Name: "+($("#cName")?.value||""),"Phone: "+($("#cPhone")?.value||""),"Delivery address: "+($("#cAddr")?.value||""),"Payment preference: "+($("#cPay")?.value||""),"Notes: "+($("#cNotes")?.value||""),"","Please confirm availability, delivery fee and final payment details."].join("\n");
      order.href = whatsappUrl(details);
      order.setAttribute("aria-disabled", String(!cart.length));
      order.style.pointerEvents = cart.length ? "auto" : "none";
      order.style.opacity = cart.length ? "1" : ".5";
    }
  }
  function setupCart() {
    if (!$("#cartItems")) return;
    $("#clearBtn")?.addEventListener("click",()=>{cart=[];promoCode="";saveState();renderCart();});
    $("#applyPromo")?.addEventListener("click",()=>{
      const code = ($("#promoInput")?.value||"").trim().toUpperCase();
      if (CONFIG.promo[code]) { promoCode=code; saveState(); toast("Promo code applied"); }
      else { promoCode=""; saveState(); toast("That demo promo code is not recognised"); }
      renderCart();
    });
    ["cName","cPhone","cAddr","cPay","cNotes"].forEach(id=>$("#"+id)?.addEventListener("input",renderCart));
    renderCart();
  }

  const CUSTOM_OPTIONS = [
    { title:"Piece type", name:"piece", options:["Dress","Two-piece set","Gown","Skirt","Blouse"] },
    { title:"Fabric", name:"fabric", options:["Satin","Lace","Ankara","Chiffon","Crepe","Not sure yet"] },
    { title:"Colour", name:"colour", options:["Forest green","Champagne","Ivory","Black","Burgundy","Custom colour"] },
    { title:"Fit", name:"fit", options:["Relaxed","Tailored","Fitted","Not sure yet"] },
    { title:"Neckline", name:"neckline", options:["Sweetheart","Off shoulder","High neck","V-neck","Halter","Custom"] },
    { title:"Length", name:"length", options:["Mini","Midi","Maxi","Full length"] }
  ];
  function setupCustomise() {
    const host=$("#custGroups"); if (!host) return;
    const choices={piece:"Dress",fabric:"Satin",colour:"Forest green",fit:"Tailored",neckline:"Sweetheart",length:"Midi"};
    host.innerHTML=CUSTOM_OPTIONS.map(group=>`<fieldset class="group"><legend>${group.title}</legend><div class="chips">${group.options.map(option=>`<button type="button" class="chip" data-choice="${group.name}" data-value="${option}" aria-pressed="${option===choices[group.name]}">${option}</button>`).join("")}</div></fieldset>`).join("");
    function update() {
      $("#custSummary").innerHTML=Object.entries(choices).map(([key,value])=>`<li><span>${key.charAt(0).toUpperCase()+key.slice(1)}</span><strong>${escapeHtml(value)}</strong></li>`).join("");
      const details=["Hello VECLÉRIA, I would like to request a custom piece.","",...Object.entries(choices).map(([k,v])=>k+": "+v),"", "Bust: "+($("#mBust")?.value||"Not provided")+" cm","Waist: "+($("#mWaist")?.value||"Not provided")+" cm","Hips: "+($("#mHips")?.value||"Not provided")+" cm","Height: "+($("#mHeight")?.value||"Not provided")+" cm","Name: "+($("#cName")?.value||""),"Needed by: "+($("#fDate")?.value||"Flexible"),"Notes: "+($("#cNotes")?.value||""),"","Please confirm the design, price and timeline."].join("\n");
      $("#custSend").href=whatsappUrl(details);
    }
    host.addEventListener("click",event=>{
      const button=event.target.closest("[data-choice]"); if(!button)return;
      choices[button.dataset.choice]=button.dataset.value;
      host.querySelectorAll("[data-choice='"+button.dataset.choice+"']").forEach(node=>node.setAttribute("aria-pressed",String(node===button)));
      update();
    });
    ["mBust","mWaist","mHips","mHeight","cName","fDate","cNotes"].forEach(id=>$("#"+id)?.addEventListener("input",update));
    update();
  }
  function setupContact() {
    const send=$("#ctSend"); if(!send)return;
    function update() {
      const message=["Hello VECLÉRIA, I have an enquiry.","","Name: "+($("#ctName")?.value||""),"Contact: "+($("#ctContact")?.value||""),"Topic: "+($("#ctTopic")?.value||""),"Message: "+($("#ctMsg")?.value||"")].join("\n");
      send.href=whatsappUrl(message);
    }
    ["ctName","ctContact","ctTopic","ctMsg"].forEach(id=>$("#"+id)?.addEventListener("input",update));
    update();
  }
  function addContactDetails() {
    document.querySelectorAll("[data-cfg]").forEach(node=>{
      const key=node.dataset.cfg;
      if(key==="instagram") node.innerHTML='<a href="'+CONFIG.instagramUrl+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(CONFIG.instagram)+'</a>';
      else node.textContent=CONFIG[key]||"";
    });
  }

  document.addEventListener("click",event=>{
    const wish=event.target.closest("[data-wish]");
    if(wish){event.preventDefault();toggleSaved(wish.dataset.wish);return;}
    const add=event.target.closest("[data-add]");
    if(add){addToCart(add.dataset.add);return;}
    const detail=event.target.closest("[data-add-detail]");
    if(detail){const qty=Math.max(1,Number($("#productQty")?.textContent||1));addToCart(detail.dataset.addDetail,qty);return;}
    const qty=event.target.closest("[data-qty]");
    if(qty){const node=$("#productQty");node.textContent=String(Math.max(1,Math.min(10,Number(node.textContent)+Number(qty.dataset.qty))));return;}
    const cartQty=event.target.closest("[data-cart-qty]");
    if(cartQty){const row=cart.find(item=>item.id===cartQty.dataset.id);if(row){row.qty+=Number(cartQty.dataset.cartQty);if(row.qty<=0)cart=cart.filter(item=>item.id!==row.id);saveState();renderCart();}return;}
    const remove=event.target.closest("[data-remove]");
    if(remove){cart=cart.filter(item=>item.id!==remove.dataset.remove);saveState();renderCart();}
  });

  renderShell();
  addContactDetails();
  updateCounts();
  if(page==="index") renderFeatured();
  if(page==="shop") setupShop();
  if(page==="product") renderProduct();
  if(page==="cart") setupCart();
  if(page==="customise") setupCustomise();
  if(page==="contact") setupContact();

  document.querySelectorAll("img").forEach(img=>img.addEventListener("error",()=>{img.style.display="none";},{once:true}));
  if("IntersectionObserver" in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});
    document.querySelectorAll(".reveal").forEach(node=>observer.observe(node));
  } else document.querySelectorAll(".reveal").forEach(node=>node.classList.add("visible"));
})();