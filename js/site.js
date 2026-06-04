// flowhouse v2 — site interactions
(() => {
  // mobile drawer
  const drawer = document.querySelector('[data-drawer]');
  document.querySelectorAll('[data-drawer-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const open = drawer.dataset.open === 'true';
      drawer.dataset.open = open ? 'false' : 'true';
      document.body.style.overflow = open ? '' : 'hidden';
    });
  });
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    drawer.dataset.open = 'false';
    document.body.style.overflow = '';
  }));

  // scroll reveal with safety fallback
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px 15% 0px', threshold: 0.01 });
    reveals.forEach(el => io.observe(el));
    setTimeout(() => reveals.forEach(el => el.classList.add('is-in')), 2000);
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }

  // schedule filters
  const dayTabs = document.querySelectorAll('[data-day]');
  const rows = document.querySelectorAll('[data-class-row]');
  const formatFilter = document.querySelector('[data-filter="format"]');
  const levelFilter = document.querySelector('[data-filter="level"]');

  function applyFilters() {
    const activeTab = document.querySelector('[data-day][data-active="true"]');
    const day = activeTab ? activeTab.dataset.day : null;
    const fmt = formatFilter ? formatFilter.value : 'all';
    const lvl = levelFilter ? levelFilter.value : 'all';
    rows.forEach(r => {
      const matchDay = !day || r.dataset.day === day;
      const matchFmt = fmt === 'all' || r.dataset.format === fmt;
      const matchLvl = lvl === 'all' || r.dataset.level === lvl;
      r.style.display = (matchDay && matchFmt && matchLvl) ? '' : 'none';
    });
  }
  dayTabs.forEach(t => t.addEventListener('click', () => {
    dayTabs.forEach(x => x.dataset.active = 'false');
    t.dataset.active = 'true';
    applyFilters();
  }));
  formatFilter?.addEventListener('change', applyFilters);
  levelFilter?.addEventListener('change', applyFilters);

  // ── Founding Circle / lead forms → Netlify Forms (AJAX, stay on page) ──
  // Any <form data-fh-form> posts to Netlify and shows an inline success state.
  document.querySelectorAll('form[data-fh-form]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const origLabel = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      try {
        const data = new FormData(form);
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString(),
        });
        const success = form.querySelector('[data-fh-success]');
        const fields = form.querySelector('[data-fh-fields]');
        if (success) success.hidden = false;
        if (fields) fields.hidden = true;
        if (!success) {
          form.innerHTML = '<div class="form-success"><h3 class="h4">You\u2019re on the list.</h3><p class="text-muted">Welcome to the Founding Circle. We\u2019ll be in touch with first access as we get closer to opening.</p></div>';
        }
      } catch (err) {
        if (btn) { btn.disabled = false; btn.textContent = origLabel; }
        const errEl = form.querySelector('[data-fh-error]');
        if (errEl) errEl.hidden = false;
        else alert('Something went wrong. Please email info@flowhouserb.com and we\u2019ll add you directly.');
      }
    });
  });

  // book-bar reveal after first scroll
  const bar = document.querySelector('.book-bar');
  if (bar && !document.body.classList.contains('no-bookbar')) {
    bar.style.transform = 'translateY(100%)';
    bar.style.transition = 'transform .4s cubic-bezier(.16,1,.3,1)';
    let shown = false;
    window.addEventListener('scroll', () => {
      if (!shown && window.scrollY > 240) {
        bar.style.transform = '';
        shown = true;
      }
    }, { passive: true });
  }
})();
