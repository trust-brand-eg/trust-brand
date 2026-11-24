// Safe storage: some in-app browsers (and sandboxed frames) block localStorage and throw.
// Fall back to memory so the site never breaks.
const TB_MEM = {};
const TB_LS = {
  getItem(k) { try { return window.localStorage.getItem(k); } catch (e) { return Object.prototype.hasOwnProperty.call(TB_MEM, k) ? TB_MEM[k] : null; } },
  setItem(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { TB_MEM[k] = String(v); } },
  removeItem(k) { try { window.localStorage.removeItem(k); } catch (e) { delete TB_MEM[k]; } }
};

/* ---- Supabase (public anon key only; row-level security protects data) ---- */
const SB_URL = 'https://dmehmqbmhpuqttsnjrey.supabase.co';
const SB_KEY = 'sb_publishable_-1duEagNkox3QocD199TzA_Ord5AuOx';
const SB = {
  session() { try { return JSON.parse(TB_LS.getItem('tb_sb_v1')) || null; } catch (e) { return null; } },
  setSession(x) { if (x) TB_LS.setItem('tb_sb_v1', JSON.stringify(x)); else TB_LS.removeItem('tb_sb_v1'); },
  pack(r) { return { access_token: r.access_token, refresh_token: r.refresh_token, expires_at: Math.floor(Date.now() / 1000) + (r.expires_in || 3600), user: r.user }; },
  async token() {
    let s = SB.session(); if (!s) return null;
    if (s.expires_at - 60 < Date.now() / 1000) {
      try {
        const r = await fetch(SB_URL + '/auth/v1/token?grant_type=refresh_token', { method: 'POST', headers: { apikey: SB_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ refresh_token: s.refresh_token }) });
        const j = await r.json();
        if (!r.ok) { SB.setSession(null); return null; }
        s = SB.pack(j); SB.setSession(s);
      } catch (e) { return s.access_token; }
    }
    return s.access_token;
  },
  async api(method, path, body, prefer) {
    const t = await SB.token();
    const h = { apikey: SB_KEY, 'Content-Type': 'application/json' };
    if (t) h.Authorization = 'Bearer ' + t;
    if (prefer) h.Prefer = prefer;
    const r = await fetch(SB_URL + '/rest/v1/' + path, { method, headers: h, body: body === undefined ? undefined : JSON.stringify(body) });
    const txt = await r.text(); let j = null; try { j = txt ? JSON.parse(txt) : null; } catch (e) {}
    if (!r.ok) { const err = new Error((j && (j.message || j.hint)) || ('HTTP ' + r.status)); err.status = r.status; throw err; }
    return j;
  },
  async rpc(fn, args) { return SB.api('POST', 'rpc/' + fn, args); },
  async authCall(path, body, query) {
    const r = await fetch(SB_URL + '/auth/v1/' + path + (query || ''), { method: 'POST', headers: { apikey: SB_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { const err = new Error(j.msg || j.error_description || j.message || 'auth error'); err.code = j.error_code || j.code; throw err; }
    return j;
  },
  async signUp(email, password, name, phone) {
    const j = await SB.authCall('signup', { email, password, data: { full_name: name, phone: phone || '' } });
    if (!j.access_token) throw new Error('confirm');
    SB.setSession(SB.pack(j)); return j.user;
  },
  async signIn(email, password) {
    const j = await SB.authCall('token', { email, password }, '?grant_type=password');
    SB.setSession(SB.pack(j)); return j.user;
  },
  async emailLink(email, redirect) {
    return SB.authCall('otp', { email, create_user: false }, '?redirect_to=' + encodeURIComponent(redirect));
  },
  async fromHash() {
    const h = location.hash || '';
    if (h.indexOf('access_token=') < 0) return;
    const p = new URLSearchParams(h.slice(1));
    const at = p.get('access_token');
    try {
      history.replaceState(null, '', location.pathname + location.search);
      const r = await fetch(SB_URL + '/auth/v1/user', { headers: { apikey: SB_KEY, Authorization: 'Bearer ' + at } });
      const user = await r.json();
      if (r.ok) SB.setSession({ access_token: at, refresh_token: p.get('refresh_token'), expires_at: Math.floor(Date.now() / 1000) + Number(p.get('expires_in') || 3600), user });
    } catch (e) {}
  },
  out() { SB.setSession(null); }
};
SB.ready = SB.fromHash();
function sbSyncProducts() {
  let c = null; try { c = JSON.parse(TB_LS.getItem('tb_pcache_v1')); } catch (e) {}
  if (c && Date.now() - c.t < 8000) return c.list;
  try {
    const x = new XMLHttpRequest();
    x.open('GET', SB_URL + '/rest/v1/products?select=*&active=eq.true&order=sort', false);
    x.setRequestHeader('apikey', SB_KEY);
    x.send();
    if (x.status === 200) { const list = JSON.parse(x.responseText); TB_LS.setItem('tb_pcache_v1', JSON.stringify({ t: Date.now(), list })); return list; }
  } catch (e) {}
  return c ? c.list : null;
}

/* Trust Brand - shared storefront logic (Supabase database) */
if (typeof TB_STRINGS !== 'undefined') {
  Object.assign(TB_STRINGS.ar, { payCardHint: '', emailNote: 'سنتواصل معك على رقم الموبايل لتأكيد الطلب.', statusPacked: 'جاهز للشحن', email: 'البريد الإلكتروني', password: 'كلمة المرور', signUp: 'إنشاء حساب', haveAcct: 'لديك حساب؟', noAcct: 'ليس لديك حساب؟', authErr: 'تعذر تسجيل الدخول. تأكد من البريد وكلمة المرور.', signUpErr: 'تعذر إنشاء الحساب. جرّب بريدًا آخر أو كلمة مرور من 6 أحرف على الأقل.', orderErr: 'تعذر إرسال الطلب. حاول مرة أخرى.', footerDisclaimer: 'الصور توضيحية وقد تختلف المنتجات قليلًا.' });
  Object.assign(TB_STRINGS.en, { payCardHint: '', emailNote: 'We will call your mobile number to confirm the order.', statusPacked: 'Ready to ship', email: 'Email', password: 'Password', signUp: 'Create account', haveAcct: 'Have an account?', noAcct: 'No account?', authErr: 'Could not sign in. Check your email and password.', signUpErr: 'Could not create the account. Try another email or a password of 6+ characters.', orderErr: 'Could not send the order. Please try again.' });
}
const TB = {
  _db: sbSyncProducts(),
  _mine: null,
  // ---- language ----
  lang() {
    const l = TB_LS.getItem('tb_lang');
    return (l === 'en' || l === 'ar') ? l : 'ar';
  },
  setLang(l) { TB_LS.setItem('tb_lang', l); location.reload(); },
  t(key) { return TB_STRINGS[TB.lang()][key] !== undefined ? TB_STRINGS[TB.lang()][key] : key; },
  applyDir() {
    document.documentElement.lang = TB.lang();
    document.documentElement.dir = TB.t('dir');
  },
  fmt(n) {
    const s = TB.t('egp');
    const num = Number(n).toLocaleString(TB.lang() === 'ar' ? 'ar-EG' : 'en-EG');
    return TB.lang() === 'ar' ? `${num} ${s}` : `${s} ${num}`;
  },
  esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; },

  // ---- catalog (base data + admin overrides/additions) ----
  products() {
    let list;
    if (TB._db) {
      list = TB._db.map(r => ({ id: r.id, sku: r.sku, cat: r.cat, ar: r.ar, en: r.en, price: Number(r.price), old: r.old_price == null ? null : Number(r.old_price), rating: Number(r.rating) || 0, reviews: r.reviews || 0, stock: r.stock, low: r.low_stock, img: r.img, desc_ar: r.desc_ar, desc_en: r.desc_en, specs: r.specs || { ar: [], en: [] }, featured: !!r.featured }));
    } else list = TB_PRODUCTS;
    return list.map(p => Object.assign({}, p, { img: TB.img(p.img) }));
  },
  img(src) { return (window.TB_IMGS && window.TB_IMGS[src]) || src; },
  product(id) { return TB.products().find(p => p.id === id); },
  catName(catId) {
    const c = TB_CATEGORIES.find(c => c.id === catId);
    return c ? (TB.lang() === 'ar' ? c.ar : c.en) : catId;
  },

  // ---- cart ----
  cart() {
    try { return JSON.parse(TB_LS.getItem('tb_cart_v1')) || []; } catch (e) { return []; }
  },
  saveCart(c) { TB_LS.setItem('tb_cart_v1', JSON.stringify(c)); TB.updateCartBadge(); },
  addToCart(id, qty) {
    qty = qty || 1;
    const c = TB.cart();
    const line = c.find(l => l.id === id);
    if (line) line.qty = Math.min(line.qty + qty, 20); else c.push({ id, qty });
    TB.saveCart(c);
  },
  setQty(id, qty) {
    let c = TB.cart();
    if (qty <= 0) c = c.filter(l => l.id !== id);
    else { const line = c.find(l => l.id === id); if (line) line.qty = qty; }
    TB.saveCart(c);
  },
  cartCount() { return TB.cart().reduce((s, l) => s + l.qty, 0); },
  cartLines() { return TB.cart().map(l => ({ ...l, product: TB.product(l.id) })).filter(l => l.product); },
  cartSubtotal() { return TB.cartLines().reduce((s, l) => s + l.product.price * l.qty, 0); },
  shippingFor(subtotal) { return subtotal === 0 || subtotal >= TB_SHIPPING.freeOver ? 0 : TB_SHIPPING.flat; },
  updateCartBadge() {
    document.querySelectorAll('[data-cart-badge]').forEach(el => {
      const n = TB.cartCount();
      el.textContent = n > 99 ? '99+' : n;
      el.style.display = n ? 'flex' : 'none';
    });
  },

  // ---- orders (database; server checks prices and stock) ----
  async placeOrder(info) {
    const lines = TB.cartLines();
    const res = await SB.rpc('place_order', { p_customer: info, p_items: lines.map(l => ({ id: l.id, qty: l.qty })) });
    TB_LS.setItem('tb_last_order', JSON.stringify(res));
    TB_LS.removeItem('tb_pcache_v1');
    TB.saveCart([]);
    return res;
  },
  lastOrder(n) { try { const o = JSON.parse(TB_LS.getItem('tb_last_order')); return o && o.number === n ? o : null; } catch (e) { return null; } },
  async loadMyOrders() {
    if (!SB.session()) return;
    try {
      const rows = await SB.api('GET', 'orders?select=number,total,status,created_at&order=created_at.desc&limit=20');
      TB._mine = rows;
      const el = document.getElementById('myOrders');
      if (el) el.innerHTML = TB.myOrdersHtml();
    } catch (e) {}
  },
  myOrdersHtml() {
    const o = TB._mine;
    if (!o) return `<p class="muted">...</p>`;
    if (!o.length) return `<p class="muted">${TB.t('noOrders')}</p>`;
    return `<ul class="order-mini">${o.map(x => `<li><strong>${x.number}</strong> · ${TB.fmt(x.total)} · ${TB.t('status' + x.status[0].toUpperCase() + x.status.slice(1))}</li>`).join('')}</ul>`;
  },

  // ---- account (Supabase auth) ----
  account() {
    const s = SB.session(); if (!s || !s.user) return null;
    const m = s.user.user_metadata || {};
    return { name: m.full_name || (s.user.email || '').split('@')[0], phone: m.phone || '', email: s.user.email, id: s.user.id };
  },
  signOut() { SB.out(); },
  async authSubmit(form, mode) {
    const err = document.getElementById('authErr'); err.hidden = true;
    const btn = form.querySelector('button'); btn.disabled = true;
    try {
      if (mode === 'up') await SB.signUp(form.e.value.trim(), form.pw.value, form.n.value.trim(), form.p.value.trim());
      else await SB.signIn(form.e.value.trim(), form.pw.value);
      location.reload();
    } catch (e) { err.textContent = TB.t(mode === 'up' ? 'signUpErr' : 'authErr'); err.hidden = false; btn.disabled = false; }
  },
  authMode: 'in',
  setAuthMode(m) { TB.authMode = m; const p = document.getElementById('authBox'); if (p) p.innerHTML = TB.authForm(); },
  authForm() {
    const up = TB.authMode === 'up';
    return `<h4>${up ? TB.t('signUp') : TB.t('signIn')}</h4>
      <form onsubmit="event.preventDefault(); TB.authSubmit(this, '${up ? 'up' : 'in'}');">
        ${up ? `<input name="n" required placeholder="${TB.t('name')}"><input name="p" inputmode="tel" placeholder="${TB.t('phone')}">` : ''}
        <input name="e" type="email" required placeholder="${TB.t('email')}" autocomplete="email">
        <input name="pw" type="password" required minlength="6" placeholder="${TB.t('password')}" autocomplete="${up ? 'new-password' : 'current-password'}">
        <button class="btn btn-primary btn-block">${up ? TB.t('signUp') : TB.t('signIn')}</button>
        <p class="field-error" id="authErr" hidden></p>
      </form>
      <p class="small muted" style="margin-top:8px">${up ? TB.t('haveAcct') : TB.t('noAcct')} <a href="#" onclick="event.preventDefault();TB.setAuthMode('${up ? 'in' : 'up'}')">${up ? TB.t('signIn') : TB.t('signUp')}</a></p>`;
  },

  // ---- rendering helpers ----
  stars(rating) {
    const full = Math.round(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  },
  productCard(p) {
    const lang = TB.lang();
    const name = lang === 'ar' ? p.ar : p.en;
    const disc = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    const stockCls = p.stock === 0 ? 'out' : (p.stock <= 20 ? 'low' : 'in');
    const stockTxt = p.stock === 0 ? TB.t('outOfStock') : (p.stock <= 20 ? TB.t('lowStock') : TB.t('inStock'));
    return `
    <article class="card">
      <a class="card-img" href="product.html?id=${encodeURIComponent(p.id)}" aria-label="${TB.esc(name)}">
        ${disc ? `<span class="badge-deal">-${disc}%</span>` : ''}
        <img src="${p.img}" alt="${TB.esc(name)}" loading="lazy">
      </a>
      <div class="card-body">
        <a class="card-name" href="product.html?id=${encodeURIComponent(p.id)}">${TB.esc(name)}</a>
        <div class="card-rating"><span class="stars">${TB.stars(p.rating)}</span> <span class="muted">(${p.reviews})</span></div>
        <div class="card-price">
          <strong>${TB.fmt(p.price)}</strong>
          ${p.old ? `<del>${TB.fmt(p.old)}</del>` : ''}
        </div>
        <div class="stock ${stockCls}">${stockTxt}</div>
        <button class="btn btn-primary btn-block" ${p.stock === 0 ? 'disabled' : ''} onclick="TB.onAdd('${p.id}', this)">${TB.t('addToCart')}</button>
      </div>
    </article>`;
  },
  onAdd(id, btn) {
    TB.addToCart(id, 1);
    if (btn) {
      const old = btn.textContent;
      btn.textContent = TB.t('added');
      btn.classList.add('added');
      setTimeout(() => { btn.textContent = old; btn.classList.remove('added'); }, 1200);
    }
  },

  header(active) {
    const lang = TB.lang();
    const acct = TB.account();
    return `
    <div class="demo-banner">${TB.t('demoBanner')}</div>
    <header class="site-header">
      <div class="header-main">
        <a href="index.html" class="brand">
          <img class="brand-logo" src="logo.svg" alt="Trust">
          <span class="brand-text"><small>${TB.t('tagline')}</small></span>
        </a>
        <form class="search-bar" action="index.html" method="get" role="search">
          <input type="search" name="q" placeholder="${TB.t('searchPlaceholder')}" value="${TB.esc(new URLSearchParams(location.search).get('q') || '')}">
          <button type="submit" aria-label="${TB.t('search')}">🔍</button>
        </form>
        <nav class="header-actions">
          <button class="hbtn" onclick="TB.toggleAccountPanel()">👤 <span>${acct ? TB.t('hello') + ' ' + TB.esc(acct.name.split(' ')[0]) : TB.t('account')}</span></button>
          <a class="hbtn cart-btn" href="cart.html">🛒 <span>${TB.t('cart')}</span><span class="cart-badge" data-cart-badge>0</span></a>
          <button class="hbtn lang-btn" onclick="TB.setLang('${lang === 'ar' ? 'en' : 'ar'}')">🌐 ${TB.t('otherLang')}</button>
        </nav>
      </div>
      <nav class="cat-nav">
        <a href="index.html" class="${active === 'home' ? 'active' : ''}">${TB.t('home')}</a>
        <a href="index.html#deals">${TB.t('deals')}</a>
        ${TB_CATEGORIES.map(c => `<a href="index.html?cat=${c.id}">${lang === 'ar' ? c.ar : c.en}</a>`).join('')}
      </nav>
    </header>
    <div class="account-panel" id="accountPanel" hidden>
      ${acct ? `
        <p><strong>${TB.t('hello')} ${TB.esc(acct.name)}</strong></p>
        <p class="muted small">${TB.esc(acct.email || '')}</p>
        <h4>${TB.t('myOrders')}</h4>
        <div id="myOrders">${TB.myOrdersHtml()}</div>
        <button class="btn btn-ghost" onclick="TB.signOut();location.reload()">${TB.t('signOut')}</button>
      ` : `<div id="authBox">${TB.authForm()}</div>`}
    </div>`;
  },

  footer() {
    return `
    <footer class="site-footer">
      <div class="footer-cols">
        <div>
          <div class="brand footer-brand"><img class="brand-logo" src="logo.svg" alt="Trust"></div>
          <p>${TB.t('footerAbout')}</p>
          <p class="muted small">${TB.t('footerDisclaimer')}</p>
        </div>
        <div>
          <h4>${TB.t('quickLinks')}</h4>
          <a href="index.html">${TB.t('home')}</a>
          <a href="index.html#deals">${TB.t('deals')}</a>
          <a href="cart.html">${TB.t('cart')}</a>
        </div>
        <div>
          <h4>${TB.t('contactUs')}</h4>
          <p class="muted">📞 PHONE_HERE<br>💬 WHATSAPP_HERE<br>📍 ADDRESS_HERE</p>
        </div>
      </div>
      <div class="footer-bar">© 2026 ${TB.t('brand')}</div>
    </footer>`;
  },

  toggleAccountPanel() {
    const p = document.getElementById('accountPanel');
    p.hidden = !p.hidden;
  },

  mount(active) {
    TB.applyDir();
    const h = document.getElementById('siteHeader');
    if (h) h.innerHTML = TB.header(active);
    const f = document.getElementById('siteFooter');
    if (f) f.innerHTML = TB.footer();
    TB.updateCartBadge();
    TB.loadMyOrders();
  }
};
