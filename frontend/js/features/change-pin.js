import { apiRequest } from '../api.js';
import { toast } from '../utils.js';

export function bindPinChange(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form));
    if (values.newPin !== values.confirmPin) return toast('New PIN and confirmation PIN do not match.', 'error');
    delete values.confirmPin;
    try { const data = await apiRequest('/accounts/change-pin', { method: 'POST', body: JSON.stringify(values) }); toast(data.message); form.reset(); }
    catch (error) { toast(error.message, 'error'); }
  });
}
