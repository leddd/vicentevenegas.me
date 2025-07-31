window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('project');
  if (!slug) return;

  fetch('projects.json')
    .then(r => r.json())
    .then(projects => {
      const project = projects.find(p => p.slug === slug);
      if (!project) return;

      const titleEl = document.getElementById('project-title');
      if (titleEl) titleEl.textContent = project.title;

      const tagsEl = document.getElementById('project-tags');
      if (tagsEl) {
        tagsEl.innerHTML = '';
        (project.tags || []).forEach(tag => {
          const span = document.createElement('span');
          span.className = 'tag';
          span.textContent = tag;
          tagsEl.appendChild(span);
        });
      }

      const desc1 = document.getElementById('project-description-1');
      const desc2 = document.getElementById('project-description-2');
      if (desc1 && project.description && project.description[0]) {
        desc1.innerHTML = `<p>${project.description[0]}</p>`;
      }
      if (desc2 && project.description && project.description[1]) {
        desc2.innerHTML = `<p>${project.description[1]}</p>`;
      }

      const mainImg = document.getElementById('project-main-img');
      if (mainImg) {
        mainImg.src = project.mainImage;
        mainImg.alt = project.title;
      }

      const sub1 = document.getElementById('project-sub-img-1');
      const sub2 = document.getElementById('project-sub-img-2');
      if (sub1 && project.subImages && project.subImages[0]) {
        sub1.src = project.subImages[0];
        sub1.alt = project.title;
      }
      if (sub2 && project.subImages && project.subImages[1]) {
        sub2.src = project.subImages[1];
        sub2.alt = project.title;
      }

      const nextContainer = document.getElementById('next-projects');
      if (nextContainer) {
        const others = projects.filter(p => p.slug !== slug).slice(0, 3);
        others.forEach(p => {
          const a = document.createElement('a');
          a.href = `project.html?project=${p.slug}`;
          a.className = 'project-tile';
          a.setAttribute('data-scroll', '');
          a.setAttribute('data-scroll-class', 'reveal');
          a.innerHTML = `\n            <img src="${p.mainImage}" alt="${p.title}">\n            <div class="tile-overlay"></div>\n            <div class="pill"><span>${p.title}</span></div>`;
          nextContainer.appendChild(a);
        });
      }

      const nextLink = document.getElementById('next-project-link');
      if (nextLink) {
        const next = projects.find(p => p.slug !== slug);
        if (next) nextLink.href = `project.html?project=${next.slug}`;
      }
    });
});
