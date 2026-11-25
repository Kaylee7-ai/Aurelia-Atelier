const WA="233000000000",CUR="GH₵",ROOT=document.body.dataset.root||"",PAGE=document.body.dataset.page;
const CATS={women:"Women",men:"Men",children:"Children",shoes:"Shoes",bags:"Bags",jewellery:"Jewellery",beauty:"Beauty",accessories:"Accessories"};
// name, category, price, old price (0 = none), badge, hue. Add "img" paths like assets/images/VL001.jpg to show real photos.
const RAW=[["Silk Wrap Dress","women",640,820,"Sale",335],["Tailored Linen Trousers","women",420,0,"New",20],["Midnight Satin Blouse","women",360,0,"",270],["Classic Oxford Shirt","men",380,0,"New",210],["Slim Fit Suit","men",1450,1800,"Sale",250],["Leather Belt","men",190,0,"",30],["Pleated Party Dress","children",260,0,"New",320],["Kids Canvas Sneakers","children",210,260,"Sale",190],["Block Heel Sandals","shoes",480,0,"New",340],["Leather Chelsea Boots","shoes",720,0,"",25],["Structured Tote","bags",890,1100,"Sale",290],["Mini Crossbody Bag","bags",540,0,"New",350],["Gold Hoop Earrings","jewellery",230,0,"",45],["Pearl Drop Necklace","jewellery",410,0,"New",310],["Glow Makeup Kit","beauty",350,450,"Sale",330],["Silk Scarf","accessories",170,0,"New",15]];
const PRODUCT_IMAGES=["https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85","https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"];
const P=RAW.map((r,i)=>({id:"VL"+String(i+1).padStart(3,"0"),name:r[0],cat:r[1],price:r[2],old:r[3],badge:r[4],hue:r[5],img:PRODUCT_IMAGES[i]}));
const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const money=n=>CUR+n.toLocaleString("en-GH"),find=id=>P.find(p=>p.id===id),colours=["Noir","Rose","Gold"];
const sizes=p=>["women","men","children"].includes(p.cat)?["XS","S","M","L","XL"]:p.cat==="shoes"?["38","39","40","41","42"]:["One size"];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let cart=store.get("vl_cart",[]),wish=store.get("vl_wish",[]);
const pic=p=>p.img?`<img src="${ROOT}${p.img}" alt="${esc(p.name)}">`:`<div class="ph" style="--h:${p.hue}"><b>${p.name[0]}</b><small>${CATS[p.cat]}</small></div>`;
const price=p=>money(p.price)+(p.old?` <s>${money(p.old)}</s>`:"");
const card=p=>`<article class="card">${p.badge?`<i class="badge">${p.badge}</i>`:""}<button class="heart${wish.includes(p.id)?" on":""}" data-w="${p.id}" aria-label="Save to wishlist">♥</button><a href="${ROOT}pages/product.html?id=${p.id}">${pic(p)}</a><div class="ci"><h3>${p.name}</h3><p>${price(p)}</p><button class="btn sm" data-add="${p.id}">Add to bag</button></div></article>`;
const grid=a=>a.length?`<div class="grid">${a.map(card).join("")}</div>`:`<p class="empty">No products match. Try another filter or browse the <a href="${ROOT}pages/shop.html"><u>full shop</u></a>.</p>`;
const sec=(t,inner,more)=>`<section class="sec"><div class="sh"><h2>${t}</h2>${more?`<a href="${more}">View all</a>`:""}</div>${inner}</section>`;
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove("on"),2200)}
function counts(){$$("[data-count=bag]").forEach(e=>e.textContent=cart.reduce((a,i)=>a+i.qty,0));$$("[data-count=wish]").forEach(e=>e.textContent=wish.length)}
function addCart(id,size,color,qty=1){const p=find(id);size=size||sizes(p)[0];color=color||colours[0];const l=cart.find(i=>i.id===id&&i.size===size&&i.color===color);l?l.qty+=qty:cart.push({id,size,color,qty});store.set("vl_cart",cart);counts();toast("Added to your bag")}
const qs=()=>new URLSearchParams(location.search);

$("#hdr").innerHTML=`<div class="announce">Free delivery in Accra on orders over ${CUR}800. Order on WhatsApp anytime.</div><header class="top"><a class="logo" href="${ROOT}index.html">VECLRA</a><form class="sf" action="${ROOT}pages/shop.html"><input name="q" placeholder="Search VECLRA" aria-label="Search"></form><div class="ic"><a href="${ROOT}pages/shop.html?wish=1">Wishlist<sup data-count="wish">0</sup></a><a href="${ROOT}pages/account/login.html">Account</a><a href="${ROOT}pages/shopping/cart.html">Bag<sup data-count="bag">0</sup></a></div></header><nav class="menu"><a href="${ROOT}pages/shop.html">Shop</a><a href="${ROOT}pages/new-arrivals.html">New</a>${Object.entries(CATS).map(([k,v])=>`<a href="${ROOT}pages/categories/${k}.html">${v}</a>`).join("")}<a class="hot" href="${ROOT}pages/sale.html">Sale</a></nav>`;
$("#ftr").innerHTML=`<footer><div><h3>VECLRA</h3><p>Fashion, beauty and lifestyle, delivered across Ghana.</p></div><div><a href="${ROOT}pages/information/about.html">About us</a><br><a href="${ROOT}pages/information/contact.html">Contact</a><br><a href="https://wa.me/${WA}">WhatsApp</a></div><div><p>&copy; ${new Date().getFullYear()} VECLRA</p></div></footer>`;

const R={},after={};

const dressGallery = `<section class="sec dress-edit" aria-labelledby="dress-edit-title">
  <div class="dress-edit-head">
    <div>
      <span class="dress-eyebrow">THE VECLRA STYLE EDIT</span>
      <h2 id="dress-edit-title">Dresses worth dressing up for.</h2>
      <p>Explore statement occasionwear, modern African-inspired looks and elegant silhouettes.</p>
    </div>
    <a class="dress-shop-link" href="${ROOT}pages/categories/women.html">Explore women's fashion <span aria-hidden="true">↗</span></a>
  </div>
  <div class="dress-grid">
    <a class="dress-look" href="${ROOT}pages/categories/women.html" aria-label="Explore eveningwear">
      <img src="https://images.pexels.com/photos/20224511/pexels-photo-20224511.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Teal evening dress editorial look" loading="eager" fetchpriority="high" decoding="async">
      <span class="dress-look-index">01 / EVENING</span><span class="dress-look-title">The evening edit</span>
    </a>
    <a class="dress-look" href="${ROOT}pages/categories/women.html" aria-label="Explore red statement dresses">
      <img src="https://images.pexels.com/photos/32111281/pexels-photo-32111281.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Red statement dress editorial look" loading="lazy" decoding="async">
      <span class="dress-look-index">02 / STATEMENT</span><span class="dress-look-title">Made to be noticed</span>
    </a>
    <a class="dress-look" href="${ROOT}pages/categories/women.html" aria-label="Explore African-inspired dresses">
      <img src="https://images.pexels.com/photos/33939065/pexels-photo-33939065.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Pink and burgundy African-print dress" loading="lazy" decoding="async">
      <span class="dress-look-index">03 / MODERN AFRICAN</span><span class="dress-look-title">A touch of culture</span>
    </a>
    <a class="dress-look" href="${ROOT}pages/categories/women.html" aria-label="Explore elegant occasion dresses">
      <img src="https://images.pexels.com/photos/31094898/pexels-photo-31094898.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Elegant beige fitted dress editorial look" loading="lazy" decoding="async">
      <span class="dress-look-index">04 / MINIMAL</span><span class="dress-look-title">Quiet elegance</span>
    </a>
    <a class="dress-look" href="${ROOT}pages/categories/women.html" aria-label="Explore colourful maxi dresses">
      <img src="https://images.pexels.com/photos/8060452/pexels-photo-8060452.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Colourful patterned maxi dress" loading="lazy" decoding="async">
      <span class="dress-look-index">05 / COLOUR</span><span class="dress-look-title">Colour with confidence</span>
    </a>
    <a class="dress-look" href="${ROOT}pages/categories/women.html" aria-label="Explore metallic evening dresses">
      <img src="https://images.pexels.com/photos/13530000/pexels-photo-13530000.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Metallic evening dress" loading="lazy" decoding="async">
      <span class="dress-look-index">06 / AFTER DARK</span><span class="dress-look-title">After-dark shine</span>
    </a>
    <a class="dress-look" href="${ROOT}pages/categories/women.html" aria-label="Explore Kente-inspired dresses">
      <img src="https://images.pexels.com/photos/13998586/pexels-photo-13998586.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Contemporary African pattern dress photographed in Ghana" loading="lazy" decoding="async">
      <span class="dress-look-index">07 / HERITAGE</span><span class="dress-look-title">Heritage reimagined</span>
    </a>
    <a class="dress-look" href="${ROOT}pages/categories/women.html" aria-label="Explore elegant traditional dresses">
      <img src="https://images.pexels.com/photos/8542080/pexels-photo-8542080.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Elegant traditional dress editorial look" loading="lazy" decoding="async">
      <span class="dress-look-index">08 / TIMELESS</span><span class="dress-look-title">Timeless details</span>
    </a>
    <a class="dress-look" href="${ROOT}pages/categories/women.html" aria-label="Explore blue evening gowns">
      <img src="https://images.pexels.com/photos/13153053/pexels-photo-13153053.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Elegant blue evening gown" loading="lazy" decoding="async">
      <span class="dress-look-index">09 / BLUE HOUR</span><span class="dress-look-title">The blue-hour gown</span>
    </a>
    <a class="dress-look" href="${ROOT}pages/categories/women.html" aria-label="Explore green beaded gowns">
      <img src="https://images.pexels.com/photos/36528615/pexels-photo-36528615.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Green beaded evening gown photographed in Ghana" loading="lazy" decoding="async">
      <span class="dress-look-index">10 / COUTURE</span><span class="dress-look-title">A little occasion magic</span>
    </a>
    <a class="dress-look" href="${ROOT}pages/categories/women.html" aria-label="Explore African print fashion">
      <img src="https://images.pexels.com/photos/20660460/pexels-photo-20660460.jpeg?auto=compress&cs=tinysrgb&w=900" alt="African-print dress in a fashion studio" loading="lazy" decoding="async">
      <span class="dress-look-index">11 / PRINT</span><span class="dress-look-title">Prints in full bloom</span>
    </a>
    <a class="dress-look" href="${ROOT}pages/categories/women.html" aria-label="Explore vibrant African dresses">
      <img src="https://images.pexels.com/photos/33561263/pexels-photo-33561263.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Vibrant African-print dress editorial look" loading="lazy" decoding="async">
      <span class="dress-look-index">12 / EDITORIAL</span><span class="dress-look-title">The statement collection</span>
    </a>
  </div>
  <p class="dress-photo-note">These 12 editorial photos are style inspiration, not confirmed products or stock photos. Product images, sizes, prices and availability should be confirmed before orders are placed.</p>
</section>`
R.home=()=>`<section class="hero"><div class="orb"></div><h1>Dress like the night is yours.</h1><p>Women, men, children, shoes, bags, jewellery and beauty, delivered across Ghana.</p><div class="hb"><a class="btn" href="${ROOT}pages/shop.html">Shop the collection</a><a class="btn ghost" href="${ROOT}pages/new-arrivals.html">See what is new</a></div></section>`
+sec("Shop by category",`<div class="cats"><a class="cat" style="--cat-photo:url(https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85)" href="${ROOT}pages/categories/women.html"><span>Women</span></a><a class="cat" style="--cat-photo:url(https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=85)" href="${ROOT}pages/categories/men.html"><span>Men</span></a><a class="cat" style="--cat-photo:url(https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=85)" href="${ROOT}pages/categories/children.html"><span>Children</span></a><a class="cat" style="--cat-photo:url(https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85)" href="${ROOT}pages/categories/shoes.html"><span>Shoes</span></a><a class="cat" style="--cat-photo:url(https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85)" href="${ROOT}pages/categories/bags.html"><span>Bags</span></a><a class="cat" style="--cat-photo:url(https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=85)" href="${ROOT}pages/categories/jewellery.html"><span>Jewellery</span></a><a class="cat" style="--cat-photo:url(https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=85)" href="${ROOT}pages/categories/beauty.html"><span>Beauty</span></a><a class="cat" style="--cat-photo:url(https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85)" href="${ROOT}pages/categories/accessories.html"><span>Accessories</span></a></div>`)
+sec("New arrivals",grid(P.filter(p=>p.badge==="New").slice(0,4)),ROOT+"pages/new-arrivals.html")
+dressGallery
+`<section class="promo"><h2>Up to 25% off selected pieces</h2><p>Seasonal sale, while stock lasts.</p><a class="btn" href="${ROOT}pages/sale.html">Shop the sale</a></section>`
+sec("Trending now",grid(P.filter((p,i)=>i%2===0).slice(0,4)),ROOT+"pages/shop.html")
+`<section class="sec narrow"><h2>Join the list</h2><form id="nl"><input type="email" required placeholder="Your email" aria-label="Email"><button class="btn sm">Subscribe</button></form></section>`;
after.home=()=>$("#nl").onsubmit=e=>{e.preventDefault();e.target.reset();toast("Thanks for subscribing")};

R.list=()=>{const f=document.body.dataset.filter,c=document.body.dataset.cat;let a=P;if(c)a=a.filter(p=>p.cat===c);if(f==="new")a=a.filter(p=>p.badge==="New");if(f==="sale")a=a.filter(p=>p.old);return `<section class="sec"><h1>${c?CATS[c]:f==="new"?"New arrivals":"Sale"}</h1>${grid(a)}</section>`};

R.shop=()=>`<section class="sec"><h1>${qs().get("wish")?"Your wishlist":"Shop all"}</h1><div class="fl"><input id="fq" placeholder="Search products" value="${esc(qs().get("q")||"")}"><select id="fc"><option value="">All categories</option>${Object.entries(CATS).map(([k,v])=>`<option value="${k}">${v}</option>`).join("")}</select><select id="fs"><option value="">Featured</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option></select><label>Max price <output id="fo"></output><input id="fp" type="range" min="100" max="1800" step="50" value="1800"></label></div><div id="res"></div></section>`;
after.shop=()=>{const run=()=>{let a=P.filter(p=>(!qs().get("wish")||wish.includes(p.id))&&(!$("#fc").value||p.cat===$("#fc").value)&&p.price<=+$("#fp").value&&p.name.toLowerCase().includes($("#fq").value.toLowerCase()));const s=$("#fs").value;if(s)a.sort((x,y)=>s==="lo"?x.price-y.price:y.price-x.price);$("#fo").textContent=money(+$("#fp").value);$("#res").innerHTML=grid(a)};$$(".fl input,.fl select").forEach(e=>e.oninput=run);run()};

R.product=()=>{const p=find(qs().get("id"));if(!p)return `<section class="sec"><h1>Product not found</h1><p><a class="btn" href="${ROOT}pages/shop.html">Back to the shop</a></p></section>`;document.title=p.name+" | VECLRA";
const rel=P.filter(x=>x.id!==p.id&&x.cat===p.cat).concat(P.filter(x=>x.id!==p.id)).filter((x,i,a)=>a.indexOf(x)===i).slice(0,4);
return `<section class="sec pd"><div class="pimg">${pic(p)}</div><div class="pi"><small>${p.id}, ${CATS[p.cat]}</small><h1>${p.name}</h1><p class="pr">${price(p)}</p><p>A carefully finished ${CATS[p.cat].toLowerCase()} piece from the VECLRA collection. In stock. Delivery in 2 to 4 days within Accra.</p><h4>Size</h4><div class="opt" id="sz">${sizes(p).map((s,i)=>`<button class="${i?"":"on"}">${s}</button>`).join("")}</div><h4>Colour</h4><div class="opt" id="co">${colours.map((s,i)=>`<button class="${i?"":"on"}">${s}</button>`).join("")}</div><h4>Quantity</h4><input id="qt" type="number" min="1" value="1"><div class="hb"><button class="btn" id="ad">Add to bag</button><a class="btn ghost" id="by" href="${ROOT}pages/shopping/cart.html">Buy now</a><a class="btn wa" id="wa" target="_blank" rel="noopener">Order on WhatsApp</a></div></div></section>`+sec("You may also like",grid(rel))};
after.product=()=>{const p=find(qs().get("id"));if(!p)return;const sel=i=>($(i+" .on")||{}).textContent,qty=()=>Math.max(1,+$("#qt").value||1);
const wa=()=>$("#wa").href=`https://wa.me/${WA}?text=`+encodeURIComponent(`Hello VECLRA, I would like to order ${qty()} x ${p.name} (${p.id}), size ${sel("#sz")}, colour ${sel("#co")}.`);
$$("#sz button,#co button").forEach(b=>b.onclick=()=>{$$("button",b.parentNode).forEach(x=>x.classList.remove("on"));b.classList.add("on");wa()});$("#qt").oninput=wa;wa();
$("#ad").onclick=()=>addCart(p.id,sel("#sz"),sel("#co"),qty());$("#by").onclick=()=>addCart(p.id,sel("#sz"),sel("#co"),qty())};

R.cart=()=>{if(!cart.length)return `<section class="sec"><h1>Your bag is empty</h1><p><a class="btn" href="${ROOT}pages/shop.html">Start shopping</a></p></section>`;const t=cart.reduce((a,i)=>a+find(i.id).price*i.qty,0);
return `<section class="sec cartw"><div><h1>Your bag</h1>${cart.map((i,n)=>{const p=find(i.id);return `<div class="row"><div class="th">${pic(p)}</div><div><h3>${p.name}</h3><small class="mut">${i.size}, ${i.color}</small><p>${money(p.price)}</p></div><div class="q"><button data-q="${n}" data-d="-1" aria-label="Fewer">-</button><span>${i.qty}</span><button data-q="${n}" data-d="1" aria-label="More">+</button><button data-rm="${n}" aria-label="Remove">x</button></div></div>`}).join("")}</div><aside class="sum"><h3>Order summary</h3><p class="tot"><span>Total</span><b>${money(t)}</b></p><input id="cn" placeholder="Full name"><input id="cp" placeholder="Phone number"><input id="ca" placeholder="Delivery address"><button class="btn wa" id="ck">Send order on WhatsApp</button><small class="mut">Card and Mobile Money checkout is added when the backend is connected (see README).</small></aside></section>`};
after.cart=()=>{const b=$("#ck");if(!b)return;b.onclick=()=>{const n=$("#cn").value.trim(),ph=$("#cp").value.trim(),a=$("#ca").value.trim();if(!n||!ph||!a)return toast("Enter your name, phone and address");const t=cart.reduce((s,i)=>s+find(i.id).price*i.qty,0);const m=`Hello VECLRA, I would like to order:\n`+cart.map(i=>`${i.qty} x ${find(i.id).name} (${i.size}, ${i.color}) - ${money(find(i.id).price*i.qty)}`).join("\n")+ `\nTotal: ${money(t)}\nName: ${n}\nPhone: ${ph}\nAddress: ${a}`;open(`https://wa.me/${WA}?text=`+encodeURIComponent(m),"_blank")}};

R.login=()=>`<section class="sec narrow"><h1>Sign in</h1><form id="lf"><input type="email" required placeholder="Email" aria-label="Email"><input type="password" required placeholder="Password" aria-label="Password"><button class="btn sm">Sign in</button></form><p class="mut">Accounts, order history and password reset go live once Supabase Auth is connected (see README).</p></section>`;
after.login=()=>$("#lf").onsubmit=e=>{e.preventDefault();toast("Sign in is not connected yet")};
R.about=()=>`<section class="sec"><h1>About VECLRA</h1><p style="max-width:60ch">VECLRA is an online boutique for women, men and children, with shoes, bags, jewellery, beauty and accessories chosen for people who like to be noticed. Every order is packed with care and delivered across Ghana.</p></section>`;
R.contact=()=>`<section class="sec"><h1>Contact us</h1><p>The fastest way to reach us is WhatsApp.</p><p><a class="btn wa" href="https://wa.me/${WA}" target="_blank" rel="noopener">Chat on WhatsApp</a></p><p class="mut">Replace the number at the top of script.js with your own.</p></section>`;

document.addEventListener("click",e=>{const t=e.target.closest("[data-w],[data-add],[data-q],[data-rm]");if(!t)return;const d=t.dataset;if(d.w){wish=wish.includes(d.w)?wish.filter(x=>x!==d.w):[...wish,d.w];store.set("vl_wish",wish);t.classList.toggle("on");counts()}else if(d.add)addCart(d.add);else{if(d.q!==undefined){const l=cart[+d.q];l.qty=Math.max(1,l.qty+ +d.d)}else cart.splice(+d.rm,1);store.set("vl_cart",cart);render()}});
function render(){$("#app").innerHTML=(R[PAGE]||R.home)();(after[PAGE]||(()=>{}))();counts()}
render();