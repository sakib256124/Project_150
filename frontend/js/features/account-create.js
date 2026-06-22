import { apiRequest } from '../api.js';
import { toast } from '../utils.js';

export function bindAccountCreate(form, afterSuccess) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try { const data = await apiRequest('/accounts', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(form))) }); toast(data.message); afterSuccess(); }
    catch (error) { toast(error.message, 'error'); }
  });
}
