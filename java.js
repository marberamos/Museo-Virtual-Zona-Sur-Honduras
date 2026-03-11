
  // Custom cursor
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a, button, .turismo-card, .fauna-tag, .species-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      ring.style.width = '56px';
      ring.style.height = '56px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      ring.style.width = '36px';
      ring.style.height = '36px';
    });
  });

  // Falling leaves
  const leavesContainer = document.getElementById('leavesContainer');
  function createLeaf() {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.top = '-20px';
    const dur = 8 + Math.random() * 10;
    leaf.style.animationDuration = dur + 's';
    leaf.style.animationDelay = Math.random() * 5 + 's';
    leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
    leaf.style.width = (6 + Math.random() * 8) + 'px';
    leaf.style.height = (15 + Math.random() * 14) + 'px';
    const hue = 120 + Math.random() * 40;
    leaf.style.background = `hsl(${hue}, 55%, ${30 + Math.random() * 25}%)`;
    leavesContainer.appendChild(leaf);
    setTimeout(() => leaf.remove(), dur * 1000 + 5000);
  }

  setInterval(createLeaf, 600);
  for (let i = 0; i < 8; i++) setTimeout(createLeaf, i * 400);

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));

  // Stagger reveals in grids
  document.querySelectorAll('.turismo-grid .turismo-card, .protegidas-grid .protegida-card, .fauna-categories .fauna-category').forEach((el, i) => {
    el.style.transitionDelay = (i * 80) + 'ms';
  });


// Lightbox
  const lightbox       = document.getElementById('lightbox');
  const lightboxImg    = document.getElementById('lightboxImg');
  const lightboxCap    = document.getElementById('lightboxCaption');
  const lightboxClose  = document.getElementById('lightboxClose');

  document.querySelectorAll('.galeria-img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxCap.textContent = img.alt;
      lightbox.classList.add('active');
    });
  });

  lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lightbox.classList.remove('active');
  });

  // mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
