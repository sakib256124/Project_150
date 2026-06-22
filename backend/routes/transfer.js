import { sendError, sendJson } from '../lib/http.js';
import { accountForPin, addTransaction, isAccountFrozen, readDatabase, saveDatabase } from '../lib/store.js';
import { accountNumber, positiveAmount } from '../lib/validation.js';

export function handleTransfer(req, res, url, body) {
  if (req.method !== 'POST' || url.pathname !== '/api/transactions/transfer') return false;
  const database = readDatabase(); const amount = positiveAmount(body.amount); const sender = accountForPin(database, body.fromAccount, body.pin); const receiver = database.accounts.find((account) => account.accountNumber === accountNumber(body.toAccount));
  if (!sender) sendError(res, 'Sender account number or PIN is incorrect.', 401);
  else if (isAccountFrozen(sender)) sendError(res, 'Sender account is frozen.');
  else if (!receiver) sendError(res, 'Receiver account was not found.');
  else if (isAccountFrozen(receiver)) sendError(res, 'Receiver account is frozen.');
  else if (sender.accountNumber === receiver.accountNumber) sendError(res, 'Choose a different receiver account.');
  else if (!amount) sendError(res, 'Enter a valid amount.');
  else if (sender.balance < amount) sendError(res, 'Insufficient account balance.');
  else { sender.balance -= amount; receiver.balance += amount; const note = String(body.note || 'Account transfer').trim(); addTransaction(database, { type: 'Transfer sent', accountNumber: sender.accountNumber, relatedAccount: receiver.accountNumber, amount, note }); addTransaction(database, { type: 'Transfer received', accountNumber: receiver.accountNumber, relatedAccount: sender.accountNumber, amount, note }); saveDatabase(database); sendJson(res, 200, { success: true, message: 'Transfer completed.', balance: sender.balance }); }
  return true;
}
