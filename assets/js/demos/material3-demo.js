// Demo: prototipo Material-ish para comparar estilos.
// Nota: esto NO es la capa final del Design System (Sass).


// ================================
// TOGGLE TEMA LIGHT/DARK
// ================================
(function () {
  const html = document.documentElement;
  const toggleBtn = document.getElementById('themeToggleBtn');

  if (!toggleBtn) return;

  // Ensure the toggle is announced as a button and has aria state
  if (!toggleBtn.hasAttribute('role')) toggleBtn.setAttribute('role', 'button');

  function updateButtonLabel() {
    const isDark = html.getAttribute('data-bs-theme') === 'dark';
    // Show current state in a short localized form and expose pressed state
    toggleBtn.textContent = isDark ? 'Tema: oscuro' : 'Tema: claro';
    toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }


  toggleBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-bs-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-bs-theme', newTheme);
    updateButtonLabel();
  });

  // keyboard support (Enter / Space) for non-native buttons
  toggleBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleBtn.click();
    }
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

    // Support both pointer and keyboard activation. For keyboard events
    // center the ripple in the element.
    const isPointer = typeof event.clientX === 'number' && typeof event.clientY === 'number';
    const clientX = isPointer ? event.clientX : rect.left + rect.width / 2;
    const clientY = isPointer ? event.clientY : rect.top + rect.height / 2;

    const x = clientX - rect.left - size / 2;
    const y = clientY - rect.top - size / 2;

    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    // Prefer adding a helper class so we don't permanently mutate inline styles
    target.classList.add('m3-ripple--container');

    target.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
      // If no more ripples left, we can remove the container helper class
      if (!target.querySelector('.' + RIPPLE_CLASS)) {
        target.classList.remove('m3-ripple--container');
      }
    });
  }

  function initRipples() {
    const elements = document.querySelectorAll('.m3-ripple');
    elements.forEach(el => {
      el.removeEventListener('pointerdown', createRipple);
      el.addEventListener('pointerdown', createRipple);

      // keyboard activation for accessibility (Enter / Space)
      const keyHandler = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          createRipple(e);
        }
      };
      el.removeEventListener('keydown', keyHandler);
      el.addEventListener('keydown', keyHandler);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRipples);
  } else {
    initRipples();
  }
})();


// ================================
// PILLS / CHIPS TOGGLABLES
// ================================
(function () {
  function togglePill(event) {
    const pill = event.currentTarget;
    const isSelected = pill.classList.toggle('is-selected');
    pill.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
  }

  function initPills() {
    const pills = document.querySelectorAll('.m3-pill');

    pills.forEach(pill => {
      if (!pill.hasAttribute('role')) {
        pill.setAttribute('role', 'button');
      }

      if (!pill.hasAttribute('aria-pressed')) {
        const isSelected = pill.classList.contains('is-selected');
        pill.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      }

      pill.removeEventListener('click', togglePill);
      pill.addEventListener('click', togglePill);
      // keyboard support (Enter / Space)
      const keyHandler = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          togglePill({ currentTarget: pill });
        }
      };
      pill.removeEventListener('keydown', keyHandler);
      pill.addEventListener('keydown', keyHandler);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPills);
  } else {
    initPills();
  }
})();
