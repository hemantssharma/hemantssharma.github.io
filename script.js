(() => {
  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', e => {
    if (glow) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      entry.target.dataset.done = '1';
      const target = Number(entry.target.dataset.count);
      let start = 0;
      const duration = 900;
      const startTime = performance.now();
      const tick = now => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        entry.target.textContent = Math.round(start + (target - start) * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
})();
