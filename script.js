const API = window.AURELIA_SUPABASE_URL;
const KEY = window.AURELIA_SUPABASE_KEY;
const SESSION_KEY = 'aurelia_admin_session_v1';

let products = [];
let variantsByProduct = new Map();
let imagesByProduct = new Map();
let cart = [];
let currentTab = 'products';
let adminSession = loadSession();

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

function saveSession(s){ sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)); adminSession=s; }
function loadSession(){ try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)||'null'); } catch { return null; } }
function clearSession(){ sessionStorage.removeItem(SESSION_KEY); adminSession=null; }

async function refreshSession(){
  if(!adminSession?.refresh_token) return null;
  try{
    const token = await api('/auth/v1/token?grant_type=refresh_token',{method:'POST',body:JSON.stringify({refresh_token:adminSession.refresh_token})});
    saveSession(token); return token;
  }catch{ clearSession(); return null; }
}

async function authenticated(path, options={}){
  if(!adminSession?.access_token) throw new Error('Please sign in again.');
  try { return await api(path,{...options,token:adminSession.access_token}); }
  catch(err){
    if(err.status===401 && adminSession.refresh_token){
      const refreshed = await refreshSession();
      if(refreshed) return await api(path,{...options,token:refreshed.access_token});
    }
    throw err;
  }
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

eLnoop(); function eLnoop(){}
el('checkoutForm').onsubmit=async e=>{
  e.preventDefault(); const button=e.target.querySelector('button[type=submit]'); button.disabled=true; button.textContent='Placing order…'; setNotice('checkoutResult','');
  try{
    const payload=cart.map(x=>({variant_id:x.variantId,quantity:x.qty}));
    const data=await db('/rpc/place_order',{method:'POST',body:JSON.stringify({p_customer_name:el('customerName').value.trim(),p_customer_email:el('customerEmail').value.trim(),p_customer_phone:el('customerPhone').value.trim(),p_delivery_address:el('customerAddress').value.trim(),p_items:payload})});
    el('checkoutResult').innerHTML=`Order <strong>#${escapeHtml(data.order_number)}</strong> received. The atelier will contact you on the number you provided.`; cart=[]; syncCart(); loadStore();
  }catch(err){ setNotice('checkoutResult',err.message||'We could not place this order.'); }
  button.disabled=false;button.innerHTML='Place order <span>↗</span>';
};

el('openAdmin').onclick=async()=>{el('adminModal').classList.remove('hidden'); setNotice('loginResult',''); if(adminSession){try{await verifyAdmin();return}catch{clearSession();}} showLogin()};
function showLogin(){el('adminLogin').classList.remove('hidden');el('adminPanel').classList.add('hidden')}
async function verifyAdmin(){
  const user=await authenticated('/auth/v1/user');
  const rows=await authenticated(`/rest/v1/store_admins?select=user_id&user_id=eq.${encodeURIComponent(user.id)}&limit=1`);
  if(!rows?.length) throw new Error('This account is not an authorized store owner.');
  el('adminLogin').classList.add('hidden');el('adminPanel').classList.remove('hidden');await renderAdmin();
}
el('loginForm').onsubmit=async e=>{
  e.preventDefault(); const r=el('loginResult'); const button=e.target.querySelector('button[type=submit]'); button.disabled=true; r.textContent='Signing in…';
  try{
    const token=await api('/auth/v1/token?grant_type=password',{method:'POST',body:JSON.stringify({email:el('loginEmail').value.trim(),password:el('loginPassword').value})});
    saveSession(token); await verifyAdmin(); r.textContent='';
  }catch(err){
    r.textContent=err.message||'Sign in failed.';
  }
  button.disabled=false;
};
el('logout').onclick=async()=>{try{if(adminSession?.access_token)await api('/auth/v1/logout',{method:'POST',token:adminSession.access_token})}catch{} clearSession();showLogin()};

document.querySelectorAll('.admin-tabs button').forEach(b=>b.onclick=async()=>{currentTab=b.dataset.tab;document.querySelectorAll('.admin-tabs button').forEach(x=>x.classList.toggle('active',x===b));['Products','Orders','Settings'].forEach(n=>el('tab'+n).classList.toggle('hidden',n.toLowerCase()!==currentTab));await renderAdminTab()});

async function renderAdmin(){currentTab='products';document.querySelectorAll('.admin-tabs button').forEach((x,i)=>x.classList.toggle('active',i===0));['Products','Orders','Settings'].forEach((n,i)=>el('tab'+n).classList.toggle('hidden',i!==0));await renderAdminTab()}
async function renderAdminTab(){
  const box=el('tabProducts');
  try{
    const [ps,os,settingsRows]=await Promise.all([authenticated('/rest/v1/products?select=*&order=created_at.desc'),authenticated('/rest/v1/orders?select=*&order=created_at.desc'),authenticated('/rest/v1/store_settings?select=*&limit=1')]);
    const sales=(os||[]).filter(o=>o.payment_status==='paid').reduce((a,o)=>a+Number(o.total||0),0);
    el('metrics').innerHTML=`<div><strong>${(ps||[]).length}</strong><span>Products</span></div><div><strong>${(os||[]).length}</strong><span>Orders</span></div><div><strong>${money(sales)}</strong><span>Recorded sales</span></div>`;
    el('tabProducts').innerHTML=`<div class="admin-actions"><h3>Products</h3><button class="contact-cta small" id="addProduct">Add product ↗</button></div>${(ps||[]).map(p=>`<div class="admin-row"><div><strong>${escapeHtml(p.name)}</strong><span>${money(p.price)} · ${p.is_published?'Published':'Hidden'}</span></div><button data-toggle="${p.id}">${p.is_published?'Hide':'Publish'}</button></div>`).join('')}`;
    el('tabOrders').innerHTML=`<div class="admin-actions"><h3>Orders</h3><button class="secondary-dark" id="refreshOrders">Refresh</button></div>${(os||[]).length?(os||[]).map(o=>`<div class="admin-row"><div><strong>#${escapeHtml(o.order_number)} · ${escapeHtml(o.customer_name)}</strong><span>${money(o.total)} · ${escapeHtml(o.customer_phone)} · ${escapeHtml(o.payment_status)}</span></div><select data-order="${o.id}">${['new','confirmed','processing','ready','delivered','cancelled'].map(s=>`<option value="${s}" ${o.order_status===s?'selected':''}>${s}</option>`).join('')}</select></div>`).join(''):'<p class="muted">No orders yet.</p>'}`;
    const settings=settingsRows?.[0]||{};
    el('tabSettings').innerHTML=`<form class="settings-form" id="settingsForm"><h3>Store settings</h3><label>Business name<input id="setName" value="${escapeHtml(settings.business_name||'Aurelia Atelier')}"></label><label>Phone<input id="setPhone" value="${escapeHtml(settings.phone||'')}"></label><label>WhatsApp<input id="setWa" value="${escapeHtml(settings.whatsapp_number||'')}"></label><label>Instagram URL<input id="setInsta" value="${escapeHtml(settings.instagram_url||'')}"></label><label>Address<input id="setAddress" value="${escapeHtml(settings.address||'')}"></label><label>Delivery notes<textarea id="setDelivery" rows="3">${escapeHtml(settings.delivery_notes||'')}</textarea></label><button class="contact-cta small" type="submit">Save settings ↗</button><div class="form-result" id="settingsResult"></div></form>`;
    document.querySelectorAll('[data-toggle]').forEach(b=>b.onclick=async()=>{const p=(ps||[]).find(x=>x.id===b.dataset.toggle);try{await authenticated(`/rest/v1/products?id=eq.${encodeURIComponent(p.id)}`,{method:'PATCH',body:JSON.stringify({is_published:!p.is_published,updated_at:new Date().toISOString()}),headers:{Prefer:'return=minimal'}});await loadStore();await renderAdminTab()}catch(err){alert(err.message)}});
    document.querySelectorAll('[data-order]').forEach(s=>s.onchange=async()=>{try{await authenticated(`/rest/v1/orders?id=eq.${encodeURIComponent(s.dataset.order)}`,{method:'PATCH',body:JSON.stringify({order_status:s.value,updated_at:new Date().toISOString()}),headers:{Prefer:'return=minimal'}});await renderAdminTab()}catch(err){alert(err.message)}});
    el('addProduct').onclick=newProductForm; const ro=el('refreshOrders'); if(ro)ro.onclick=renderAdminTab;
    el('settingsForm').onsubmit=async ev=>{ev.preventDefault();const values={business_name:el('setName').value,phone:el('setPhone').value,whatsapp_number:el('setWa').value,instagram_url:el('setInsta').value,address:el('setAddress').value,delivery_notes:el('setDelivery').value,updated_at:new Date().toISOString()};try{if(settings.id)await authenticated(`/rest/v1/store_settings?id=eq.${encodeURIComponent(settings.id)}`,{method:'PATCH',body:JSON.stringify(values),headers:{Prefer:'return=minimal'}});else await authenticated('/rest/v1/store_settings',{method:'POST',body:JSON.stringify(values)});setNotice('settingsResult','Saved.');await loadStore()}catch(err){setNotice('settingsResult',err.message)}};
  }catch(err){ box.innerHTML=`<div class="loading-card">Dashboard could not load: ${escapeHtml(err.message)}</div>`; }
}

function newProductForm(){
 const box=el('tabProducts'); box.innerHTML=`<form class="settings-form" id="productForm"><h3>New product</h3><label>Name<input id="pName" required></label><label>Price (GHS)<input id="pPrice" type="number" min="0" step="0.01" required></label><label>Category<input id="pCategory" placeholder="Dresses"></label><label>Description<textarea id="pDescription" rows="3"></textarea></label><label>Product image URL<input id="pImage" placeholder="https://..."></label><label>Size options<input id="pSizes" value="S,M,L"></label><label>Opening stock per size<input id="pStock" type="number" min="0" value="4"></label><div><button class="contact-cta small" type="submit">Create product ↗</button><button class="secondary-dark" type="button" id="cancelProduct">Cancel</button></div><div id="productResult" class="form-result"></div></form>`;
 el('cancelProduct').onclick=renderAdminTab;
 el('productForm').onsubmit=async e=>{e.preventDefault();try{const name=el('pName').value.trim(),slug=name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');if(!name||!slug)throw new Error('Product name is required.');const rows=await authenticated('/rest/v1/products?select=*',{method:'POST',body:JSON.stringify({name,slug,price:Number(el('pPrice').value),category:el('pCategory').value,description:el('pDescription').value,is_published:true}),headers:{Prefer:'return=representation'}});const p=rows[0];const sizes=el('pSizes').value.split(',').map(x=>x.trim()).filter(Boolean);await authenticated('/rest/v1/product_variants',{method:'POST',body:JSON.stringify(sizes.map(s=>({product_id:p.id,size:s,color:'Signature',sku:`${slug.slice(0,3).toUpperCase()}-${s}`,stock_qty:Number(el('pStock').value)})))});const imageUrl=el('pImage').value.trim();if(imageUrl)await authenticated('/rest/v1/product_images',{method:'POST',body:JSON.stringify({product_id:p.id,image_url:imageUrl,alt_text:name,sort_order:0})});await loadStore();await renderAdminTab();}catch(err){setNotice('productResult',err.message)}};
}

animateHero();
loadStore();
