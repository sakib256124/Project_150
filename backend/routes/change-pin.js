import { sendError, sendJson } from '../lib/http.js';
import { accountForPin, readDatabase, saveDatabase } from '../lib/store.js';

export function handleChangePin(req, res, url, body) {
  if (req.method !== 'POST' || url.pathname !== '/api/accounts/change-pin') return false;
  const database = readDatabase(); const account = accountForPin(database, body.accountNumber, body.currentPin); const newPin = String(body.newPin || '');
  if (!account) sendError(res, 'Account number or current PIN is incorrect.', 401);
  else if (!/^\d{4}$/.test(newPin)) sendError(res, 'New PIN must contain exactly 4 digits.');
  else if (account.pin === newPin) sendError(res, 'New PIN must be different from the current PIN.');
  else { account.pin = newPin; saveDatabase(database); sendJson(res, 200, { success: true, message: 'PIN changed successfully.' }); }
  return true;
}
