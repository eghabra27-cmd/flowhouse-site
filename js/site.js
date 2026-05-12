// flowhouse — site interactions
(() => {
  // theme toggle (light = warm sand, dark = warm charcoal)
  // persistence via cookie so it survives navigation across pages within this session
  const root = document.documentElement;
  const readCookie = (name) => {
    const match = document.cookie.split('; ').find(r => r.startsWith(name + '='));
    return match ? decodeURIComponent(match.split('=')[1]) : null;
  };
  const writeCookie = (name, val) => {
    document.cookie = `${name}=${encodeURIComponent(val)}; path=/; max-age=31536000; SameSite=Lax`;
  };
  const storedTheme = readCookie('fh-theme');
  if (storedTheme) root.dataset.theme = storedTheme;
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      writeCookie('fh-theme', next);
    });
  });

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

  // scroll reveal — with safety fallback
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px 20% 0px', threshold: 0.01 });
    reveals.forEach(el => io.observe(el));
    // safety fallback: reveal anything not yet shown after 2s (handles full-page screenshot tools)
    setTimeout(() => reveals.forEach(el => el.classList.add('is-in')), 2000);
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }

  // schedule day tabs + filter (schedule page)
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

  // book-bar reveal after first scroll
  const bar = document.querySelector('.book-bar');
  if (bar) {
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
