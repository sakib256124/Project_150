import { apiRequest } from '../api.js';
import { toast } from '../utils.js';

export async function deleteAccount(accountNumber, afterSuccess) {
  if (!confirm(`Delete ${accountNumber}? This cannot be undone.`)) return;
  try { const data = await apiRequest(`/accounts/${encodeURIComponent(accountNumber)}`, { method: 'DELETE' }); toast(data.message); afterSuccess(); }
  catch (error) { toast(error.message, 'error'); }
}
