import { sendJson } from '../lib/http.js';
import { readDatabase } from '../lib/store.js';
import { publicAccount } from '../lib/validation.js';

export function handleReports(req, res, url) {
  if (req.method !== 'GET' || url.pathname !== '/api/reports/summary') return false;
  const database = readDatabase(); const transactions = database.transactions;
  const sum = (items) => items.reduce((total, item) => total + Number(item.amount), 0);
  const byType = Object.fromEntries(['Deposit', 'Withdrawal', 'Transfer sent', 'Transfer received', 'Bill payment'].map((type) => [type, { count: transactions.filter((item) => item.type === type).length, amount: sum(transactions.filter((item) => item.type === type)) }]));
  const accounts = database.accounts.map(publicAccount);
  sendJson(res, 200, { success: true, summary: { activeAccounts: accounts.filter((account) => account.status === 'Active').length, frozenAccounts: accounts.filter((account) => account.status === 'Frozen').length, totalTransactions: transactions.length, transactionTypes: byType }, lowBalanceAccounts: accounts.filter((account) => Number(account.balance) < 1000).sort((first, second) => first.balance - second.balance) });
  return true;
}
