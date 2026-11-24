// Safe storage: some in-app browsers (and sandboxed frames) block localStorage and throw.
// Fall back to memory so the site never breaks.
const TB_MEM = {};
const TB_LS = {
  getItem(k) { try { return window.localStorage.getItem(k); } catch (e) { return Object.prototype.hasOwnProperty.call(TB_MEM, k) ? TB_MEM[k] : null; } },
  setItem(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { TB_MEM[k] = String(v); } },
  removeItem(k) { try { window.localStorage.removeItem(k); } catch (e) { delete TB_MEM[k]; } }
};
/* Trust Brand - shared storefront logic (demo, browser-local storage) */
const TB = {
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
    try { list = JSON.parse(TB_LS.getItem('tb_products_v1')) || null; } catch (e) { list = null; }
    if (!list) list = TB_PRODUCTS;
    return list.map(p => Object.assign({}, p, { img: TB.img(p.img) }));
  },
  img(src) { return (window.TB_IMGS && window.TB_IMGS[src]) || src; },
  saveProducts(list) { TB_LS.setItem('tb_products_v1', JSON.stringify(list)); },
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

  // ---- orders ----
  orders() {
    try { return JSON.parse(TB_LS.getItem('tb_orders_v1')) || []; } catch (e) { return []; }
  },
  saveOrders(o) { TB_LS.setItem('tb_orders_v1', JSON.stringify(o)); },
  placeOrder(info) {
    const lines = TB.cartLines();
    const subtotal = TB.cartSubtotal();
    const shipping = TB.shippingFor(subtotal);
    const order = {
      number: 'TB-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      customer: info,
      items: lines.map(l => ({ id: l.id, qty: l.qty, price: l.product.price, name_ar: l.product.ar, name_en: l.product.en })),
      subtotal, shipping, total: subtotal + shipping,
      status: 'new'
    };
    const orders = TB.orders();
    orders.unshift(order);
    TB.saveOrders(orders);
    // decrement stock locally
    const prods = TB.products();
    lines.forEach(l => { const p = prods.find(p => p.id === l.id); if (p) p.stock = Math.max(0, p.stock - l.qty); });
    TB.saveProducts(prods);
    TB.saveCart([]);
    return order;
  },

  // ---- account (demo, local only) ----
  account() {
    try { return JSON.parse(TB_LS.getItem('tb_account_v1')) || null; } catch (e) { return null; }
  },
  signIn(name, phone) { TB_LS.setItem('tb_account_v1', JSON.stringify({ name, phone })); },
  signOut() { TB_LS.removeItem('tb_account_v1'); },

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
        <p><strong>${TB.t('hello')}, ${TB.esc(acct.name)}</strong></p>
        <h4>${TB.t('myOrders')}</h4>
        ${TB.orders().length === 0 ? `<p class="muted">${TB.t('noOrders')}</p>` :
          `<ul class="order-mini">${TB.orders().map(o => `<li><strong>${o.number}</strong> · ${TB.fmt(o.total)} · ${TB.t('status' + o.status[0].toUpperCase() + o.status.slice(1))}</li>`).join('')}</ul>`}
        <button class="btn btn-ghost" onclick="TB.signOut();location.reload()">${TB.t('signOut')}</button>
      ` : `
        <h4>${TB.t('signIn')}</h4>
        <form onsubmit="event.preventDefault(); TB.signIn(this.n.value, this.p.value); location.reload();">
          <input name="n" required placeholder="${TB.t('name')}">
          <input name="p" required placeholder="${TB.t('phone')}">
          <button class="btn btn-primary btn-block">${TB.t('signIn')}</button>
        </form>
        <p class="muted small">${TB.t('demoBanner')}</p>
      `}
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
          <p class="muted">support@trustbrand.example (demo)<br>+20 100 000 0000 (demo)</p>
        </div>
      </div>
      <div class="footer-bar">© 2026 ${TB.t('brand')} — Demo storefront</div>
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
  }
};
