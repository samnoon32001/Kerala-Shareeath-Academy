/* ============================================================
   KERALA SHAREEATH ACADEMY — MAIN JAVASCRIPT
   ============================================================ */


/* ============================================================
   HERO SLIDESHOW
   Rotates background slides every 5 seconds
   ============================================================ */

(function () {

  'use strict';

  var SLIDE_INTERVAL = 5000;

  var slides = Array.prototype.slice.call(
    document.querySelectorAll('.hero-slide')
  );

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

    if (timerId) return;

    timerId = window.setInterval(
      goToNextSlide,
      SLIDE_INTERVAL
    );

  }


  function stopSlideshow() {

    if (!timerId) return;

    window.clearInterval(timerId);

    timerId = null;

  }


  document.addEventListener(
    'visibilitychange',
    function () {

      if (document.hidden) {

        stopSlideshow();

      } else {

        startSlideshow();

      }

    }
  );


  var prefersReducedMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;


  if (!prefersReducedMotion) {

    startSlideshow();

  }

})();



/* ============================================================
   FOOTER YEAR
   Automatically updates the copyright year
   ============================================================ */

(function () {

  var yearEl = document.getElementById('year');

  if (yearEl) {

    yearEl.textContent =
      new Date().getFullYear();

  }

})();



/* ============================================================
   RESPONSIVE NAVBAR
   Mobile / Tablet navigation toggle
   ============================================================ */

(function () {

  var toggles =
    document.querySelectorAll('.nav-toggle');

  var navs =
    document.querySelectorAll('.site-nav');


  if (!toggles.length) return;


  toggles.forEach(function (btn) {

    btn.addEventListener(
      'click',
      function () {

        var expanded =
          btn.getAttribute('aria-expanded') === 'true';


        btn.setAttribute(
          'aria-expanded',
          String(!expanded)
        );


        navs.forEach(function (nav) {

          nav.classList.toggle('show');

        });

      }
    );

  });

})();



/* ============================================================
   PAGE TRANSITION
   Smooth transition between pages
   ============================================================ */

(function () {

  var anchors =
    document.querySelectorAll('a[href]');


  anchors.forEach(function (a) {

    var href =
      a.getAttribute('href');


    /*
     * Ignore:
     * - empty links
     * - external links
     * - same-page anchors
     * - downloads
     */

    if (
      !href ||
      href.indexOf('http') === 0 ||
      href.indexOf('#') === 0 ||
      a.hasAttribute('download')
    ) {

      return;

    }


    a.addEventListener(
      'click',
      function (e) {

        /*
         * Don't interfere with
         * Ctrl / Shift / Cmd clicks
         */

        if (
          e.ctrlKey ||
          e.shiftKey ||
          e.metaKey ||
          e.altKey
        ) {

          return;

        }


        e.preventDefault();


        document.documentElement.classList.add(
          'page-exit-active'
        );


        setTimeout(
          function () {

            window.location.href = href;

          },
          280
        );

      }
    );

  });

})();



/* ============================================================
   INSTITUTION MORPH EXPANSION
   ============================================================ */

document.addEventListener(
  'DOMContentLoaded',
  function () {


    var container =
      document.querySelector('.institution-cards');


    if (!container) return;


    var cards =
      container.querySelectorAll(
        '.institution-card'
      );


    /* ========================================================
       OPEN / CLOSE INSTITUTION
       ======================================================== */

    cards.forEach(function (card) {


      var knowMore =
        card.querySelector(
          '.institution-btn'
        );


      var closeBtn =
        card.querySelector(
          '.institution-close'
        );


      /* ======================================================
         KNOW MORE
         ====================================================== */

      if (knowMore) {

        knowMore.addEventListener(
          'click',
          function (event) {

            event.preventDefault();


            /*
             * Close other cards
             */

            cards.forEach(
              function (otherCard) {

                otherCard.classList.remove(
                  'is-expanded'
                );

              }
            );


            /*
             * Open selected card
             */

            card.classList.add(
              'is-expanded'
            );


            /*
             * Tell CSS that a card
             * is currently expanded
             */

            container.classList.add(
              'is-expanded'
            );


            /*
             * Prevent unwanted
             * page scrolling
             */

            document.body.classList.add(
              'institution-open'
            );


            /*
             * Start statistics animation
             */

            startInstitutionCounters(card);

          }
        );

      }


      /* ======================================================
         BACK BUTTON
         ====================================================== */

      if (closeBtn) {

        closeBtn.addEventListener(
          'click',
          function () {

            card.classList.remove(
              'is-expanded'
            );


            container.classList.remove(
              'is-expanded'
            );


            document.body.classList.remove(
              'institution-open'
            );


            /*
             * Reset counters so they animate
             * again the next time the card opens.
             */

            resetInstitutionCounters(card);

          }
        );

      }

    });



    /* ========================================================
       ESC KEY
       ======================================================== */

    document.addEventListener(
      'keydown',
      function (event) {

        if (event.key !== 'Escape') return;


        cards.forEach(
          function (card) {

            card.classList.remove(
              'is-expanded'
            );

            resetInstitutionCounters(card);

          }
        );


        container.classList.remove(
          'is-expanded'
        );


        document.body.classList.remove(
          'institution-open'
        );

      }
    );


  }
);



/* ============================================================
   INSTITUTION STATISTICS
   Animated number counter
   ============================================================ */


/*
 * This function animates a single number.
 *
 * Example:
 *
 * data-target="60"
 *
 * will animate:
 *
 * 0 → 1 → 2 → 3 → ... → 60
 */

function animateInstitutionCounter(element) {

  if (!element) return;


  var target =
    Number(element.dataset.target);


  if (!target || target < 0) return;


  /*
   * Prevent multiple animations
   * from running at the same time.
   */

  if (element.dataset.animating === 'true') {
    return;
  }


  element.dataset.animating = 'true';


  /*
   * Animation duration
   *
   * 2200ms = 2.2 seconds
   */

  var duration = 2200;


  var startTime =
    performance.now();


  function updateCounter(currentTime) {

    var elapsed =
      currentTime - startTime;


    var progress =
      Math.min(
        elapsed / duration,
        1
      );


    /*
     * Ease-out effect.
     *
     * Starts quickly and slows down
     * naturally near the final number.
     */

    var eased =
      1 - Math.pow(
        1 - progress,
        3
      );


    var currentValue =
      Math.floor(
        target * eased
      );


    element.textContent =
      currentValue;


    if (progress < 1) {

      requestAnimationFrame(
        updateCounter
      );

    } else {

      element.textContent =
        target;

      element.dataset.animating =
        'false';

    }

  }


  requestAnimationFrame(
    updateCounter
  );

}



/* ============================================================
   START ALL COUNTERS INSIDE AN INSTITUTION
   ============================================================ */

function startInstitutionCounters(card) {

  if (!card) return;


  var counters =
    card.querySelectorAll(
      '.stat-number'
    );


  if (!counters.length) return;


  /*
   * Give the morph transition time
   * to start before showing numbers.
   */

  setTimeout(
    function () {

      counters.forEach(
        function (counter) {

          /*
           * Start from zero
           */

          counter.textContent =
            '0';


          /*
           * Small stagger effect.
           *
           * First number:
           * 300ms
           *
           * Second:
           * 450ms
           *
           * Third:
           * 600ms
           */

          var index =
            Array.prototype.indexOf.call(
              counters,
              counter
            );


          var delay =
            300 + (index * 150);


          setTimeout(
            function () {

              animateInstitutionCounter(
                counter
              );

            },
            delay
          );

        }
      );

    },
    450
  );

}



/* ============================================================
   RESET COUNTERS
   ============================================================ */

function resetInstitutionCounters(card) {

  if (!card) return;


  var counters =
    card.querySelectorAll(
      '.stat-number'
    );


  counters.forEach(
    function (counter) {

      counter.textContent =
        '0';


      counter.dataset.animating =
        'false';

    }
  );

}



/* ============================================================
   INSTITUTION STATISTICS — SAFETY INITIALIZATION
   ============================================================ */

/*
 * If a card already contains statistics,
 * make sure the displayed number is initially 0.
 *
 * This prevents the target number from appearing
 * before the user clicks "Know More".
 */

document.addEventListener(
  'DOMContentLoaded',
  function () {

    var counters =
      document.querySelectorAll(
        '.institution-card .stat-number'
      );


    counters.forEach(
      function (counter) {

        counter.textContent =
          '0';

        counter.dataset.animating =
          'false';

      }
    );

  }
);