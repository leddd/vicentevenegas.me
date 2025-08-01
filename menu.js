export default function initMenu(scroll) {
  const mobileMenu = document.getElementById('mobile-menu');
  const openMenuBtn = document.getElementById('open-menu');
  const htmlEl = document.documentElement;

  if (!mobileMenu || !openMenuBtn || !scroll) return;

  openMenuBtn.addEventListener('click', e => {
    e.preventDefault();
    const isOpen = mobileMenu.classList.toggle('open');
    openMenuBtn.classList.toggle('open');
    if (isOpen) {
      scroll.stop();
      htmlEl.classList.add('no-scroll');
    } else {
      scroll.start();
      htmlEl.classList.remove('no-scroll');
    }
  });

  function closeMenu() {
    if (!mobileMenu.classList.contains('open')) return;
    mobileMenu.classList.remove('open');
    openMenuBtn.classList.remove('open');
    scroll.start();
    htmlEl.classList.remove('no-scroll');
  }

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  document.querySelectorAll('.navbar a:not(#open-menu)').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}
