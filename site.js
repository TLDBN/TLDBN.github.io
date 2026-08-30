(() => {
  const navLinks = [...document.querySelectorAll('nav a[data-section]')];
  const sections = navLinks
    .map(link => document.getElementById(link.dataset.section))
    .filter(Boolean);
  const backToTop = document.querySelector('.back-to-top');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const setActive = id => {
    navLinks.forEach(link => {
      const active = link.dataset.section === id;
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      const target = document.getElementById(link.dataset.section);
      if (!target) return;
      event.preventDefault();
      if (prefersReducedMotion.matches) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, .2, .5] });
    sections.forEach(section => observer.observe(section));
  }

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    if (prefersReducedMotion.matches) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
})();
