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
}

document.querySelectorAll('[data-language-link]').forEach((link) => {
  const target = new URL(link.href);
  target.hash = window.location.hash;
  link.href = target.href;
});
