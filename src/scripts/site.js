import { inject } from '@vercel/analytics';

// Initialize Vercel Web Analytics
inject();

const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-navigation]');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navigation.dataset.open = String(!open);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.dataset.open === 'true') {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.dataset.open = 'false';
      menuButton.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (
      navigation.dataset.open === 'true' &&
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.dataset.open = 'false';
    }
  });
}

/* Language dropdown: close on outside click */
const langDropdown = document.querySelector('.lang-dropdown');
if (langDropdown) {
  document.addEventListener('click', (event) => {
    if (!langDropdown.contains(event.target)) {
      langDropdown.removeAttribute('open');
    }
  });
}

/* Scroll reveal animation (IntersectionObserver) */
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = document.querySelectorAll('.reveal-on-scroll');
if (revealElements.length > 0 && 'IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add('revealed'));
}

/* Show more books button */
const showMoreBtn = document.querySelector('[data-show-more]');
if (showMoreBtn) {
  showMoreBtn.addEventListener('click', () => {
    const hiddenBooks = document.querySelectorAll('[data-book-hidden]');
    let firstRevealedBook = null;
    hiddenBooks.forEach((book, idx) => {
      book.style.display = '';
      book.removeAttribute('data-book-hidden');
      if (!firstRevealedBook && (book.tagName === 'A' || book.querySelector('a'))) {
        firstRevealedBook = book.tagName === 'A' ? book : book.querySelector('a');
      }
      setTimeout(() => book.classList.add('revealed'), idx * 100);
    });
    const wrap = document.querySelector('[data-show-more-wrap]');
    if (wrap) wrap.remove();
    if (firstRevealedBook) {
      firstRevealedBook.focus();
    }
  });
}
