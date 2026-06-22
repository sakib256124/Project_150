import { apiRequest } from '../api.js';
import { toast } from '../utils.js';

export async function updateAccountStatus(accountNumber, status, afterSuccess) {
  const action = status === 'Frozen' ? 'freeze' : 'activate';
  if (!confirm(`Are you sure you want to ${action} ${accountNumber}?`)) return;
  try { const data = await apiRequest(`/accounts/${encodeURIComponent(accountNumber)}/status`, { method: 'POST', body: JSON.stringify({ status }) }); toast(data.message); afterSuccess(); }
  catch (error) { toast(error.message, 'error'); }
}
