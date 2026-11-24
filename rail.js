/* Trust Brand - original hanging rail + kinetic "Trust" messages. Own code and artwork. */
(function () {
  var G = [
    { id: 'scrub-blue',  type: 'top',   color: '#1E6FD9', en: 'Scrub Set, Trust Blue',  ar: 'طقم سكراب أزرق', price: 650, sizes: ['S','M','L','XL','XXL'], de: 'Soft stretch fabric, V-neck top and drawstring pants, two roomy pockets.', da: 'قماش مرن ناعم، بلوزة بياقة V وبنطلون برباط، جيبان واسعان.' },
    { id: 'scrub-green', type: 'top',   color: '#1FA855', en: 'Scrub Set, Trust Green', ar: 'طقم سكراب أخضر', price: 650, sizes: ['S','M','L','XL','XXL'], de: 'Breathable and easy to wash. Top and pants, built for long shifts.', da: 'قماش يتنفس وسهل الغسيل. بلوزة وبنطلون للورديات الطويلة.' },
    { id: 'scrub-red',   type: 'top',   color: '#E53935', en: 'Scrub Set, Trust Red',   ar: 'طقم سكراب أحمر', price: 650, sizes: ['S','M','L','XL','XXL'], de: 'Colour-fast fabric that keeps its shape wash after wash.', da: 'قماش ثابت اللون يحافظ على شكله بعد الغسيل.' },
    { id: 'labcoat-medical', cat: 'labcoats', type: 'coat',  color: '#F4F7FA', en: 'Medical Lab Coat',       ar: 'بالطو طبي (أطباء)', price: 720, sizes: ['S','M','L','XL','XXL'], de: 'Knee-length white coat for doctors and labs. Three pockets, snap buttons, wrinkle resistant.', da: 'بالطو أبيض بطول الركبة للأطباء والمعامل. ثلاثة جيوب وأزرار كبسولة ومقاوم للتجعد.' },
    { id: 'labcoat-dental', cat: 'labcoats', type: 'dental', color: '#7FD6C8', en: 'Dental Lab Coat',        ar: 'بالطو أسنان', price: 540, sizes: ['S','M','L','XL'], de: 'Short, side-snap dental jacket in soft mint. Stain-resistant, easy to move in.', da: 'جاكيت أسنان قصير بأزرار جانبية بلون نعناعي ناعم. مقاوم للبقع وسهل الحركة.' },
    { id: 'scrub-pants', type: 'pants', color: '#17365D', en: 'Scrub Pants, Navy',      ar: 'بنطلون سكراب كحلي', price: 380, sizes: ['S','M','L','XL','XXL'], de: 'Elastic drawstring waist, cargo pocket, soft stretch.', da: 'وسط مطاطي برباط، جيب جانبي، قماش مرن.' },
    { id: 'surgical-cap',type: 'cap',   color: '#1FA855', en: 'Surgical Cap',           ar: 'طاقية جراحة', price: 90, sizes: ['One size'], de: 'Lightweight cotton cap with an adjustable back tie.', da: 'طاقية قطن خفيفة بخيط خلفي قابل للتعديل.' }
  ];
  G.forEach(function (g) { if (!g.cat) g.cat = 'scrubs'; });
  var byId = {}; G.forEach(function (g) { byId[g.id] = g; });
  function shade(hex, a) { var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; function c(x) { return Math.max(0, Math.min(255, Math.round(x + a))); } return 'rgb(' + c(r) + ',' + c(g) + ',' + c(b) + ')'; }
  function art(g, hang) {
    var c = g.color, d = shade(c, -35), l = shade(c, 30), s = '', st = '#0003';
    if (hang) s += '<path d="M60 8 v14 M60 22 C60 22 28 38 12 52 Q8 56 14 58 H106 Q112 56 108 52 C92 38 60 22 60 22" fill="none" stroke="#9aa7b4" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="8" r="4" fill="none" stroke="#9aa7b4" stroke-width="3"/>';
    var y = hang ? 52 : 14;
    if (g.type === 'top') s += '<g transform="translate(0,' + (y - 14) + ')"><path d="M38 14 L10 30 L20 56 L34 50 L34 130 H86 V50 L100 56 L110 30 L82 14 L60 40 Z" fill="' + c + '" stroke="' + st + '" stroke-width="2"/><path d="M38 14 L60 40 L82 14 L72 12 L60 26 L48 12 Z" fill="' + d + '"/><rect x="40" y="86" width="16" height="16" rx="3" fill="' + l + '" stroke="' + st + '"/><rect x="64" y="86" width="16" height="16" rx="3" fill="' + l + '" stroke="' + st + '"/></g>';
    if (g.type === 'coat') s += '<g transform="translate(0,' + (y - 14) + ')"><path d="M38 14 L8 32 L18 62 L32 56 L30 168 H90 L88 56 L102 62 L112 32 L82 14 L72 14 L60 46 L48 14 Z" fill="' + c + '" stroke="#9aa7b4" stroke-width="2"/><path d="M60 46 V168" stroke="#9aa7b4" stroke-width="2"/><path d="M48 14 L60 46 L72 14" fill="#e6ecf2" stroke="#9aa7b4" stroke-width="2"/><rect x="36" y="110" width="18" height="22" rx="3" fill="#fff" stroke="#9aa7b4"/><rect x="66" y="110" width="18" height="22" rx="3" fill="#fff" stroke="#9aa7b4"/><circle cx="60" cy="80" r="2.5" fill="#9aa7b4"/><circle cx="60" cy="102" r="2.5" fill="#9aa7b4"/><rect x="38" y="70" width="12" height="3" fill="#1E6FD9"/></g>';
    if (g.type === 'pants') s += '<g transform="translate(0,' + (y - 14) + ')"><path d="M32 14 H88 L92 150 H66 L60 60 L54 150 H28 Z" fill="' + c + '" stroke="' + st + '" stroke-width="2"/><rect x="32" y="14" width="56" height="10" fill="' + d + '"/><path d="M56 24 v18 M64 24 v18" stroke="' + l + '" stroke-width="2"/><rect x="34" y="70" width="12" height="20" rx="3" fill="' + l + '" opacity=".6"/></g>';
    if (g.type === 'dental') s += '<g transform="translate(0,' + (y - 14) + ')"><path d="M40 14 L12 30 L20 58 L34 52 L34 118 H86 V52 L100 58 L108 30 L80 14 L60 36 Z" fill="' + c + '" stroke="' + st + '" stroke-width="2"/><path d="M40 14 L60 36 L80 14 L70 12 L60 24 L50 12 Z" fill="' + d + '"/><path d="M86 52 V118" stroke="' + d + '" stroke-width="2" stroke-dasharray="3 3"/><circle cx="86" cy="64" r="2.5" fill="' + d + '"/><circle cx="86" cy="84" r="2.5" fill="' + d + '"/><rect x="40" y="82" width="16" height="18" rx="3" fill="' + l + '" stroke="' + st + '"/></g>';
    if (g.type === 'cap') s += '<g transform="translate(0,' + (y + 10) + ')"><path d="M18 50 Q18 6 60 6 Q102 6 102 50 Q60 36 18 50 Z" fill="' + c + '" stroke="' + st + '" stroke-width="2"/><path d="M18 50 Q60 36 102 50 L96 58 Q60 46 24 58 Z" fill="' + d + '"/><path d="M40 16 Q60 10 80 16" stroke="' + l + '" stroke-width="3" fill="none"/></g>';
    return s;
  }
  function svg(g, hang) { var h = g.type === 'coat' ? 215 : g.type === 'dental' ? 160 : g.type === 'cap' ? 125 : g.type === 'pants' ? 195 : 175; return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 ' + h + '">' + art(g, hang) + '</svg>'; }
  function uri(g) { var s = svg(g, false).replace('viewBox="0 0 120 ' + (0) + '"', 'viewBox="0 0 120 190"'); s = s.replace('<svg ', '<svg ').replace('</svg>', '</svg>'); return 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 190"><rect width="120" height="190" fill="#eef3f7"/><g transform="translate(0,10)">' + art(g, false) + '</g></svg>'); }

  function view(g, k) {
    var bg = '<rect width="120" height="190" fill="#eef3f7"/>', body = '';
    if (k === 0) body = '<g transform="translate(0,12)">' + art(g, false) + '</g>';
    else if (k === 1) body = '<g transform="translate(120,12) scale(-1,1)">' + art(Object.assign({}, g), false) + '</g><path d="M60 40 V150" stroke="#0002" stroke-width="2" stroke-dasharray="4 4"/>';
    else if (k === 2) body = '<g transform="translate(-50,-30) scale(1.8)">' + art(g, false) + '</g>';
    else body = '<g transform="translate(0,12)">' + art(g, true) + '</g><text x="60" y="182" font-size="9" text-anchor="middle" fill="#5b6b78">' + g.sizes.join(' · ') + '</text>';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 190">' + bg + body + '</svg>');
  }
  TB.gallery = function (p) { var g = byId[String(p.id).split('~')[0]]; return g ? [0, 1, 2, 3].map(function (k) { return view(g, k); }) : [p.img]; };
  TB.enhancePdp = function (p) {
    var root = document.querySelector('.pdp'); if (!root) return; var base = String(p.id).split('~')[0], g = byId[base], ar = TB.lang() === 'ar';
    var box = root.querySelector('.pdp-img'), gal = TB.gallery(p); if (!g) { var hh = root.querySelector('h1'); if (hh && !root.querySelector('.trust-tag')) hh.insertAdjacentHTML('beforebegin', '<span class="trust-tag">Trust</span>'); }
    if (gal.length > 1) {
      box.innerHTML = '<img class="pdp-main" src="' + gal[0] + '" alt=""><div class="thumbs">' + gal.map(function (u, i) { return '<button type="button" class="thumb' + (i ? '' : ' on') + '" data-i="' + i + '"><img src="' + u + '" alt=""></button>'; }).join('') + '</div>';
      box.querySelectorAll('.thumb').forEach(function (b) { b.onclick = function () { box.querySelector('.pdp-main').src = gal[b.dataset.i]; box.querySelectorAll('.thumb').forEach(function (x) { x.classList.toggle('on', x === b); }); }; });
    }
    if (g) {
      var size = g.sizes[Math.min(1, g.sizes.length - 1)], row = document.createElement('div');
      row.className = 'rp-sizes'; row.innerHTML = '<strong>' + (ar ? 'المقاس' : 'Size') + '</strong> ' + g.sizes.map(function (s) { return '<button type="button" class="chip' + (s === size ? ' on' : '') + '" data-s="' + s + '">' + s + '</button>'; }).join('');
      var q = root.querySelector('.qty-row'); var h1 = root.querySelector('h1'); if (h1 && !root.querySelector('.trust-tag')) h1.insertAdjacentHTML('beforebegin', '<span class="trust-tag">Trust</span>'); q.parentNode.insertBefore(row, q);
      row.querySelectorAll('.chip').forEach(function (c) { c.onclick = function () { size = c.dataset.s; row.querySelectorAll('.chip').forEach(function (x) { x.classList.toggle('on', x === c); }); }; });
      var add = root.querySelector('.pdp-info .btn-primary'); add.removeAttribute('onclick');
      add.onclick = function () { TB.fly(add); TB.addToCart(base + '~' + size, Number(document.getElementById('qtySel').value)); TB.kinetic(ar ? ['تمت', 'الإضافة', 'إلى', 'سلتك'] : ['Added', 'to', 'your', 'cart']); };
    }
  };
  // header: sign in, customer service, inquiries
  if (typeof TB_STRINGS !== "undefined") { TB_STRINGS.ar.account = 'تسجيل الدخول'; TB_STRINGS.en.account = 'Sign in'; }
  var oHeader = TB.header;
  TB.header = function (a) {
    var ar = TB.lang() === 'ar', h = oHeader.call(TB, a);
    return h.replace('<a class="hbtn cart-btn"', '<a class="hbtn" href="contact.html">🎧 <span>' + (ar ? 'خدمة العملاء' : 'Support') + '</span></a><a class="hbtn" href="contact.html#inquiry">✉️ <span>' + (ar ? 'استفسار' : 'Inquiry') + '</span></a><a class="hbtn cart-btn"');
  };
  var oFooter = TB.footer;
  TB.footer = function () { return oFooter.call(TB).replace('<a href="cart.html">', '<a href="contact.html">' + (TB.lang() === 'ar' ? 'خدمة العملاء والاستفسارات' : 'Customer service & inquiries') + '</a>\n          <a href="cart.html">'); };

  var oCard = TB.productCard;
  TB.productCard = function (p) { return oCard.call(TB, p).replace('<div class="card-body">', '<div class="card-body"><span class="trust-tag">Trust</span>'); };
  TB.fly = function (from) {
    try {
      var cart = document.querySelector('.cart-btn'); if (!cart || !from || !from.getBoundingClientRect || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
      var a = from.getBoundingClientRect(), b = cart.getBoundingClientRect(), d = document.createElement('div');
      d.className = 'fly-dot'; d.textContent = 'Trust'; d.style.left = a.left + a.width / 2 - 28 + 'px'; d.style.top = a.top + a.height / 2 - 14 + 'px'; document.body.appendChild(d);
      var dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
      var an = d.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: 'translate(' + dx * 0.5 + 'px,' + (dy * 0.5 - 90) + 'px) scale(1.15) rotate(-8deg)', opacity: 1, offset: 0.55 }, { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.25)', opacity: 0.2 }], { duration: 750, easing: 'cubic-bezier(.4,.1,.3,1)' });
      an.onfinish = function () { d.remove(); cart.classList.remove('bump'); void cart.offsetWidth; cart.classList.add('bump'); };
    } catch (e) {}
  };
  var oAdd2 = TB.onAdd;
  TB.onAdd = function (id, btn) { TB.fly(btn); oAdd2.call(TB, id, btn); };
  // catalog integration
  if (typeof TB_CATEGORIES !== "undefined" && !TB_CATEGORIES.some(function (c) { return c.id === 'labcoats'; })) { TB_CATEGORIES.push({ id: 'labcoats', en: 'Lab Coats', ar: 'بالطو معمل', icon: '🥼' }); TB_CATEGORIES.push({ id: 'scrubs', en: 'Scrubs & Caps', ar: 'سكراب وطواقي', icon: '👕' }); }
  function asProduct(g) { return { id: g.id, sku: 'TB-2' + (100 + G.indexOf(g)), cat: g.cat, en: g.en, ar: g.ar, price: g.price, old: null, rating: 4.6, reviews: 40 + G.indexOf(g) * 7, stock: 30, img: 'g:' + g.id, desc_en: g.de, desc_ar: g.da, specs: { en: ['Sizes ' + g.sizes.join(', '), 'Trust'], ar: ['المقاسات ' + g.sizes.join('، '), 'Trust'] } }; }
  var oImg = TB.img, oProducts = TB.products, oProduct = TB.product;
  TB.img = function (s) { if (typeof s === 'string' && s.indexOf('g:') === 0 && byId[s.slice(2)]) return uri(byId[s.slice(2)]); return oImg.call(TB, s); };
  TB.products = function () { var l = oProducts.call(TB); G.forEach(function (g) { if (!l.some(function (p) { return p.id === g.id; })) l.push(Object.assign(asProduct(g), { img: TB.img('g:' + g.id) })); }); return l; };
  TB.product = function (id) { var b = String(id).split('~'), p = TB.products().find(function (x) { return x.id === b[0]; }); if (!p) return p; if (b[1]) { p = Object.assign({}, p, { id: id, en: p.en + ' (' + b[1] + ')', ar: p.ar + ' (' + b[1] + ')' }); } return p; };

  // kinetic message
  function kinetic(words) {
    var old = document.getElementById('tbKin'); if (old) old.remove();
    var el = document.createElement('div'); el.id = 'tbKin'; el.setAttribute('role', 'status');
    el.innerHTML = '<span class="kin-logo"><b style="color:#E53935">T</b><b style="color:#1E6FD9">ru</b><b style="color:#1FA855">st</b></span>' + words.map(function (w, i) { return '<span class="kin-w" style="animation-delay:' + (0.25 + i * 0.35) + 's">' + w + '</span>'; }).join('');
    document.body.appendChild(el); setTimeout(function () { el.classList.add('out'); }, 1700 + words.length * 350); setTimeout(function () { el.remove(); }, 2300 + words.length * 350);
  }
  var oOnAdd = TB.onAdd;
  TB.onAdd = function (id, btn) { oOnAdd.call(TB, id, btn); kinetic(TB.lang() === 'ar' ? ['تمت', 'الإضافة', 'إلى', 'سلتك'] : ['Added', 'to', 'your', 'cart']); };
  TB.kinetic = kinetic;

  // rail
  TB.mountRail = function (host) {
    if (!host) return; var ar = TB.lang() === 'ar', cur = null;
    host.innerHTML = '<div class="rail-wrap"><div class="rail-bar"></div><div class="rail-row">' + G.map(function (g, i) {
      return '<button class="garment" data-id="' + g.id + '" style="--d:' + (i * 0.45) + 's" aria-label="' + (ar ? g.ar : g.en) + '"><span class="swing">' + svg(g, true) + '</span><span class="g-name">' + (ar ? g.ar : g.en) + '</span></button>'; }).join('') + '</div></div><div class="rail-panel" id="railPanel" hidden></div>';
    var panel = host.querySelector('#railPanel');
    host.querySelectorAll('.garment').forEach(function (b) {
      b.addEventListener('click', function () {
        var g = byId[b.dataset.id], sw = b.querySelector('.swing');
        sw.classList.remove('go'); void sw.offsetWidth; sw.classList.add('go');
        host.querySelectorAll('.garment').forEach(function (x) { x.classList.toggle('sel', x === b); });
        var size = g.sizes[Math.min(1, g.sizes.length - 1)];
        panel.hidden = false; panel.classList.remove('in'); void panel.offsetWidth; panel.classList.add('in');
        panel.innerHTML = '<div class="rp-art">' + svg(g, false) + '</div><div class="rp-info"><h3>' + (ar ? g.ar : g.en) + '</h3><p>' + (ar ? g.da : g.de) + '</p><div class="rp-sizes">' + g.sizes.map(function (s) { return '<button type="button" class="chip' + (s === size ? ' on' : '') + '" data-s="' + s + '">' + s + '</button>'; }).join('') + '</div><div class="rp-buy"><strong>' + TB.fmt(g.price) + '</strong><button class="btn btn-primary" id="rpAdd">' + TB.t('addToCart') + '</button><a class="btn btn-ghost" href="product.html?id=' + g.id + '">' + (ar ? 'التفاصيل' : 'Details') + '</a></div></div>';
        panel.querySelectorAll('.chip').forEach(function (c) { c.onclick = function () { size = c.dataset.s; panel.querySelectorAll('.chip').forEach(function (x) { x.classList.toggle('on', x === c); }); }; });
        panel.querySelector('#rpAdd').onclick = function () { TB.fly(this); TB.addToCart(g.id + '~' + size, 1); kinetic(ar ? ['تمت', 'الإضافة', 'إلى', 'سلتك'] : ['Added', 'to', 'your', 'cart']); };
      });
    });
  };
})();
