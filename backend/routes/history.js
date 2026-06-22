import { sendJson } from '../lib/http.js';
import { readDatabase } from '../lib/store.js';

export function handleHistory(req, res, url) {
  if (req.method !== 'GET' || url.pathname !== '/api/transactions') return false;
  const accountNumber = String(url.searchParams.get('accountNumber') || '').trim();
  const transactions = readDatabase().transactions.filter((item) => !accountNumber || item.accountNumber === accountNumber || item.relatedAccount === accountNumber).reverse();
  sendJson(res, 200, { success: true, transactions });
  return true;
}
