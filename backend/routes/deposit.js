import { sendError, sendJson } from '../lib/http.js';
import { accountForPin, addTransaction, isAccountFrozen, readDatabase, saveDatabase } from '../lib/store.js';
import { positiveAmount } from '../lib/validation.js';

export function handleDeposit(req, res, url, body) {
  if (req.method !== 'POST' || url.pathname !== '/api/transactions/deposit') return false;
  const database = readDatabase(); const account = accountForPin(database, body.accountNumber, body.pin); const amount = positiveAmount(body.amount);
  if (!account) sendError(res, 'Account number or PIN is incorrect.', 401);
  else if (isAccountFrozen(account)) sendError(res, 'This account is frozen. Contact the bank administrator.');
  else if (!amount) sendError(res, 'Enter a valid amount.');
  else { account.balance += amount; addTransaction(database, { type: 'Deposit', accountNumber: account.accountNumber, amount, note: String(body.note || 'Cash deposit').trim() }); saveDatabase(database); sendJson(res, 200, { success: true, message: 'Deposit completed.', balance: account.balance }); }
  return true;
}
