/* Private Events page — smooth scroll + inquiry form (Formspree, async, no redirect).
   Uses the same Formspree endpoint and Accept: application/json submission as the site's other forms,
   but shows an inline confirmation instead of redirecting to /thanks.html. */
(function () {
  'use strict';

  // Smooth scroll for "Make it a private affair"
  document.querySelectorAll('[data-pe-scroll]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', a.getAttribute('href'));
    });
  });

  var form = document.querySelector('form[data-pe-form]');
  if (!form) return;

  var fields = form.querySelector('[data-pe-fields]');
  var success = form.querySelector('[data-pe-success]');
  var errorEl = form.querySelector('[data-pe-error]');
  var btn = form.querySelector('[data-pe-submit]');
  var label = form.querySelector('[data-pe-label]');
  var origLabel = label ? label.innerHTML : '';
  var dateEl = form.querySelector('[data-pe-date]');
  var guestsEl = form.querySelector('[data-pe-guests]');
  var classEl = form.querySelector('[data-pe-class]');
  var hintEl = form.querySelector('[data-pe-hint]');
  var defaultHint = hintEl ? hintEl.textContent : '';
  var sending = false;

  // No past dates
  if (dateEl) {
    var t = new Date();
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    dateEl.min = t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate());
  }

  // Capacity guidance: Reformer up to 10, Barre up to 15
  function updateHint() {
    if (!hintEl || !guestsEl) return;
    var n = parseInt(guestsEl.value, 10);
    var c = classEl ? classEl.value : '';
    var msg = defaultHint, warn = false;
    if (c === 'Reformer') {
      msg = 'Reformer private events host up to 10 guests.';
      if (n > 10) { msg = 'Reformer hosts up to 10 guests — Barre hosts up to 15. Share your plans below and we\u2019ll help.'; warn = true; }
    } else if (c === 'Barre') {
      msg = 'Barre private events host up to 15 guests.';
      if (n > 15) { msg = 'Barre hosts up to 15 guests. Share your plans below and we\u2019ll help.'; warn = true; }
    } else if (n > 15) {
      msg = 'Our largest private class (Barre) hosts up to 15 guests. Share your plans below and we\u2019ll help.'; warn = true;
    }
    hintEl.textContent = msg;
    hintEl.classList.toggle('is-warn', warn);
  }
  if (guestsEl) guestsEl.addEventListener('input', updateHint);
  if (classEl) classEl.addEventListener('change', updateHint);

  // Inline validation styling
  form.querySelectorAll('input, select, textarea').forEach(function (el) {
    el.addEventListener('blur', function () { if (el.value) el.classList.toggle('is-invalid', !el.checkValidity()); });
    el.addEventListener('input', function () { if (el.classList.contains('is-invalid') && el.checkValidity()) el.classList.remove('is-invalid'); });
  });

  function setLoading(on) {
    sending = on;
    if (!btn) return;
    btn.disabled = on;
    btn.setAttribute('aria-busy', on ? 'true' : 'false');
    btn.classList.toggle('is-loading', on);
    if (label) label.innerHTML = on ? 'Sending\u2026' : origLabel;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (sending) return;                       // prevent duplicate submissions
    if (errorEl) errorEl.hidden = true;

    if (!form.checkValidity()) {
      var firstBad = null;
      form.querySelectorAll('input, select, textarea').forEach(function (el) {
        var bad = !el.checkValidity();
        el.classList.toggle('is-invalid', bad);
        if (bad && !firstBad) firstBad = el;
      });
      if (firstBad) { firstBad.focus(); if (firstBad.reportValidity) firstBad.reportValidity(); }
      return;
    }

    var endpoint = form.getAttribute('action');
    if (!endpoint || endpoint.indexOf('formspree.io') === -1) {
      if (errorEl) errorEl.hidden = false;
      return;
    }

    setLoading(true);
    try {
      var res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      var data = null;
      try { data = await res.json(); } catch (_) {}
      if (!res.ok || (data && data.ok === false)) throw new Error('Formspree error ' + res.status);

      // Success only after Formspree confirms
      if (fields) fields.hidden = true;
      if (success) { success.hidden = false; success.focus({ preventScroll: true }); }
      var wrap = form.closest('.pe-form__wrap') || form;
      wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
      form.reset();
      sending = true;                          // keep locked after success
    } catch (err) {
      setLoading(false);                       // re-enable; entered values are untouched
      if (errorEl) errorEl.hidden = false;
    }
  });
})();
