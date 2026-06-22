import { apiRequest } from '../api.js';
import { money, toast } from '../utils.js';

export function bindWithdraw(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try { const data = await apiRequest('/transactions/withdraw', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(form))) }); toast(`${data.message} New balance: ${money(data.balance)}`); form.reset(); }
    catch (error) { toast(error.message, 'error'); }
  });
}
