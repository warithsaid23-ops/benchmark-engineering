/* ============================================================
   BENCHMARK ENGINEERING CO. LTD — MAIN JAVASCRIPT
   Version: 1.0
   ============================================================ */

'use strict';

/* ── NAVIGATION ─────────────────────────────────────────────── */
(function initNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (!nav) return;

  // Scroll behaviour: transparent → solid
  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('nav--solid');
      nav.classList.remove('nav--transparent');
    } else {
      nav.classList.remove('nav--solid');
      nav.classList.add('nav--transparent');
    }
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav__mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── HERO IMAGE LOAD ────────────────────────────────────────── */
(function initHero() {
  const heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;
  const img = new Image();
  const src = window.getComputedStyle(heroBg).backgroundImage.replace(/url\(["']?(.*?)["']?\)/i, '$1');
  img.onload = function () { heroBg.classList.add('loaded'); };
  img.src = src;
})();

/* ── SCROLL ANIMATIONS ──────────────────────────────────────── */
(function initScrollAnimations() {
  const targets = document.querySelectorAll('.js-hidden');
  if (!targets.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('js-visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) { observer.observe(el); });
})();

/* ── PROJECT FILTER ─────────────────────────────────────────── */
(function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.filterable-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach(function (card) {
        const categories = card.dataset.categories || '';
        const show = filter === 'all' || categories.includes(filter);
        card.style.opacity = show ? '1' : '0';
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.transform = 'translateY(0)';
        }
      });
    });
  });
})();

/* ── LANGUAGE TOGGLE (EN / SW) ──────────────────────────────── */
const translations = {
  en: {
    'nav-home':      'Home',
    'nav-about':     'About',
    'nav-services':  'Services',
    'nav-projects':  'Projects',
    'nav-contact':   'Contact',
    'nav-portal':    'Staff Portal',
    'hero-title':    "Building Zanzibar's Future",
    'hero-sub':      "East Africa's most disciplined construction delivery — Zanzibar, Pemba Island and Tanzania mainland since 2011",
    'stat-years':    'Years Established',
    'stat-projects': 'Projects Delivered',
    'stat-class':    'Registered Class',
    'stat-islands':  'Islands Operating',
    'services-label':'Our Disciplines',
    'services-title':'What We Build',
    'projects-label':'Portfolio Highlights',
    'projects-title':'Our Work Speaks',
    'why-label':     'The Benchmark Difference',
    'why-title':     'Why clients trust us to deliver',
    'enquiry-title': 'Start Your Project Conversation',
    'enquiry-sub':   'Tell us about your project and we\'ll respond within one business day.',
    'btn-projects':  'View Our Projects',
    'btn-quote':     'Request a Quote',
    'btn-digital':   'See How It Works',
    'whatsapp-cta':  'WhatsApp Us Directly →',
    'footer-motto':  'Building the future of Zanzibar — one disciplined project at a time.',
  },
  sw: {
    'nav-home':      'Nyumbani',
    'nav-about':     'Kuhusu Sisi',
    'nav-services':  'Huduma',
    'nav-projects':  'Miradi',
    'nav-contact':   'Wasiliana',
    'nav-portal':    'Lango la Wafanyakazi',
    'hero-title':    'Kujenga Mustakabali wa Zanzibar',
    'hero-sub':      'Ujenzi wa kisasa wenye nidhamu zaidi Afrika Mashariki — Zanzibar, Pemba na Tanzania Bara tangu 2011',
    'stat-years':    'Miaka ya Uzoefu',
    'stat-projects': 'Miradi Iliyokamilika',
    'stat-class':    'Daraja la Usajili',
    'stat-islands':  'Visiwa vya Uendeshaji',
    'services-label':'Taaluma Zetu',
    'services-title':'Tunalojenga',
    'projects-label':'Maamuzi ya Miradi',
    'projects-title':'Kazi Yetu Inasema',
    'why-label':     'Tofauti ya Benchmark',
    'why-title':     'Kwa nini wateja wanaamini',
    'enquiry-title': 'Anza Mazungumzo ya Mradi Wako',
    'enquiry-sub':   'Tuambie kuhusu mradi wako nasi tutajibu ndani ya siku moja ya biashara.',
    'btn-projects':  'Tazama Miradi Yetu',
    'btn-quote':     'Omba Bei',
    'btn-digital':   'Ona Jinsi Inavyofanya Kazi',
    'whatsapp-cta':  'Wasiliana Nasi WhatsApp →',
    'footer-motto':  'Kujenga mustakabali wa Zanzibar — mradi mmoja kwa wakati mmoja.',
  }
};

let currentLang = 'en';

function applyLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    const key = el.dataset.i18n;
    if (t[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });
  // Update toggle UI
  document.querySelectorAll('.lang-toggle .lang-en').forEach(function (el) {
    el.classList.toggle('active', lang === 'en');
  });
  document.querySelectorAll('.lang-toggle .lang-sw').forEach(function (el) {
    el.classList.toggle('active', lang === 'sw');
  });
  document.documentElement.lang = lang === 'sw' ? 'sw' : 'en';
  localStorage.setItem('benchmark-lang', lang);
}

(function initLangToggle() {
  const toggles = document.querySelectorAll('.lang-toggle');
  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      applyLanguage(currentLang === 'en' ? 'sw' : 'en');
    });
  });
  const saved = localStorage.getItem('benchmark-lang');
  if (saved && saved !== 'en') applyLanguage(saved);
})();

/* ── COUNTER ANIMATION ──────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat__num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      let current = 0;
      const increment = Math.ceil(target / 48);
      const timer = setInterval(function () {
        current = Math.min(current + increment, target);
        el.textContent = prefix + current + suffix;
        if (current >= target) clearInterval(timer);
      }, 30);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (c) { observer.observe(c); });
})();

/* ── CONTACT / ENQUIRY FORM ─────────────────────────────────── */
(function initForms() {
  document.querySelectorAll('.js-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate submission (replace with real endpoint / Formspree / Netlify Forms)
      setTimeout(function () {
        const msg = document.createElement('div');
        msg.style.cssText = 'background:#C9A84C;color:#0B1F3A;padding:16px 24px;border-radius:3px;font-weight:600;margin-top:16px;font-size:15px;';
        msg.textContent = 'Thank you — we\'ll be in touch within one business day.';
        form.appendChild(msg);
        form.reset();
        btn.textContent = originalText;
        btn.disabled = false;
        setTimeout(function () { msg.remove(); }, 6000);
      }, 1200);
    });
  });
})();

/* ── SMOOTH REVEAL ON LOAD ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('loaded');
});
