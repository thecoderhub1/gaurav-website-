/* ============================================================
   GAURAV SINGH — PORTFOLIO SCRIPTS
   ============================================================ */

/* ── Nav scroll effect ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

/* ── Hamburger / Mobile Menu ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

/* ── Scroll Reveal ── */
const revealElements = document.querySelectorAll(
  '.about-card, .skill-badge, .project-card, .preview-card, .contact-form, .social-badge, .section-title, .section-label'
);

revealElements.forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger siblings in the same grid
  const siblings = el.parentElement.children;
  const idx = Array.from(siblings).indexOf(el);
  if (idx === 1) el.classList.add('reveal-delay-1');
  if (idx === 2) el.classList.add('reveal-delay-2');
  if (idx === 3) el.classList.add('reveal-delay-3');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--forest)';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── Contact Form ── */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const success = document.getElementById('formSuccess');

  // Loading state
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✅ Sent!';
    btn.style.opacity = '1';
    success.style.display = 'block';
    document.getElementById('contactForm').reset();

    setTimeout(() => {
      btn.textContent = 'Send Message 🚀';
      btn.disabled = false;
      success.style.display = 'none';
    }, 5000);
  }, 1500);
}

/* ── Cursor sparkle effect on hero ── */
const hero = document.querySelector('.hero');
hero.addEventListener('mousemove', (e) => {
  const spark = document.createElement('div');
  spark.style.cssText = `
    position: fixed;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--accent);
    left: ${e.clientX - 2.5}px;
    top: ${e.clientY - 2.5}px;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.7;
    transition: all 0.6s ease;
  `;
  document.body.appendChild(spark);
  requestAnimationFrame(() => {
    spark.style.transform = `translate(${(Math.random()-0.5)*40}px, ${(Math.random()-0.5)*40}px) scale(0)`;
    spark.style.opacity = '0';
  });
  setTimeout(() => spark.remove(), 700);
});

/* ── Smooth active page scrolling ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

console.log('%c🌿 Hey! Built by Gaurav Singh — AI-Native Dev', 'color: #4A9E42; font-size: 14px; font-weight: bold;');
