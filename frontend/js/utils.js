export const money = (value) => new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 2 }).format(Number(value || 0));
export const dateTime = (value) => new Date(value).toLocaleString('en-BD', { dateStyle: 'medium', timeStyle: 'short' });
export const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);

export function toast(message, type = 'success') {
  const item = document.createElement('div');
  item.className = `toast ${type === 'error' ? 'error' : ''}`;
  item.textContent = message;
  document.getElementById('toast-region').append(item);
  setTimeout(() => item.remove(), 4200);
}

export function heading(eyebrow, title, description = '') { return `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1>${description ? `<p class="subtle">${description}</p>` : ''}</div></div>`; }
export function empty(message) { return `<div class="empty">${message}</div>`; }
