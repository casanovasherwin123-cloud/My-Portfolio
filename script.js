
// MOBILE NAVIGATION
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '×' : '☰';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}

// DARK MODE
const themeToggle = document.getElementById('themeToggle');

let savedTheme = null;
try {
  savedTheme = localStorage.getItem('sherwin-portfolio-theme');
} catch (e) {}

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    const currentTheme = document.body.classList.contains('dark')
      ? 'dark'
      : 'light';

    try {
      localStorage.setItem('sherwin-portfolio-theme', currentTheme);
    } catch (e) {}
  });
}

// PROJECT SEARCH AND FILTER
const search = document.getElementById('projectSearch');
const cards = [...document.querySelectorAll('.searchable')];
const filters = [...document.querySelectorAll('.filter')];
const emptyState = document.getElementById('emptyState');

let activeFilter = 'all';

function updateProjects() {
  const query = search ? search.value.trim().toLowerCase() : '';
  let visible = 0;

  cards.forEach(card => {
    const category = card.dataset.category || '';
    const categoryMatch =
      activeFilter === 'all' || category === activeFilter;

    const text = `${card.dataset.search || ''} ${card.innerText}`.toLowerCase();
    const searchMatch = text.includes(query);

    const show = categoryMatch && searchMatch;

    card.hidden = !show;

    if (show) visible++;
  });

  if (emptyState) {
    emptyState.hidden = visible > 0;
  }
}

// FILTER BUTTONS
filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));

    button.classList.add('active');
    activeFilter = button.dataset.filter || 'all';

    updateProjects();
  });
});

// SEARCH INPUT
if (search) {
  search.addEventListener('input', updateProjects);
}

// INITIAL PROJECT DISPLAY
updateProjects();





// SMOOTH SCROLLING
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    document.documentElement.classList.add('smooth-scroll');
  });
});

// BACK NAVIGATION
(function () {
  const isDetailPage = location.pathname.includes('/projects/');

  if (isDetailPage && document.referrer) {
    try {
      const ref = new URL(document.referrer);

      const cameFromMain =
        ref.origin === location.origin &&
        !ref.pathname.includes('/projects/') &&
        /(^|\/)(index\.html)?$/.test(ref.pathname);

      if (cameFromMain && history.length > 1) {
        document.querySelectorAll('a[href*="index.html#projects"]').forEach(link => {
          link.addEventListener('click', event => {
            if (
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.button !== 0
            ) return;

            event.preventDefault();
            history.back();
          });
        });
      }
    } catch (e) {}
  }

  if (!isDetailPage && location.hash) {
    window.addEventListener('load', () => {
      const target = document.getElementById(location.hash.slice(1));

      if (target) {
        target.scrollIntoView({
          behavior: 'instant',
          block: 'start'
        });
      }
    });
  }
})();
