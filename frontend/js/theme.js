const storageKey = 'bankly-theme';

export function getTheme() {
  const savedTheme = localStorage.getItem(storageKey);
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme = getTheme()) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(storageKey, theme);
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    const isDark = theme === 'dark';
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    button.querySelector('[data-theme-label]').textContent = isDark ? 'Light mode' : 'Dark mode';
    button.querySelector('[data-theme-icon]').textContent = isDark ? '☀' : '◐';
  });
}

export function bindThemeToggle() {
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => applyTheme(getTheme() === 'dark' ? 'light' : 'dark'));
  });
  applyTheme();
}
