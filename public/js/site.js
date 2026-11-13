/* Maximy site behaviour: rotating hero pictures + mobile menu.
   External file on purpose: the CSP only allows script-src 'self'. */
(function () {
  'use strict';

  /* ---- Hero: crossfade through the pictures. Copy and buttons never change. ---- */
  var hero = document.querySelector('[data-hero]');
  if (hero) {
    var slides = Array.prototype.slice.call(hero.querySelectorAll('.slide'));
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var INTERVAL = 6500;
    var current = 0;
    var timer = null;

    var show = function (i) {
      slides[current].classList.remove('is-active');
      current = i;
      slides[current].classList.add('is-active');
    };
    var next = function () { show((current + 1) % slides.length); };
    var stop = function () { if (timer) { clearInterval(timer); timer = null; } };
    var start = function () { if (!timer && slides.length > 1 && !reduce) { timer = setInterval(next, INTERVAL); } };

    if (slides.length > 1 && !reduce) {
      // wait until every picture has loaded so a fade never shows a blank frame
      var pending = slides.length;
      var ready = function () { if (--pending === 0) { start(); } };
      slides.forEach(function (s) {
        var img = s.querySelector('img');
        if (!img || img.complete) { ready(); } else {
          img.addEventListener('load', ready, { once: true });
          img.addEventListener('error', ready, { once: true });
        }
      });
      // pause when the tab is hidden so the cycle stays in step
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) { stop(); } else { start(); }
      });
    }
  }

  /* ---- Mobile navigation: hamburger + full-width panel ---- */
  var btn = document.getElementById('mobNavBtn');
  var panel = document.getElementById('mobNavPanel');
  if (btn && panel) {
    var setOpen = function (open) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      panel.classList.toggle('is-open', open);
    };
    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) { setOpen(false); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setOpen(false); btn.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) { setOpen(false); }
    });
  }
})();
