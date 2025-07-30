// script.js
window.addEventListener('DOMContentLoaded', () => {
  // 1) Grab the scroll container and bail if missing
  const container = document.querySelector('[data-scroll-container]');
  if (!container) return;

  // 2) Initialize Locomotive Scroll for smooth scrolling
  const scroll = new LocomotiveScroll({
    el: container,
    smooth: true,
    lerp: 0.08,
    getDirection: true,
  });

  // 3) Cache frequently used elements
  const projectsEl          = document.querySelector('.projects');
  const footer              = document.querySelector('.footer');
  const scrollToProjectsBtn = document.getElementById('scroll-to-projects');
  const scrollDownArrow     = document.getElementById('scroll-down');
  const scrollToFooterBtn   = document.getElementById('scroll-to-footer');

  const SNAP_SETTINGS = {
    duration: 500,
    easing: [0.25, 0, 0.35, 1],
  };

  let isManuallyScrollingToFooter = false;

  // Scroll helpers
  function scrollToProjects(e) {
    e.preventDefault();
    if (!projectsEl || isManuallyScrollingToFooter) return;
    scroll.scrollTo(projectsEl, {
      offset: -20,
      ...SNAP_SETTINGS,
    });
  }

  function scrollToFooter(e) {
    e.preventDefault();
    if (!footer) return;
    isManuallyScrollingToFooter = true;
    scroll.scrollTo(footer, {
      offset: 0,
      ...SNAP_SETTINGS,
      callback: () => {
        setTimeout(() => isManuallyScrollingToFooter = false, 300);
      },
    });
  }

  // Bind button clicks
  scrollToProjectsBtn?.addEventListener('click', scrollToProjects);
  scrollDownArrow?.addEventListener('click', scrollToProjects);
  scrollToFooterBtn?.addEventListener('click', scrollToFooter);

  // Project tile animation class
  document.querySelectorAll('.project-tile').forEach(tile => {
    tile.setAttribute('data-scroll', '');
    tile.setAttribute('data-scroll-class', 'reveal');
  });

  // Keep smooth scroll and reveal animation for project tiles only
});
