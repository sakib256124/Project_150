import { sendJson } from '../lib/http.js';
import { readDatabase } from '../lib/store.js';

export function handleDashboard(req, res, url) {
  if (req.method !== 'GET' || url.pathname !== '/api/dashboard') return false;
  const database = readDatabase();
  const today = new Date().toISOString().slice(0, 10);
  const todayTransactions = database.transactions.filter((item) => item.createdAt.slice(0, 10) === today);
  const sum = (items) => items.reduce((total, item) => total + Number(item.amount), 0);
  sendJson(res, 200, { success: true, stats: { totalAccounts: database.accounts.length, totalBalance: database.accounts.reduce((total, account) => total + Number(account.balance), 0), todayDeposits: sum(todayTransactions.filter((item) => item.type === 'Deposit')), todayWithdrawals: sum(todayTransactions.filter((item) => item.type === 'Withdrawal')) }, recentTransactions: [...database.transactions].reverse().slice(0, 8) });
  return true;
}
