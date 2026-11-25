// Fencing Finesse — theme, mobile menu, scroll effects, gallery lightbox, enquiry form
(function () {
  var root = document.documentElement;
  var body = document.body;
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var KEY = 'ff-theme';

  /* ---------- Theme (initial value is set inline in <head> before paint) ---------- */
  var themeBtn = document.querySelector('.theme-toggle');
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  function storedTheme() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    if (themeMeta) themeMeta.setAttribute('content', t === 'dark' ? '#111311' : '#ffffff');
    if (themeBtn) {
      themeBtn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
      themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (!reduceMotion) {
        root.classList.add('theme-fade');
        setTimeout(function () { root.classList.remove('theme-fade'); }, 350);
      }
      applyTheme(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  }
  if (window.matchMedia) {
    var mq = matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) { if (!storedTheme()) applyTheme(e.matches ? 'dark' : 'light'); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () { setMenu(!body.classList.contains('menu-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) { setMenu(false); toggle.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (body.classList.contains('menu-open') && !e.target.closest('.site-header')) setMenu(false);
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 1060) setMenu(false); });
  }

  /* ---------- Sticky header shadow + back-to-top ---------- */
  var header = document.querySelector('.site-header');
  var toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.type = 'button';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    var brand = document.querySelector('.brand');
    if (brand) brand.focus({ preventScroll: true });
  });
  body.appendChild(toTop);
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    toTop.classList.toggle('is-visible', y > 700);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Scroll reveal (staggered) ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var selectors = [
      '.section .container > *:not(.grid):not(.gallery):not(.svc-list):not(.filters)',
      '.svc', '.grid > *', '.gallery > *', '.cta-band .container > *', '.stats .stat'
    ];
    var els = document.querySelectorAll(selectors.join(','));
    var vh = window.innerHeight;
    var io = new IntersectionObserver(function (entries) {
      var batch = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);
        el.style.setProperty('--delay', Math.min(batch++, 6) * 60 + 'ms');
        el.classList.add('is-in');
        var done = function (ev) {
          if (ev && ev.target !== el) return;
          el.removeEventListener('transitionend', done);
          el.classList.remove('reveal', 'is-in');
          el.style.removeProperty('--delay');
        };
        el.addEventListener('transitionend', done);
        setTimeout(done, 1200);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(els, function (el) {
      if (el.getBoundingClientRect().top < vh * 0.9) return; // don't hide what's already on screen
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ---------- Gallery filters ---------- */
  var filters = document.querySelectorAll('.filter');
  Array.prototype.forEach.call(filters, function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');
      Array.prototype.forEach.call(filters, function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      Array.prototype.forEach.call(document.querySelectorAll('.g-item'), function (item) {
        var show = cat === 'all' || (item.getAttribute('data-cat') || '').indexOf(cat) > -1;
        item.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var items = document.querySelectorAll('.g-item');
  if (items.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML =
      '<span class="lb-count" aria-live="polite"></span>' +
      '<figure><img alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="><figcaption></figcaption></figure>' +
      '<button class="lb-btn lb-close" type="button" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      '<button class="lb-btn lb-prev" type="button" aria-label="Previous photo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>' +
      '<button class="lb-btn lb-next" type="button" aria-label="Next photo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>';
    body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('figcaption');
    var lbCount = lb.querySelector('.lb-count');
    var list = [], index = 0, opener = null;

    var visibleItems = function () {
      return Array.prototype.filter.call(items, function (i) { return !i.classList.contains('is-hidden'); });
    };
    var show = function (i, swap) {
      index = (i + list.length) % list.length;
      var item = list[index];
      var img = item.querySelector('img');
      var set = function () {
        lbImg.src = item.getAttribute('data-full') || img.src;
        lbImg.alt = img.alt;
        lbCap.textContent = img.alt;
        lbCount.textContent = (index + 1) + ' / ' + list.length;
        lbImg.classList.remove('is-swapping');
      };
      if (swap && !reduceMotion) { lbImg.classList.add('is-swapping'); setTimeout(set, 150); } else set();
    };
    var open = function (item) {
      list = visibleItems();
      opener = item;
      show(list.indexOf(item), false);
      lb.classList.add('is-open');
      body.classList.add('lb-open');
      lb.querySelector('.lb-close').focus();
    };
    var close = function () {
      lb.classList.remove('is-open');
      body.classList.remove('lb-open');
      if (opener) opener.focus();
    };
    Array.prototype.forEach.call(items, function (item) {
      item.addEventListener('click', function () { open(item); });
    });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(index - 1, true); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(index + 1, true); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(index - 1, true);
      else if (e.key === 'ArrowRight') show(index + 1, true);
      else if (e.key === 'Tab') { // keep focus inside the viewer
        var f = lb.querySelectorAll('button');
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    var startX = null;
    lb.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1), true);
      startX = null;
    });
  }

  /* ---------- Enquiry form ---------- */
  // No server on this mockup, so open the visitor's email app with the message filled in.
  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      var lines = [
        f.message.value, '',
        'Name: ' + f.name.value,
        'Email: ' + f.email.value,
        f.phone.value ? 'Phone: ' + f.phone.value : '',
        f.suburb.value ? 'Suburb: ' + f.suburb.value : ''
      ];
      window.location.href = 'mailto:carmel@fencingfinesse.com' +
        '?subject=' + encodeURIComponent('Quote enquiry: ' + f.topic.value) +
        '&body=' + encodeURIComponent(lines.join('\n'));
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
