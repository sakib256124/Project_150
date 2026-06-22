import { sendError, sendJson } from '../lib/http.js';
import { accountForPin, addTransaction, isAccountFrozen, readDatabase, saveDatabase } from '../lib/store.js';
import { positiveAmount } from '../lib/validation.js';

export function handleWithdraw(req, res, url, body) {
  if (req.method !== 'POST' || url.pathname !== '/api/transactions/withdraw') return false;
  const database = readDatabase(); const account = accountForPin(database, body.accountNumber, body.pin); const amount = positiveAmount(body.amount);
  if (!account) sendError(res, 'Account number or PIN is incorrect.', 401);
  else if (isAccountFrozen(account)) sendError(res, 'This account is frozen. Contact the bank administrator.');
  else if (!amount) sendError(res, 'Enter a valid amount.');
  else if (account.balance < amount) sendError(res, 'Insufficient account balance.');
  else { account.balance -= amount; addTransaction(database, { type: 'Withdrawal', accountNumber: account.accountNumber, amount, note: String(body.note || 'Cash withdrawal').trim() }); saveDatabase(database); sendJson(res, 200, { success: true, message: 'Withdrawal completed.', balance: account.balance }); }
  return true;
}
