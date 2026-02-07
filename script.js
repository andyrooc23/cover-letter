// Dynamic year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-toggle-icon');
const storedTheme = window.localStorage.getItem('theme');

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
  }
  window.localStorage.setItem('theme', theme);
}

const initialTheme = storedTheme === 'light' || storedTheme === 'dark'
  ? storedTheme
  : (document.body.getAttribute('data-theme') || 'dark');
setTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    const current = document.body.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// Simple mobile nav toggle
const hamburger = document.getElementById('hamburger');
const header = document.querySelector('header');

if (hamburger && header) {
  hamburger.addEventListener('click', function () {
    const isOpen = header.classList.toggle('mobile-nav-open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// Smooth scroll & active nav link
const navLinks = Array.from(document.querySelectorAll('[data-nav]'));

function onScroll() {
  const scrollPos = window.scrollY + 100;
  let activeLink = null;
  for (const link of navLinks) {
    const sectionId = link.getAttribute('href');
    const section = document.querySelector(sectionId);
    if (!section) continue;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      activeLink = link;
      break;
    }
  }

  navLinks.forEach(link => link.classList.remove('active'));
  navLinks.forEach(link => link.removeAttribute('aria-current'));
  if (activeLink) {
    activeLink.classList.add('active');
    activeLink.setAttribute('aria-current', 'page');
  } else if (navLinks.length) {
    navLinks[0].classList.add('active');
    navLinks[0].setAttribute('aria-current', 'page');
  }
}

if (navLinks.length) {
  window.addEventListener('scroll', onScroll);
  onScroll();
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (header && header.classList.contains('mobile-nav-open')) {
      header.classList.remove('mobile-nav-open');
      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && header && header.classList.contains('mobile-nav-open')) {
    header.classList.remove('mobile-nav-open');
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }
});

const scrollButtons = document.querySelectorAll('[data-scroll-target]');
scrollButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-scroll-target');
    const section = document.querySelector(target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const printButton = document.querySelector('[data-action="print"]');
if (printButton) {
  printButton.addEventListener('click', () => window.print());
}

const placeholderLinks = document.querySelectorAll('[data-placeholder-link]');
placeholderLinks.forEach(link => {
  link.setAttribute('aria-disabled', 'true');
  link.addEventListener('click', event => event.preventDefault());
});

// Demo contact form
function handleSubmit(event) {
  event.preventDefault();
  const formStatus = document.getElementById('form-status');
  if (formStatus) {
    formStatus.innerHTML = '<div class="status-dot"></div><span>Thanks! This demo form does not send data, but this is where your submission logic would go.</span>';
  }
  return false;
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', handleSubmit);
}
