const stage = document.querySelector('.hero-stage');
const garment = document.querySelector('.hero-garment');
const orbitOne = document.querySelector('.orbit-one');
const orbitTwo = document.querySelector('.orbit-two');
const markerA = document.querySelector('.marker-a');
const markerB = document.querySelector('.marker-b');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const supabaseClient = window.supabase.createClient(window.AURELIA_SUPABASE_URL, window.AURELIA_SUPABASE_KEY);
let products = [], variantsByProduct = new Map(), imagesByProduct = new Map(), cart = [], currentTab = 'products';

function animateHero(){
  if(reduceMotion.matches || !stage) return;
  const rect=stage.getBoundingClientRect(); const viewportCenter=window.innerHeight*.5;
  const distance=(rect.top+rect.height*.5)-viewportCenter; const progress=Math.max(-1,Math.min(1,distance/(window.innerHeight*.8)));
  garment.style.transform=`translate3d(0,${progress*-32}px,0) rotate(${progress*-4}deg) scale(${1+Math.abs(progress)*.035})`;
  orbitOne.style.transform=`rotate(-16deg) translateY(${progress*20}px)`; orbitTwo.style.transform=`rotate(17deg) translateY(${-progress*30}px)`;
  markerA.style.transform=`translateY(${progress*-18}px)`; markerB.style.transform=`rotate(180deg) translateY(${progress*22}px)`;
}
let ticking=false; window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(()=>{animateHero();ticking=false});ticking=true}},{passive:true}); window.addEventListener('resize',animateHero); animateHero();

const money=v=>new Intl.NumberFormat('en-GH',{style:'currency',currency:'GHS',minimumFractionDigits:2}).format(Number(v||0));
const el=id=>document.getElementById(id);

async function loadStore(){
  const [{data:ps,error:pe},{data:vs,error:ve},{data:is,error:ie},{data:settings,error:se}]=await Promise.all([
    supabaseClient.from('products').select('*').eq('is_published',true).order('created_at',{ascending:false}),
    supabaseClient.from('product_variants').select('*'),
    supabaseClient.from('product_images').select('*').order('sort_order',{ascending:true}),
    supabaseClient.from('store_settings').select('*').limit(1).maybeSingle()
  ]);
  if(pe||ve||ie||se){console.error(pe||ve||ie||se); el('productGrid').innerHTML='<div class="loading-card">The store could not load right now. Please refresh and try again.</div>'; return;}
  products=ps||[]; variantsByProduct=new Map(); imagesByProduct=new Map(); (vs||[]).forEach(v=>{if(!variantsByProduct.has(v.product_id))variantsByProduct.set(v.product_id,[]);variantsByProduct.get(v.product_id).push(v)}); (is||[]).forEach(i=>{if(!imagesByProduct.has(i.product_id))imagesByProduct.set(i.product_id,[]);imagesByProduct.get(i.product_id).push(i)});
  renderProducts(); if(settings){el('storeAddress').textContent=settings.address||'Accra / Ghana'; el('storePhone').textContent=settings.phone||''; const wa=(settings.whatsapp_number||settings.phone||'').replace(/[^0-9]/g,''); el('whatsappLink').href=wa?`https://wa.me/${wa}?text=${encodeURIComponent('Hello Aurelia Atelier, I would like some help with a piece.')}`:'#';}
}

function productImage(p){const imgs=imagesByProduct.get(p.id)||[];return imgs[0]?.image_url||`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80`;}
function renderProducts(){
  if(!products.length){el('productGrid').innerHTML='<div class="loading-card">No pieces are published yet.</div>'; return;}
  el('productGrid').innerHTML=products.map(p=>{
    const vs=variantsByProduct.get(p.id)||[]; const stock=vs.reduce((a,b)=>a+b.stock_qty,0); const image=productImage(p); const sizes=[...new Set(vs.map(v=>v.size).filter(Boolean))];
    return `<article class="product-card"><button class="product-image" data-product="${p.id}"><img src="${image}" alt="${escapeHtml(p.name)}" loading="lazy"><span>${stock>0?`${stock} in stock`:'Sold out'}</span></button><div class="product-copy"><div><p class="product-category">${escapeHtml(p.category||'Ready piece')}</p><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.description||'')}</p></div><strong>${money(p.price)}</strong></div><div class="product-foot"><span>${sizes.length?`Sizes ${sizes.join(', ')}`:'Limited stock'}</span><button class="add-link" data-add="${p.id}" ${stock<=0?'disabled':''}>Add to bag ↗</button></div></article>`;
  }).join('');
  document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>openProduct(b.dataset.add)); document.querySelectorAll('[data-product]').forEach(b=>b.onclick=()=>openProduct(b.dataset.product));
}
function escapeHtml(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function openProduct(id){
  const p=products.find(x=>x.id===id),vs=(variantsByProduct.get(id)||[]).filter(v=>v.stock_qty>0); if(!p||!vs.length)return;
  const size=vs.find(v=>v.size==='M')||vs[0];
  const qty=Math.min(1,size.stock_qty); cart.push({productId:p.id,variantId:size.id,name:p.name,size:size.size,color:size.color,price:Number(p.price),qty});
  syncCart(); openCartDrawer();
}
function syncCart(){el('cartCount').textContent=cart.reduce((a,b)=>a+b.qty,0); el('cartTotal').textContent=money(cart.reduce((a,b)=>a+b.price*b.qty,0)); el('checkoutTotal').textContent=money(cart.reduce((a,b)=>a+b.price*b.qty,0));
  if(!cart.length){el('cartItems').innerHTML='<div class="empty-bag">Your bag is empty.<br><a href="#shop">Browse ready pieces →</a></div>';return}
  el('cartItems').innerHTML=cart.map((x,i)=>`<div class="cart-item"><div><strong>${escapeHtml(x.name)}</strong><span>${escapeHtml(x.size||'One size')} · Qty ${x.qty}</span></div><b>${money(x.price*x.qty)}</b><button data-remove="${i}" aria-label="Remove ${escapeHtml(x.name)}">×</button></div>`).join(''); document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{cart.splice(Number(b.dataset.remove),1);syncCart()});
}
function openCartDrawer(){el('drawerBackdrop').classList.remove('hidden'); el('cartDrawer').classList.add('open'); el('cartDrawer').setAttribute('aria-hidden','false')}
function closeCart(){el('drawerBackdrop').classList.add('hidden'); el('cartDrawer').classList.remove('open'); el('cartDrawer').setAttribute('aria-hidden','true')}
el('openCart').onclick=openCartDrawer; el('closeCart').onclick=closeCart; el('drawerBackdrop').onclick=closeCart; syncCart();

el('startCheckout').onclick=()=>{if(!cart.length){alert('Your bag is empty.');return} closeCart(); el('checkoutResult').textContent=''; el('checkoutModal').classList.remove('hidden')};

document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>el(b.dataset.close).classList.add('hidden'));

eLnoop(); function eLnoop(){}
el('checkoutForm').onsubmit=async e=>{
  e.preventDefault(); const button=e.target.querySelector('button[type=submit]'); button.disabled=true; button.textContent='Placing order…';
  const payload=cart.map(x=>({variant_id:x.variantId,quantity:x.qty}));
  const {data,error}=await supabaseClient.rpc('place_order',{p_customer_name:el('customerName').value,p_customer_email:el('customerEmail').value,p_customer_phone:el('customerPhone').value,p_delivery_address:el('customerAddress').value,p_items:payload});
  button.disabled=false; button.innerHTML='Place order <span>↗</span>';
  if(error){el('checkoutResult').textContent=error.message||'We could not place this order. Please try again.'; return}
  el('checkoutResult').innerHTML=`Order <strong>#${data.order_number}</strong> received. The atelier will contact you on the number you provided.`; cart=[]; syncCart(); loadStore();
};

el('openAdmin').onclick=async()=>{el('adminModal').classList.remove('hidden'); const {data:{session}}=await supabaseClient.auth.getSession(); if(session)showAdmin(); else showLogin();};
function showLogin(){el('adminLogin').classList.remove('hidden');el('adminPanel').classList.add('hidden')}
async function showAdmin(){
  const {data,isError}=await supabaseClient.from('store_admins').select('user_id').eq('user_id',(await supabaseClient.auth.getUser()).data.user?.id).maybeSingle();
  if(isError||!data){await supabaseClient.auth.signOut();showLogin();return}
  el('adminLogin').classList.add('hidden');el('adminPanel').classList.remove('hidden'); await renderAdmin();
}
el('loginForm').onsubmit=async e=>{e.preventDefault(); const r=el('loginResult'); r.textContent='Signing in…'; const {error}=await supabaseClient.auth.signInWithPassword({email:el('loginEmail').value,password:el('loginPassword').value}); if(error){r.textContent=error.message;return} r.textContent=''; await showAdmin()};
el('logout').onclick=async()=>{await supabaseClient.auth.signOut();showLogin()};

document.querySelectorAll('.admin-tabs button').forEach(b=>b.onclick=async()=>{currentTab=b.dataset.tab;document.querySelectorAll('.admin-tabs button').forEach(x=>x.classList.toggle('active',x===b));['Products','Orders','Settings'].forEach(n=>el('tab'+n).classList.toggle('hidden',n.toLowerCase()!==currentTab)); await renderAdminTab()});
async function renderAdmin(){currentTab='products';document.querySelectorAll('.admin-tabs button').forEach((x,i)=>x.classList.toggle('active',i===0));['Products','Orders','Settings'].forEach((n,i)=>el('tab'+n).classList.toggle('hidden',i!==0)); await renderAdminTab()}
async function renderAdminTab(){
  const [{data:ps},{data:os},{data:settings}]=await Promise.all([supabaseClient.from('products').select('*').order('created_at',{ascending:false}),supabaseClient.from('orders').select('*').order('created_at',{ascending:false}),supabaseClient.from('store_settings').select('*').limit(1).maybeSingle()]);
  const published=(ps||[]).filter(x=>x.is_published).length, pending=(os||[]).filter(x=>x.order_status==='new').length, sales=(os||[]).filter(x=>x.payment_status==='paid').reduce((a,x)=>a+Number(x.total),0);
  el('metrics').innerHTML=`<div><strong>${published}</strong><span>Published products</span></div><div><strong>${pending}</strong><span>New orders</span></div><div><strong>${money(sales)}</strong><span>Paid sales</span></div>`;
  if(currentTab==='products') el('tabProducts').innerHTML=`<div class="admin-actions"><h3>Products</h3><button class="contact-cta small" id="newProduct">Add product ↗</button></div>${(ps||[]).map(p=>`<div class="admin-row"><div><strong>${escapeHtml(p.name)}</strong><span>${money(p.price)} · ${p.is_published?'Published':'Hidden'}</span></div><button data-toggle="${p.id}">${p.is_published?'Hide':'Publish'}</button></div>`).join('')||'<p class="muted">No products yet.</p>'}`;
  if(currentTab==='orders') el('tabOrders').innerHTML=`<div class="admin-actions"><h3>Orders</h3><button class="secondary-dark" id="refreshOrders">Refresh</button></div>${(os||[]).map(o=>`<div class="admin-row order"><div><strong>#${o.order_number} · ${escapeHtml(o.customer_name)}</strong><span>${money(o.total)} · ${o.payment_status} · ${o.order_status}</span></div><select data-order="${o.id}"><option ${o.order_status==='new'?'selected':''}>new</option><option ${o.order_status==='confirmed'?'selected':''}>confirmed</option><option ${o.order_status==='processing'?'selected':''}>processing</option><option ${o.order_status==='ready'?'selected':''}>ready</option><option ${o.order_status==='delivered'?'selected':''}>delivered</option><option ${o.order_status==='cancelled'?'selected':''}>cancelled</option></select></div>`).join('')||'<p class="muted">No orders yet.</p>'}`;
  if(currentTab==='settings'){const s=settings||{}; el('tabSettings').innerHTML=`<form class="settings-form" id="settingsForm"><label>Business name<input id="setName" value="${escapeHtml(s.business_name||'Aurelia Atelier')}"></label><label>Phone<input id="setPhone" value="${escapeHtml(s.phone||'')}"></label><label>WhatsApp number<input id="setWa" value="${escapeHtml(s.whatsapp_number||'')}"></label><label>Instagram URL<input id="setInsta" value="${escapeHtml(s.instagram_url||'')}"></label><label>Address<textarea id="setAddress" rows="3">${escapeHtml(s.address||'')}</textarea></label><label>Delivery notes<textarea id="setDelivery" rows="3">${escapeHtml(s.delivery_notes||'')}</textarea></label><button class="contact-cta small" type="submit">Save store settings ↗</button><div id="settingsResult" class="form-result"></div></form>`;
    el('settingsForm').onsubmit=async ev=>{ev.preventDefault(); const values={business_name:el('setName').value,phone:el('setPhone').value,whatsapp_number:el('setWa').value,instagram_url:el('setInsta').value,address:el('setAddress').value,delivery_notes:el('setDelivery').value,updated_at:new Date().toISOString()}; const {data:row}=await supabaseClient.from('store_settings').select('id').limit(1).maybeSingle(); const {error}=row?await supabaseClient.from('store_settings').update(values).eq('id',row.id):await supabaseClient.from('store_settings').insert(values); el('settingsResult').textContent=error?error.message:'Saved.'; if(!error)loadStore();};
  }
  const np=el('newProduct'); if(np) np.onclick=()=>newProductForm();
  document.querySelectorAll('[data-toggle]').forEach(b=>b.onclick=async()=>{const p=(ps||[]).find(x=>x.id===b.dataset.toggle); await supabaseClient.from('products').update({is_published:!p.is_published,updated_at:new Date().toISOString()}).eq('id',p.id); await renderAdminTab();loadStore()});
  document.querySelectorAll('[data-order]').forEach(s=>s.onchange=async()=>{await supabaseClient.from('orders').update({order_status:s.value,updated_at:new Date().toISOString()}).eq('id',s.dataset.order);await renderAdminTab()});
  const ro=el('refreshOrders');if(ro)ro.onclick=renderAdminTab;
}
function newProductForm(){
 const box=el('tabProducts'); box.innerHTML=`<form class="settings-form" id="productForm"><h3>New product</h3><label>Name<input id="pName" required></label><label>Price (GHS)<input id="pPrice" type="number" min="0" step="0.01" required></label><label>Category<input id="pCategory" placeholder="Dresses"></label><label>Description<textarea id="pDescription" rows="3"></textarea></label><label>Product image URL<input id="pImage" placeholder="https://..."></label><label>Size options<input id="pSizes" value="S,M,L"></label><label>Opening stock per size<input id="pStock" type="number" min="0" value="4"></label><div><button class="contact-cta small" type="submit">Create product ↗</button><button class="secondary-dark" type="button" id="cancelProduct">Cancel</button></div><div id="productResult" class="form-result"></div></form>`;
 el('cancelProduct').onclick=renderAdminTab; el('productForm').onsubmit=async e=>{e.preventDefault();const name=el('pName').value,slug=name.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); const {data:p,error:pe}=await supabaseClient.from('products').insert({name,slug,price:Number(el('pPrice').value),category:el('pCategory').value,description:el('pDescription').value,is_published:true}).select().single();if(pe){el('productResult').textContent=pe.message;return} const sizes=el('pSizes').value.split(',').map(x=>x.trim()).filter(Boolean);const rows=sizes.map(s=>({product_id:p.id,size:s,color:'Signature',sku:`${slug.slice(0,3).toUpperCase()}-${s}`,stock_qty:Number(el('pStock').value)})); const {error:ve}=await supabaseClient.from('product_variants').insert(rows);if(ve){el('productResult').textContent=ve.message;return} const imageUrl=el('pImage').value.trim(); if(imageUrl){await supabaseClient.from('product_images').insert({product_id:p.id,image_url:imageUrl,alt_text:name,sort_order:0});} await loadStore();await renderAdminTab();};
}

supabaseClient.auth.onAuthStateChange((_event,session)=>{if(session)showAdmin()});
loadStore();
