const API = window.AURELIA_SUPABASE_URL;
const KEY = window.AURELIA_SUPABASE_KEY;

let products = [];
let variantsByProduct = new Map();
let imagesByProduct = new Map();
let cart = [];

const el = id => document.getElementById(id);
const money = v => new Intl.NumberFormat('en-GH',{style:'currency',currency:'GHS',minimumFractionDigits:2}).format(Number(v||0));

function apiHeaders(token){
  const h = {'apikey': KEY, 'Content-Type':'application/json'};
  if(token) h.Authorization = `Bearer ${token}`;
  return h;
}

async function api(path, options={}){
  const res = await fetch(`${API}${path}`, { ...options, headers:{...apiHeaders(options.token), ...(options.headers||{})} });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if(!res.ok){
    const message = data?.message || data?.msg || data?.error_description || data?.error || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status; err.data = data;
    throw err;
  }
  return data;
}

async function db(path, options={}){
  return api(`/rest/v1${path}`, options);
}

function setNotice(id,msg){ const node=el(id); if(node){node.textContent=msg||'';} }

function animateHero(){
  const stage=document.querySelector('.hero-stage'), garment=document.querySelector('.hero-garment');
  const orbitOne=document.querySelector('.orbit-one'), orbitTwo=document.querySelector('.orbit-two');
  const markerA=document.querySelector('.marker-a'), markerB=document.querySelector('.marker-b');
  if(!stage||!garment) return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)'); if(reduce.matches) return;
  const rect=stage.getBoundingClientRect(), center=window.innerHeight*.5;
  const p=Math.max(-1,Math.min(1,((rect.top+rect.height*.5)-center)/(window.innerHeight*.8)));
  garment.style.transform=`translate3d(0,${p*-32}px,0) rotate(${p*-4}deg) scale(${1+Math.abs(p)*.035})`;
  if(orbitOne) orbitOne.style.transform=`rotate(-16deg) translateY(${p*20}px)`;
  if(orbitTwo) orbitTwo.style.transform=`rotate(17deg) translateY(${-p*30}px)`;
  if(markerA) markerA.style.transform=`translateY(${p*-18}px)`;
  if(markerB) markerB.style.transform=`rotate(180deg) translateY(${p*22}px)`;
}
let ticking=false;
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{animateHero();ticking=false});ticking=true;}},{passive:true});
window.addEventListener('resize',animateHero);

function escapeHtml(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function productImage(p){const imgs=imagesByProduct.get(p.id)||[];return imgs[0]?.image_url||'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80';}

async function loadStore(){
  const grid=el('productGrid');
  try{
    const [ps,vs,is,settingsRows]=await Promise.all([
      db('/products?select=*&is_published=eq.true&order=created_at.desc'),
      db('/product_variants?select=*'),
      db('/product_images?select=*&order=sort_order.asc'),
      db('/store_settings?select=*&limit=1')
    ]);
    products=ps||[]; variantsByProduct=new Map(); imagesByProduct=new Map();
    (vs||[]).forEach(v=>{if(!variantsByProduct.has(v.product_id))variantsByProduct.set(v.product_id,[]);variantsByProduct.get(v.product_id).push(v)});
    (is||[]).forEach(i=>{if(!imagesByProduct.has(i.product_id))imagesByProduct.set(i.product_id,[]);imagesByProduct.get(i.product_id).push(i)});
    renderProducts();
    const settings=settingsRows?.[0];
    if(settings){
      el('storeAddress').textContent=settings.address||'Accra / Ghana';
      el('storePhone').textContent=settings.phone||'';
      const wa=(settings.whatsapp_number||settings.phone||'').replace(/[^0-9]/g,'');
      el('whatsappLink').href=wa?`https://wa.me/${wa}?text=${encodeURIComponent('Hello Aurelia Atelier, I would like some help with a piece.')}`:'#';
    }
  }catch(err){
    console.error(err);
    grid.innerHTML=`<div class="loading-card">The collection could not load. ${escapeHtml(err.message)}<br><br>Please refresh the page.</div>`;
  }
}

function renderProducts(){
  const grid=el('productGrid');
  if(!products.length){grid.innerHTML='<div class="loading-card">No pieces are published yet.</div>';return;}
  grid.innerHTML=products.map(p=>{
    const vs=variantsByProduct.get(p.id)||[]; const stock=vs.reduce((a,b)=>a+b.stock_qty,0); const sizes=[...new Set(vs.map(v=>v.size).filter(Boolean))];
    return `<article class="product-card"><button class="product-image" data-product="${p.id}"><img src="${productImage(p)}" alt="${escapeHtml(p.name)}" loading="lazy"><span>${stock>0?`${stock} in stock`:'Sold out'}</span></button><div class="product-copy"><div><p class="product-category">${escapeHtml(p.category||'Ready piece')}</p><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.description||'')}</p></div><strong>${money(p.price)}</strong></div><div class="product-foot"><span>${sizes.length?`Sizes ${sizes.join(', ')}`:'Limited stock'}</span><button class="add-link" data-add="${p.id}" ${stock<=0?'disabled':''}>Add to bag ↗</button></div></article>`;
  }).join('');
  document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>openProduct(b.dataset.add));
  document.querySelectorAll('[data-product]').forEach(b=>b.onclick=()=>openProduct(b.dataset.product));
}

function openProduct(id){
  const p=products.find(x=>x.id===id), vs=(variantsByProduct.get(id)||[]).filter(v=>v.stock_qty>0); if(!p||!vs.length)return;
  const size=vs.find(v=>v.size==='M')||vs[0]; cart.push({productId:p.id,variantId:size.id,name:p.name,size:size.size,color:size.color,price:Number(p.price),qty:1}); syncCart(); openCartDrawer();
}
function syncCart(){
  const total=cart.reduce((a,b)=>a+b.price*b.qty,0); el('cartCount').textContent=cart.reduce((a,b)=>a+b.qty,0); el('cartTotal').textContent=money(total); el('checkoutTotal').textContent=money(total);
  el('cartItems').innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-item"><div><strong>${escapeHtml(x.name)}</strong><span>${escapeHtml(x.size||'One size')} · Qty ${x.qty}</span></div><b>${money(x.price*x.qty)}</b><button data-remove="${i}" aria-label="Remove ${escapeHtml(x.name)}">×</button></div>`).join(''):'<div class="empty-bag">Your bag is empty.<br><a href="#shop">Browse ready pieces →</a></div>';
  document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{cart.splice(Number(b.dataset.remove),1);syncCart()});
}
function openCartDrawer(){el('drawerBackdrop').classList.remove('hidden');el('cartDrawer').classList.add('open');el('cartDrawer').setAttribute('aria-hidden','false')}
function closeCart(){el('drawerBackdrop').classList.add('hidden');el('cartDrawer').classList.remove('open');el('cartDrawer').setAttribute('aria-hidden','true')}

el('openCart').onclick=openCartDrawer;el('closeCart').onclick=closeCart;el('drawerBackdrop').onclick=closeCart;syncCart();
el('startCheckout').onclick=()=>{if(!cart.length){alert('Your bag is empty.');return}closeCart();setNotice('checkoutResult','');el('checkoutModal').classList.remove('hidden')};
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>el(b.dataset.close).classList.add('hidden'));

el('checkoutForm').onsubmit=async e=>{
  e.preventDefault(); const button=e.target.querySelector('button[type=submit]'); button.disabled=true; button.textContent='Placing order…'; setNotice('checkoutResult','');
  try{
    const payload=cart.map(x=>({variant_id:x.variantId,quantity:x.qty}));
    const data=await db('/rpc/place_order',{method:'POST',body:JSON.stringify({p_customer_name:el('customerName').value.trim(),p_customer_email:el('customerEmail').value.trim(),p_customer_phone:el('customerPhone').value.trim(),p_delivery_address:el('customerAddress').value.trim(),p_items:payload})});
    el('checkoutResult').innerHTML=`Order <strong>#${escapeHtml(data.order_number)}</strong> received. The atelier will contact you on the number you provided.`; cart=[]; syncCart(); loadStore();
  }catch(err){ setNotice('checkoutResult',err.message||'We could not place this order.'); }
  button.disabled=false;button.innerHTML='Place order <span>↗</span>';
};

animateHero();
loadStore();
