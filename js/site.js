// flowhouse v2 — site interactions
(() => {
  // active nav highlight (for pages using the shared header partial)
  try {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const map = {
      'index.html': 'home', '': 'home',
      'about.html': 'about', 'studio.html': 'studio', 'flowformer.html': 'flowformer',
      'what-to-expect.html': 'what-to-expect', 'schedule.html': 'schedule',
      'memberships.html': 'memberships', 'membership.html': 'memberships',
      'merch.html': 'merch', 'teach.html': 'teach', 'account.html': 'account',
      'franchising.html': 'franchising',
    };
    const cur = map[path];
    if (cur) {
      const link = document.querySelector(`.nav-links a[data-nav="${cur}"]`);
      if (link && !link.hasAttribute('aria-current')) link.setAttribute('aria-current', 'page');
    }
  } catch (e) {}

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

  // ── Founding Circle / lead forms → Formspree (AJAX, stay on page) ──
  // Any <form data-fh-form> posts to its own `action` (a Formspree endpoint)
  // and shows an inline success state. Works on static hosting (GitHub Pages).
  document.querySelectorAll('form[data-fh-form]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const origLabel = btn ? btn.textContent : '';
      const errEl = form.querySelector('[data-fh-error]');
      if (errEl) errEl.hidden = true;
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      const showError = () => {
        if (btn) { btn.disabled = false; btn.textContent = origLabel; }
        if (errEl) errEl.hidden = false;
        else alert('Something went wrong. Please email info@flowhouserb.com and we\u2019ll add you directly.');
      };

      const endpoint = form.getAttribute('action');
      // Guard: if the form hasn't been connected to Formspree yet, fail loudly
      // (to the console) rather than silently pretending it sent.
      if (!endpoint || endpoint.indexOf('formspree.io') === -1) {
        console.error('Form is not connected to Formspree yet (no valid action endpoint).');
        showError();
        return;
      }

      try {
        const data = new FormData(form);
        const res = await fetch(endpoint, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error('Submission failed: ' + res.status);
        // Redirect to the thank-you page on success.
        window.location.href = '/thanks.html';
        return;
      } catch (err) {
        showError();
      }
    });
  });

  // ── Choose Your Class: expandable “Learn more” on cards ──
  document.querySelectorAll('.class-card__learn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.class-card');
      const more = card && card.querySelector('.class-card__more');
      if (!more) return;
      const open = !more.hidden;
      more.hidden = open;
      btn.setAttribute('aria-expanded', String(!open));
      btn.firstChild.textContent = open ? 'Learn more ' : 'Show less ';
    });
  });

  // ── Exercise Library: filters + accessible modal ──
  const exGrid = document.querySelector('[data-ex-grid]');
  if (exGrid && Array.isArray(window.FH_EXERCISES)) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = window.FH_EXERCISES;
    const emptyEl = document.querySelector('[data-ex-empty]');

    // build cards
    const esc = (s) => String(s == null ? '' : s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    exGrid.innerHTML = cards.map((ex, i) => `
      <button class="ex-card" type="button" data-ex-card data-index="${i}" data-cats="${esc(ex.categories.join(' '))}" aria-haspopup="dialog">
        <span class="ex-card__media">
          <img src="${esc(ex.image)}" alt="${esc(ex.alt)}" loading="lazy" decoding="async">
          <span class="ex-card__cat">${esc(ex.categoryLabel)}</span>
          <span class="ex-card__demo">Demo film soon</span>
        </span>
        <span class="ex-card__body">
          <span class="ex-card__name">${esc(ex.name)}</span>
          <span class="ex-card__focus">${esc(ex.focus)}</span>
          <span class="ex-card__meta"><span>${esc(ex.level)}</span><span class="ex-card__view">View</span></span>
        </span>
      </button>`).join('');

    // filters
    const chips = document.querySelectorAll('[data-ex-chip]');
    function applyExFilter(cat) {
      let shown = 0;
      exGrid.querySelectorAll('[data-ex-card]').forEach((c) => {
        const match = cat === 'all' || c.dataset.cats.split(' ').includes(cat);
        c.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });
      if (emptyEl) emptyEl.hidden = shown !== 0;
    }
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        applyExFilter(chip.dataset.exChip);
      });
    });

    // modal
    const modal = document.querySelector('[data-ex-modal]');
    const dialog = modal ? modal.querySelector('.ex-modal__dialog') : null;
    const mediaEl = modal ? modal.querySelector('[data-ex-media]') : null;
    const bodyEl = modal ? modal.querySelector('[data-ex-detail]') : null;
    let lastFocused = null;

    function field(label, value) {
      if (!value) return '';
      return `<div class="ex-detail"><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`;
    }
    function steps(label, arr) {
      if (!arr || !arr.length) return '';
      return `<div class="ex-detail"><dt>${esc(label)}</dt><ol>${arr.map(s => `<li>${esc(s)}</li>`).join('')}</ol></div>`;
    }

    function openModal(ex) {
      if (!modal) return;
      lastFocused = document.activeElement;
      mediaEl.innerHTML = `<img src="${esc(ex.image)}" alt="${esc(ex.alt)}">` +
        `<p class="ex-modal__demo-note">Demonstration film coming soon. ${esc(ex.videoDescription || ex.alt)}</p>`;
      bodyEl.innerHTML = `
        <p class="ex-modal__cat">${esc(ex.categoryLabel)}</p>
        <h2 class="ex-modal__title" id="exModalTitle">${esc(ex.name)}</h2>
        <div class="ex-modal__tags">
          <span class="ex-tag">${esc(ex.level)}</span>
          <span class="ex-tag">${esc(ex.muscles)}</span>
          <span class="ex-tag">${esc(ex.springs)}</span>
        </div>
        ${field('Starting position', ex.setup)}
        ${field('FlowFormer setup', ex.formerSetup)}
        ${field('Spring guidance', ex.springs)}
        ${steps('The movement', ex.movement)}
        ${field('Breath', ex.breath)}
        ${field('Primary muscles', ex.muscles)}
        ${field('Common form notes', ex.mistakes)}
        ${field('Modification', ex.modification)}
        ${field('Progression', ex.progression)}
        ${field('Where it appears', ex.sequence)}
      `;
      modal.hidden = false;
      document.body.classList.add('ex-modal-open');
      const closeBtn = modal.querySelector('.ex-modal__close');
      if (closeBtn) closeBtn.focus();
    }
    function closeModal() {
      if (!modal) return;
      modal.hidden = true;
      document.body.classList.remove('ex-modal-open');
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    exGrid.addEventListener('click', (e) => {
      const card = e.target.closest('[data-ex-card]');
      if (!card) return;
      openModal(cards[+card.dataset.index]);
    });
    if (modal) {
      modal.querySelector('.ex-modal__backdrop').addEventListener('click', closeModal);
      modal.querySelector('.ex-modal__close').addEventListener('click', closeModal);
      document.addEventListener('keydown', (e) => {
        if (modal.hidden) return;
        if (e.key === 'Escape') { closeModal(); return; }
        if (e.key === 'Tab') {
          const f = dialog.querySelectorAll('button, a[href], input, [tabindex]:not([tabindex="-1"])');
          if (!f.length) return;
          const first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
    }
  }

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
