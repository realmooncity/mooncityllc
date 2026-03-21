// ===== THEME TOGGLE =====
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

const getInitialTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

html.setAttribute('data-theme', getInitialTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// ===== MOBILE MENU =====
const toggle = document.getElementById('mobile-menu');
const menu   = document.getElementById('navbar__menu');

function closeMenu() {
  toggle.classList.remove('active');
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}

toggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  toggle.classList.toggle('active');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

toggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggle.click();
  }
});

// Close menu when a nav link is clicked
menu.querySelectorAll('.navbar__links').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!toggle.contains(e.target) && !menu.contains(e.target)) {
    closeMenu();
  }
});


// ===== NAVBAR SCROLL SHADOW =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('navbar--scrolled', window.scrollY > 20);
}, { passive: true });


// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar__links');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('navbar__links--active'));
      const active = document.querySelector(`.navbar__links[href="#${entry.target.id}"]`);
      if (active) active.classList.add('navbar__links--active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));


// ===== CONTACT FORM =====
const form   = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in all fields.';
      status.className = 'form__status form__status--error';
      return;
    }

    // Simulate send (wire up to a real backend or Formspree when ready)
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sendingâ€¦';

    setTimeout(() => {
      status.textContent = `Thanks, ${name}! I'll be in touch soon.`;
      status.className = 'form__status form__status--success';
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }, 1000);
  });
}


// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  '.project-card, .stat, .tech-card, .about__text, .contact__form'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});