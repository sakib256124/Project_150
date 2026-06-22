import { sendError, sendJson } from '../lib/http.js';
import { readDatabase, saveDatabase } from '../lib/store.js';
import { publicAccount } from '../lib/validation.js';

export function handleAccountStatus(req, res, url, body) {
  const match = url.pathname.match(/^\/api\/accounts\/([^/]+)\/status$/);
  if (req.method !== 'POST' || !match) return false;
  const status = String(body.status || '');
  if (!['Active', 'Frozen'].includes(status)) { sendError(res, 'Status must be Active or Frozen.'); return true; }
  const database = readDatabase(); const account = database.accounts.find((item) => item.accountNumber === decodeURIComponent(match[1]));
  if (!account) { sendError(res, 'Account not found.', 404); return true; }
  account.status = status; saveDatabase(database);
  sendJson(res, 200, { success: true, message: `Account is now ${status.toLowerCase()}.`, account: publicAccount(account) });
  return true;
}
