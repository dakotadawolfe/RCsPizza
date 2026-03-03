/**
 * RC's NYC Pizza & Pasta - Global site script
 */
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  var MEDIA_MOBILE = '(max-width: 767px)';

  if (!toggle || !nav) return;

  function setToggleVisibility() {
    toggle.style.display = window.matchMedia(MEDIA_MOBILE).matches ? 'flex' : 'none';
    if (!window.matchMedia(MEDIA_MOBILE).matches) {
      nav.classList.remove('nav--open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  function openMenu() {
    nav.classList.add('nav--open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    nav.classList.remove('nav--open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    if (nav.classList.contains('nav--open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  toggle.addEventListener('click', function () {
    toggleMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      closeMenu();
      toggle.focus();
    }
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.matchMedia(MEDIA_MOBILE).matches) {
        closeMenu();
      }
    });
  });

  window.matchMedia(MEDIA_MOBILE).addEventListener('change', setToggleVisibility);
  setToggleVisibility();
})();
