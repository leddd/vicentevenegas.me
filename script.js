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
  const cursor              = document.getElementById('custom-cursor');
  const heroSVGs            = document.querySelectorAll('.hero .svg-container');
  const footerDownArrow     = document.getElementById('footer-down');
  const talkFooter          = document.querySelector('.contact-block .talk-footer');
  const contactText         = document.querySelector('.contact-block .footer-contact-text');
  const handFooter          = document.querySelector('.contact-block .hand-footer');

  const SNAP_SETTINGS = {
    duration: 500,
    easing: [0.25, 0, 0.35, 1],
  };

  let isManuallyScrollingToFooter = false;

  function layoutContact() {
    if (!talkFooter || !contactText || !handFooter) return;
    const width = contactText.offsetWidth;
    talkFooter.style.width = `${width}px`;
    const height = contactText.offsetHeight;
    handFooter.style.position = 'absolute';
    handFooter.style.left = `${width}px`;
    handFooter.style.top = `${height}px`;
  }

  layoutContact();
  window.addEventListener('resize', layoutContact);

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

  // Wipe reveal animation for hero SVGs
  document.querySelectorAll('.hero .svg-container.text, .hero .svg-container.hand, .hero .svg-container.pc').forEach((container, i) => {
    if (!container.querySelector('.wipe-reveal')) {
      const wipe = document.createElement('div');
      wipe.className = 'wipe-reveal';
      if (container.classList.contains('pc')) wipe.classList.add('right-to-left');
      container.appendChild(wipe);

      // Remove the wipe element after the animation is complete
      setTimeout(() => {
        wipe.remove(); // Remove the wipe element from the DOM
      }, 1200); // Match the duration of the wipe animation (e.g., 1.2s)
    }
    container.classList.remove('revealed');
    setTimeout(() => container.classList.add('revealed'), 200 + i * 150);
  });

  // Contact SVG animation
  const contactSVG = document.querySelector('.hero .svg-container.contact');
  if (contactSVG) {
    contactSVG.style.opacity = '0';
    contactSVG.style.transform = 'translateY(40px)';
    setTimeout(() => {
      contactSVG.style.transition = 'opacity 1s, transform 1s';
      contactSVG.style.opacity = '1';
      contactSVG.style.transform = 'translateY(0)';
      let rot = 0;
      setInterval(() => {
        rot++;
        contactSVG.style.transform = `translateY(0) rotate(${rot}deg)`;
      }, 150);
    }, 750);
  }

  // Fade in and out down arrow based on scroll position
  scroll.on('scroll', ({ scroll: { y } }) => {
    const vh = window.innerHeight;
    const fY = footer?.offsetTop ?? Infinity;
    const fH = footer?.offsetHeight ?? 0;

    // Update hero arrow opacity
    if (scrollDownArrow) {
      scrollDownArrow.style.opacity = Math.max(0, 1 - y / (vh / 2));
    }

    // Toggle dark mode based on footer visibility
    if (footer) {
      const bottom = y + vh;
      document.body.classList.toggle('dark', bottom >= fY + fH * 0.4);
    }

    // Fade in footer arrow
    if (footerDownArrow) {
      const bottom = y + vh;
      const fadeThreshold = fY + vh * 0.1;
      footerDownArrow.style.opacity = bottom >= fadeThreshold ? '1' : '0';
    }
  });

  // Initial fade in for hero arrow
  if (scrollDownArrow) {
    scrollDownArrow.style.opacity = '0';
    scrollDownArrow.style.transition = 'opacity 0.3s ease-out';
    setTimeout(() => (scrollDownArrow.style.opacity = '1'), 1000);
  }

  // Custom cursor
  window.addEventListener('mousemove', e => {
    cursor?.style.setProperty('transform', `translate(${e.clientX}px, ${e.clientY}px)`);
  });
  heroSVGs.forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
    el.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  });

  // Mobile menu toggle
  const mobileMenu = document.getElementById('mobile-menu');
  const openMenuBtn = document.getElementById('open-menu');
  const htmlEl = document.documentElement;
  openMenuBtn?.addEventListener('click', e => {
    e.preventDefault();
    const isOpen = mobileMenu?.classList.toggle('open');
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

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  document.querySelectorAll('.navbar a:not(#open-menu)').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});
