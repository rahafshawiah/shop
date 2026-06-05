// ═══════════════════════════════════════
//  app.js — منطق التطبيق الكامل
// ═══════════════════════════════════════

/* ─── CART ─── */
function getCart() {
  return JSON.parse(localStorage.getItem('sooq_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('sooq_cart', JSON.stringify(cart));
  updateCartBadge();
}
function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name: product.name, price: product.price, emoji: product.emoji, gradient: product.gradient, qty: 1 });
  }
  saveCart(cart);
  toast('✅ أُضيف إلى السلة: ' + product.name);
}
function removeFromCart(id) {
  let cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
}
function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  saveCart(cart);
  renderCart();
}
function clearCart() {
  if (!confirm('هل تريد حذف جميع المنتجات من السلة؟')) return;
  saveCart([]);
  renderCart();
}

/* ─── RENDER CART ─── */
let appliedPromo = null;

function renderCart() {
  const cart = getCart();
  const content = document.getElementById('cart-content');
  const empty = document.getElementById('cart-empty');
  const list = document.getElementById('cart-items-list');
  if (!content) return;

  if (cart.length === 0) {
    content.style.display = 'none';
    empty.style.display = 'flex';
    return;
  }
  content.style.display = 'grid';
  empty.style.display = 'none';

  document.getElementById('item-count').textContent = cart.length;

  list.innerHTML = cart.map(item => `
    <div class="cart-item" id="ci-${item.id}">
      <div class="ci-thumb" style="background:${item.gradient}">${item.emoji}</div>
      <div class="ci-info">
        <h3>${item.name}</h3>
        <span class="ci-price">${formatPrice(item.price)} ر.س</span>
      </div>
      <div class="ci-controls">
        <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
      </div>
      <div class="ci-total">${formatPrice(item.price * item.qty)} ر.س</div>
      <button class="ci-remove" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join('');

  updateSummary();
}

function updateSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 200 ? 0 : 30;
  let discount = 0;

  if (appliedPromo) {
    const p = PROMO_CODES[appliedPromo];
    discount = p.type === 'percent' ? subtotal * (p.value / 100) : p.value;
    discount = Math.min(discount, subtotal);
  }

  const total = subtotal + shipping - discount;

  document.getElementById('subtotal').textContent = formatPrice(subtotal) + ' ر.س';
  document.getElementById('shipping-cost').textContent = shipping === 0 ? 'مجاني' : shipping + ' ر.س';
  document.getElementById('shipping-cost').className = shipping === 0 ? 'text-green' : '';
  document.getElementById('total-price').textContent = formatPrice(total) + ' ر.س';

  const discRow = document.getElementById('discount-row');
  if (discount > 0) {
    discRow.style.display = 'flex';
    document.getElementById('discount-val').textContent = '−' + formatPrice(discount) + ' ر.س';
  } else {
    discRow.style.display = 'none';
  }
}

function applyPromo() {
  const code = document.getElementById('promo-input').value.trim().toUpperCase();
  const msg = document.getElementById('promo-msg');
  if (!code) return;
  if (PROMO_CODES[code]) {
    appliedPromo = code;
    msg.textContent = '✅ تم تطبيق: ' + PROMO_CODES[code].label;
    msg.className = 'promo-msg success';
    updateSummary();
  } else {
    msg.textContent = '❌ الكود غير صحيح';
    msg.className = 'promo-msg error';
  }
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) return;
  toast('🎉 تم استلام طلبك! سيتم التواصل معك قريباً.');
  setTimeout(() => {
    saveCart([]);
    renderCart();
  }, 2000);
}

/* ─── RENDER PRODUCTS ─── */
let currentView = 'grid';
let currentPage = 1;
const PER_PAGE = 12;

function renderProductCard(p, mini = false) {
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : null;
  return `
    <div class="product-card${mini ? ' mini' : ''}">
      <div class="pc-thumb" style="background:${p.gradient}">
        <span class="pc-emoji">${p.emoji}</span>
        ${p.badge === 'sale' ? `<span class="pc-badge badge-sale">خصم ${discount}٪</span>` : ''}
        ${p.badge === 'bestseller' ? `<span class="pc-badge badge-best">الأكثر مبيعاً</span>` : ''}
        ${p.isNew && !p.badge ? `<span class="pc-badge badge-new">جديد</span>` : ''}
        <button class="pc-wishlist" title="أضف للمفضلة" onclick="toggleWishlist(this, ${p.id})">♡</button>
      </div>
      <div class="pc-body">
        <span class="pc-cat">${catLabel(p.cat)}</span>
        <h3 class="pc-name">${p.name}</h3>
        <div class="pc-rating">
          <span class="stars-sm">${starsHTML(p.rating)}</span>
          <span class="pc-reviews">(${p.reviews})</span>
        </div>
        <div class="pc-price-row">
          <div class="pc-prices">
            <span class="pc-price">${formatPrice(p.price)} ر.س</span>
            ${p.oldPrice ? `<span class="pc-old-price">${formatPrice(p.oldPrice)} ر.س</span>` : ''}
          </div>
          <button class="add-cart-btn" onclick="addToCart(${p.id})">+ سلة</button>
        </div>
      </div>
    </div>
  `;
}

function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  const featured = PRODUCTS.filter(p => p.badge === 'bestseller' || p.rating >= 4.8).slice(0, 8);
  grid.innerHTML = featured.map(p => renderProductCard(p)).join('');
}

function renderSuggested() {
  const grid = document.getElementById('suggested-grid');
  if (!grid) return;
  const shuffled = [...PRODUCTS].sort(() => Math.random() - 0.5).slice(0, 4);
  grid.innerHTML = shuffled.map(p => renderProductCard(p, true)).join('');
}

/* ─── FILTERS (Products Page) ─── */
function applyFilters() {
  currentPage = 1;
  let items = [...PRODUCTS];

  // Category
  const cat = document.querySelector('input[name="cat"]:checked');
  if (cat && cat.value !== 'all') items = items.filter(p => p.cat === cat.value);

  // Price
  const priceMax = document.getElementById('price-max');
  if (priceMax) items = items.filter(p => p.price <= parseInt(priceMax.value));

  // Rating
  const rating = document.querySelector('input[name="rating"]:checked');
  if (rating && parseFloat(rating.value) > 0) items = items.filter(p => p.rating >= parseFloat(rating.value));

  // Sale
  const onSale = document.getElementById('f-sale');
  if (onSale && onSale.checked) items = items.filter(p => p.oldPrice !== null);

  // New
  const onlyNew = document.getElementById('f-new');
  if (onlyNew && onlyNew.checked) items = items.filter(p => p.isNew);

  // Sort
  const sort = document.getElementById('sort-select');
  if (sort) {
    if (sort.value === 'price-asc') items.sort((a, b) => a.price - b.price);
    if (sort.value === 'price-desc') items.sort((a, b) => b.price - a.price);
    if (sort.value === 'rating') items.sort((a, b) => b.rating - a.rating);
    if (sort.value === 'newest') items = items.filter(p => p.isNew).concat(items.filter(p => !p.isNew));
  }

  renderProductsGrid(items);
}

function renderProductsGrid(items) {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('results-count');
  if (!grid) return;

  if (countEl) countEl.textContent = `${items.length} منتج`;

  const start = (currentPage - 1) * PER_PAGE;
  const page = items.slice(start, start + PER_PAGE);

  if (page.length === 0) {
    grid.innerHTML = '<div class="no-results">لا توجد منتجات تطابق الفلتر المحدد 😕<br><small>جرب تغيير معايير البحث</small></div>';
  } else {
    grid.className = 'products-grid' + (currentView === 'list' ? ' list-view' : '');
    grid.innerHTML = page.map(p => renderProductCard(p)).join('');
  }

  renderPagination(items.length);
}

function renderPagination(total) {
  const pg = document.getElementById('pagination');
  if (!pg) return;
  const pages = Math.ceil(total / PER_PAGE);
  if (pages <= 1) { pg.innerHTML = ''; return; }
  pg.innerHTML = Array.from({ length: pages }, (_, i) => i + 1).map(n =>
    `<button class="pg-btn ${n === currentPage ? 'active' : ''}" onclick="goPage(${n}, event)">${n}</button>`
  ).join('');
}

function goPage(n, e) {
  currentPage = n;
  document.querySelectorAll('.pg-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  applyFilters();
  window.scrollTo({ top: 300, behavior: 'smooth' });
}

function setView(v) {
  currentView = v;
  document.getElementById('vbtn-grid').classList.toggle('active', v === 'grid');
  document.getElementById('vbtn-list').classList.toggle('active', v === 'list');
  applyFilters();
}

function resetFilters() {
  document.querySelectorAll('input[name="cat"]')[0].checked = true;
  document.querySelector('input[name="rating"]').checked = true;
  const pm = document.getElementById('price-max');
  if (pm) { pm.value = 2000; updatePriceDisplay(); }
  const fs = document.getElementById('f-sale');
  const fn = document.getElementById('f-new');
  if (fs) fs.checked = false;
  if (fn) fn.checked = false;
  document.getElementById('sort-select').value = 'default';
  applyFilters();
}

function updatePriceDisplay() {
  const val = document.getElementById('price-max').value;
  document.getElementById('price-val').textContent = formatPrice(val) + ' ر.س';
  applyFilters();
}

/* ─── SEARCH ─── */
function toggleSearch() {
  const bar = document.getElementById('search-bar');
  bar.classList.toggle('open');
  if (bar.classList.contains('open')) document.getElementById('search-input').focus();
}

 function liveSearch(q) {
  const box = document.getElementById('search-results');
  if (!q.trim()) { box.innerHTML = ''; box.style.display = 'none'; return; }
  
  // ─── صيانة تصحيحية: معالجة حساسية الأحرف وتفريغ الفراغات الزائدة ───
  const searchQuery = q.trim().toLowerCase();
  
  // فحص المنتجات بعد تحويل أسمائها وجملة البحث إلى أحرف صغيرة لضمان مرونة البحث
  const results = PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery)).slice(0, 6);
  
  if (results.length === 0) {
    box.innerHTML = '<div class="sr-empty">لا توجد نتائج</div>';
  } else {
    box.innerHTML = results.map(p => `
      <a class="sr-item" href="products.html">
        <span class="sr-emoji">${p.emoji}</span>
        <span class="sr-name">${p.name}</span>
        <span class="sr-price">${formatPrice(p.price)} ر.س</span>
      </a>
    `).join('');
  }
  box.style.display = 'block';
}

/* ─── NAVBAR ─── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
});

function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const ham = document.getElementById('hamburger');
  if (menu) menu.classList.toggle('open');
  if (ham) ham.classList.toggle('open');
}

document.addEventListener('click', e => {
  const bar = document.getElementById('search-bar');
  if (bar && bar.classList.contains('open') && !bar.contains(e.target) && !e.target.closest('.icon-btn')) {
    bar.classList.remove('open');
  }
});

/* ─── WISHLIST ─── */
function toggleWishlist(btn, id) {
  btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
  btn.classList.toggle('wishlisted');
  toast(btn.textContent === '♥' ? '❤️ أُضيف إلى المفضلة' : '💔 أُزيل من المفضلة');
}

/* ─── NEWSLETTER ─── */
function subscribeNewsletter(e) {
  e.preventDefault();
  toast('🎉 شكراً! تم تسجيلك في نشرتنا البريدية');
  e.target.reset();
}

/* ─── CONTACT FORM ─── */
function sendContactForm(e) {
  e.preventDefault();
  const btn = document.getElementById('send-btn');
  btn.textContent = 'جارٍ الإرسال...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('form-success').style.display = 'flex';
  }, 1200);
}
function resetContactForm() {
  document.getElementById('contact-form').reset();
  document.getElementById('contact-form').style.display = 'block';
  document.getElementById('form-success').style.display = 'none';
  document.getElementById('send-btn').textContent = 'إرسال الرسالة ✉️';
  document.getElementById('send-btn').disabled = false;
}

/* ─── TOAST ─── */
let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ─── HELPERS ─── */
function formatPrice(n) {
  return Number(n).toLocaleString('ar-SA');
}
function catLabel(c) {
  return { fashion: 'أزياء', electronics: 'إلكترونيات', home: 'منزل', sports: 'رياضة', beauty: 'جمال', books: 'كتب' }[c] || c;
}
function starsHTML(r) {
  return '★'.repeat(Math.floor(r)) + (r % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(r));
}

/* ─── INIT ─── */
updateCartBadge();
