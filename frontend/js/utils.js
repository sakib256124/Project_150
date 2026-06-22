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

export function currentBangladeshTime() {
  return new Intl.DateTimeFormat('en-BD', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Dhaka' }).format(new Date());
}

export function normalizeAccountInput(form) {
  form.querySelectorAll('input[name="accountNumber"], input[name="fromAccount"], input[name="toAccount"]').forEach((input) => {
    input.value = input.value.trim().toUpperCase();
  });
}

export async function submitBankingForm(form, requestPath, confirmation, successMessage) {
  const submitButton = form.querySelector('button[type="submit"], button:not([type])');
  normalizeAccountInput(form);
  const values = Object.fromEntries(new FormData(form));
  if (!window.confirm(confirmation(values))) return null;
  const originalLabel = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Processing…';
  try {
    const { apiRequest } = await import('./api.js');
    const data = await apiRequest(requestPath, { method: 'POST', body: JSON.stringify(values) });
    toast(successMessage(data));
    form.reset();
    return data;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalLabel;
  }
}
