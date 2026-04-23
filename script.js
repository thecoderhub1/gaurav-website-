/* =============================================
   GAURAV SINGH — Portfolio Scripts
   Mobile-first, performance-conscious
   ============================================= */

(function () {
  'use strict';

  /* ---- NAV: scroll class + mobile toggle ---- */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkEls = navLinks.querySelectorAll('.nav-link');

  // Scroll state
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastY = y;
  }, { passive: true });

  // Hamburger toggle
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on link tap
  navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside tap (mobile UX)
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll(
    '.service-col, .work-item, .process-step, .pitch-item, ' +
    '.hero-content, .hero-visual, .pull-quote, ' +
    '.contact-title, .contact-sub, .contact-links'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  // Add reveal class then observe
  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings inside same parent
    const siblings = el.parentElement.querySelectorAll('.reveal');
    if (siblings.length > 1) {
      const idx = Array.from(siblings).indexOf(el);
      el.style.transitionDelay = `${idx * 0.1}s`;
    }
    revealObserver.observe(el);
  });

  /* ---- HERO: immediate reveal (above fold) ---- */
  const heroContent = document.querySelector('.hero-content');
  const heroVisual = document.querySelector('.hero-visual');
  if (heroContent) {
    setTimeout(() => { heroContent.classList.add('reveal', 'visible'); }, 80);
  }
  if (heroVisual) {
    setTimeout(() => { heroVisual.classList.add('reveal', 'visible'); }, 200);
  }

  /* ---- STATS: count-up animation ---- */
  const statValues = document.querySelectorAll('.stat-value');

  const countUp = (el) => {
    const target = parseInt(el.textContent, 10);
    if (isNaN(target)) return;
    let current = 0;
    const step = Math.ceil(target / 24);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(interval);
    }, 40);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statValues.forEach(countUp);
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsContainer = document.querySelector('.hero-stats');
  if (statsContainer) statsObserver.observe(statsContainer);

  /* ---- ACTIVE NAV LINK: highlight on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => {
          const href = link.getAttribute('href').slice(1);
          link.style.color = href === entry.target.id
            ? 'var(--parchment)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ---- SMOOTH ANCHOR OFFSET (for fixed nav) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navH = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---- TOUCH: prevent double-tap zoom on buttons ---- */
  document.querySelectorAll('.btn-book, .nav-toggle, .work-link').forEach(el => {
    el.addEventListener('touchend', (e) => {
      e.preventDefault();
      el.click();
    }, { passive: false });
  });

})();