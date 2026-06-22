import { apiRequest } from '../api.js';
import { toast } from '../utils.js';

export async function getAccountForEdit(accountNumber) { return (await apiRequest(`/accounts/${encodeURIComponent(accountNumber)}`)).account; }
export function bindAccountUpdate(form, accountNumber, afterSuccess) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); const payload = Object.fromEntries(new FormData(form)); if (!payload.pin) delete payload.pin;
    try { const data = await apiRequest(`/accounts/${encodeURIComponent(accountNumber)}`, { method: 'PUT', body: JSON.stringify(payload) }); toast(data.message); afterSuccess(); }
    catch (error) { toast(error.message, 'error'); }
  });
}
