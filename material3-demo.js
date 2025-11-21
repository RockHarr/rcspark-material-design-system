// assets/js/material3-demo.js

// ================================
// TOGGLE TEMA LIGHT/DARK
// ================================
(function () {
  const html = document.documentElement;
  const toggleBtn = document.getElementById('themeToggleBtn');

  if (!toggleBtn) return;

  function updateButtonLabel() {
    const isDark = html.getAttribute('data-bs-theme') === 'dark';
    toggleBtn.textContent = isDark ? 'Light mode' : 'Dark mode';
  }

  toggleBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-bs-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-bs-theme', newTheme);
    updateButtonLabel();
  });

  updateButtonLabel();
})();


// ================================
// RIPPLE MATERIAL 3
// ================================
(function () {
  const RIPPLE_CLASS = 'm3-ripple__wave';

  function createRipple(event) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement('span');
    ripple.classList.add(RIPPLE_CLASS);
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';

    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    if (getComputedStyle(target).position === 'static') {
      target.style.position = 'relative';
    }
    target.style.overflow = 'hidden';

    target.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }

  function initRipples() {
    const elements = document.querySelectorAll('.m3-ripple');
    elements.forEach(el => {
      el.removeEventListener('pointerdown', createRipple);
      el.addEventListener('pointerdown', createRipple);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRipples);
  } else {
    initRipples();
  }
})();
