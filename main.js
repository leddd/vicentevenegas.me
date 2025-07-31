import initScroll from './scroll.js';
import initMenu from './menu.js';

document.addEventListener('DOMContentLoaded', () => {
  const scroll = initScroll();
  if (scroll) {
    initMenu(scroll);
  }
});
