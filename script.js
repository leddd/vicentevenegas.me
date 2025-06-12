// Animate SVGs on load with staggered fade-in and move-up
window.addEventListener('DOMContentLoaded', () => {
  const svgContainers = document.querySelectorAll('.hero .svg-container');

  svgContainers.forEach((el, i) => {
    el.style.opacity = '1';
    void el.offsetWidth;
    el.classList.add('animate-in');
  });

  wipeRevealHeroSVGs();
  animateContactSVG();
  fadeInDownArrow();
});

// Wipe reveal for text and hand SVGs
function wipeRevealHeroSVGs() {
  const wipeTargets = document.querySelectorAll('.hero .svg-container.text, .hero .svg-container.hand, .hero .svg-container.pc');

  wipeTargets.forEach((container, i) => {
    if (!container.querySelector('.wipe-reveal')) {
      const wipe = document.createElement('div');
      wipe.className = 'wipe-reveal';
      if (container.classList.contains('pc')) {
        wipe.classList.add('right-to-left');
      }
      container.appendChild(wipe);
    }
    container.classList.remove('revealed');
  });

  wipeTargets.forEach((container, i) => {
    setTimeout(() => {
      container.classList.add('revealed');
    }, 200 + i * 150);
  });
}

// Animate contact SVG
function animateContactSVG() {
  const contactSVG = document.querySelector('.hero .svg-container.contact');
  if (!contactSVG) return;

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

// Fade in down arrow after contact SVG
function fadeInDownArrow() {
  const downArrow = document.querySelector('.hero .svg-container.down');
  if (!downArrow) return;

  downArrow.style.opacity = '0';
  downArrow.style.transition = 'opacity 1s ease-out';

  // Delay after contact animation (750 + 500ms)
  setTimeout(() => {
    downArrow.style.opacity = '1';
  }, 1000);

  // Fade out on scroll
  window.addEventListener('scroll', () => {
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    const opacity = Math.max(0, 1 - (scrollPosition / (viewportHeight / 2)));
    downArrow.style.opacity = opacity;
  });
}
