/* ============================================================
   KERALA SHAREEATH ACADEMY — HERO SLIDESHOW
   Rotates background slides every 5s with a CSS fade.
   Uses only the desktop/tablet slideshow layer; mobile relies
   on the static .hero-static background set purely in CSS.
   ============================================================ */
(function () {
  'use strict';

  var SLIDE_INTERVAL = 5000; // 5 seconds
  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
  if (!slides.length) return;

  var current = 0;
  var timerId = null;

  function goToNextSlide() {
    var next = (current + 1) % slides.length;
    slides[current].classList.remove('is-active');
    slides[next].classList.add('is-active');
    current = next;
  }

  function startSlideshow() {
    if (timerId) return; // already running
    timerId = window.setInterval(goToNextSlide, SLIDE_INTERVAL);
  }

  function stopSlideshow() {
    if (!timerId) return;
    window.clearInterval(timerId);
    timerId = null;
  }

  // Pause rotation when the tab is not visible to save resources,
  // resume automatically when the user comes back.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  });

  // Respect users who prefer reduced motion: still show an image,
  // just skip the automatic rotation.
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    startSlideshow();
  }
})();

/* Footer year */
(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* Simple nav toggle for mobile */
(function () {
  var toggles = document.querySelectorAll('.nav-toggle');
  var navs = document.querySelectorAll('.site-nav');
  if (!toggles.length) return;

  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      navs.forEach(function (nav) {
        nav.classList.toggle('show');
      });
    });
  });
})();

/* Basic page transition on link click for nicer movement */
(function () {
  var anchors = document.querySelectorAll('a[href]');
  anchors.forEach(function (a) {
    // internal links only
    var href = a.getAttribute('href');
    if (!href || href.indexOf('http') === 0 || href.indexOf('#') === 0) return;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      document.documentElement.classList.add('page-exit-active');
      setTimeout(function () { window.location = href; }, 280);
    });
  });
})();