/* =============================================
   LA NUIT D'APRÈS — Interactions
   ============================================= */

(function () {
  'use strict';

  // --- Intersection Observer: fade-in on scroll ---
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything
    fadeEls.forEach((el) => el.classList.add('is-visible'));
  }

  // --- Gallery scroll indicators ---
  const track = document.querySelector('.gallery__track');
  const indicatorContainer = document.querySelector('.gallery__indicators');

  if (track && indicatorContainer) {
    const items = track.querySelectorAll('.gallery__item');

    // Create dots
    items.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('gallery__dot');
      if (i === 0) dot.classList.add('is-active');
      dot.setAttribute('aria-label', 'Photo ' + (i + 1));
      dot.addEventListener('click', () => {
        items[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
      indicatorContainer.appendChild(dot);
    });

    const dots = indicatorContainer.querySelectorAll('.gallery__dot');

    // Update active dot on scroll
    const galleryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(items).indexOf(entry.target);
            dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
          }
        });
      },
      { root: track, threshold: 0.6 }
    );

    items.forEach((item) => galleryObserver.observe(item));
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
