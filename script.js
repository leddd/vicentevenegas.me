window.addEventListener('DOMContentLoaded', () => {
  const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp: 0.08,
    getDirection: true,
  });

  // Scroll to projects section when clicking on "vicente venegas*"
  const scrollToProjectsBtn = document.getElementById('scroll-to-projects');
  scrollToProjectsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    scroll.scrollTo(document.querySelector('.projects'), {
      offset: -20, // Adjust for navbar height if needed
      duration: 1000,
      easing: [0.25, 0.0, 0.35, 1.0],
    });
  });

  // Ensure .project-tile elements have the correct attributes
  const projectTiles = document.querySelectorAll('.project-tile');
  projectTiles.forEach((tile) => {
    tile.setAttribute('data-scroll', '');
    tile.setAttribute('data-scroll-class', 'reveal');
  });

  // Animate hero SVGs
  const svgContainers = document.querySelectorAll('.hero .svg-container');
  svgContainers.forEach((el) => {
    el.style.opacity = '1';
    void el.offsetWidth;
    el.classList.add('animate-in');
  });

  // Wipe reveal effect
  const wipeTargets = document.querySelectorAll('.hero .svg-container.text, .hero .svg-container.hand, .hero .svg-container.pc');
  wipeTargets.forEach((container) => {
    if (!container.querySelector('.wipe-reveal')) {
      const wipe = document.createElement('div');
      wipe.className = 'wipe-reveal';
      if (container.classList.contains('pc')) wipe.classList.add('right-to-left');
      container.appendChild(wipe);
    }
    container.classList.remove('revealed');
  });
  wipeTargets.forEach((container, i) => {
    setTimeout(() => container.classList.add('revealed'), 200 + i * 150);
  });

  // Contact SVG animation
  const contactSVG = document.querySelector('.hero .svg-container.contact');
  if (contactSVG) {
    contactSVG.style.opacity = '0';
    contactSVG.style.transform = 'translateY(40px) rotate(0deg)';

    setTimeout(() => {
      contactSVG.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
      contactSVG.style.opacity = '1';
      contactSVG.style.transform = 'translateY(0) rotate(0deg)';

      let rotation = 0;
      setInterval(() => {
        rotation += 1;
        contactSVG.style.transform = `translateY(0) rotate(${rotation}deg)`;
      }, 150);
    }, 750);
  }

  // Fade in/out arrow on scroll
  const downArrow = document.querySelector('.hero .svg-container.down');
  if (downArrow) {
    downArrow.style.opacity = '0';
    downArrow.style.transition = 'opacity 1s ease-out';

    setTimeout(() => {
      downArrow.style.opacity = '1';
    }, 1000);

    scroll.on('scroll', (obj) => {
      const scrollY = obj.scroll.y;
      const viewportHeight = window.innerHeight;
      const opacity = Math.max(0, 1 - scrollY / (viewportHeight / 2));
      downArrow.style.opacity = opacity;
    });
  }

  // Smooth scroll snap to .projects when scrolling slightly
  let hasSnapped = false;
  scroll.on('scroll', (obj) => {
    const scrollY = obj.scroll.y;

    if (scrollY > 80 && !hasSnapped) {
      hasSnapped = true;
      scroll.scrollTo(document.querySelector('.projects'), {
        offset: -20,
        duration: 800,
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    }

    if (scrollY < 60) {
      hasSnapped = false;
    }
  });

  const cursor = document.getElementById('custom-cursor');
  const heroSVGs = document.querySelectorAll('.hero .svg-container');

  // Move the cursor with the mouse
  window.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  // Show/hide cursor on hover over .svg-container
  heroSVGs.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });
  });

  
});
