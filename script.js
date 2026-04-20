// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (event) {
    const isClickInsideNav = nav.contains(event.target);
    const isClickOnToggle = navToggle.contains(event.target);

    if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
      navToggle.classList.remove('active');
      nav.classList.remove('active');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 72;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header background on scroll
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
      header.style.borderBottomColor = 'rgba(39, 39, 42, 0.5)';
    } else {
      header.style.boxShadow = 'none';
      header.style.borderBottomColor = 'rgba(31, 31, 35, 1)';
    }

    lastScroll = currentScroll;
  });

  // Animate elements on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  const animatedElements = document.querySelectorAll(
    '.principle-card, .service-card, .process-step, .pricing-card, .portfolio-card, .tech-item'
  );

  animatedElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Add visible class styles
  const style = document.createElement('style');
  style.textContent = `
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Stagger animation for grid items
  const grids = document.querySelectorAll('.principles-grid, .services-grid, .pricing-grid, .portfolio-grid, .tech-grid');

  grids.forEach(function (grid) {
    const items = grid.children;
    Array.from(items).forEach(function (item, index) {
      item.style.transitionDelay = (index * 0.1) + 's';
    });
  });
});
