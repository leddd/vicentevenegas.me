window.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.getElementById('mobile-menu');
  const openMenuBtn = document.getElementById('open-menu');
  const htmlEl = document.documentElement;

  openMenuBtn?.addEventListener('click', e => {
    e.preventDefault();
    mobileMenu?.classList.toggle('open');
    openMenuBtn.classList.toggle('open');
    htmlEl.classList.toggle('no-scroll');
  });

  function closeMenu() {
    if (!mobileMenu?.classList.contains('open')) return;
    mobileMenu.classList.remove('open');
    openMenuBtn.classList.remove('open');
    htmlEl.classList.remove('no-scroll');
  }

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  document.querySelectorAll('.navbar a:not(#open-menu)').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});
