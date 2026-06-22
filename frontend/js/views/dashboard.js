import { apiRequest } from '../api.js';
import { getAdmin } from '../state.js';
import { dateTime, empty, escapeHtml, heading, money } from '../utils.js';

export async function renderDashboard(container) {
  const data = await apiRequest('/dashboard'); const stats = data.stats; const firstName = escapeHtml(getAdmin().name.split(' ')[0]);
  container.innerHTML = `${heading('Overview', `Good afternoon, ${firstName}`, 'Here is the latest view of your bank operations.')}<div class="stats"><div class="stat"><div class="stat-label">Total accounts</div><div class="stat-value">${stats.totalAccounts}</div></div><div class="stat"><div class="stat-label">Total deposits held</div><div class="stat-value">${money(stats.totalBalance)}</div></div><div class="stat"><div class="stat-label">Today’s deposits</div><div class="stat-value">${money(stats.todayDeposits)}</div></div><div class="stat"><div class="stat-label">Today’s withdrawals</div><div class="stat-value">${money(stats.todayWithdrawals)}</div></div></div><div class="section-card"><div class="section-title"><h2>Recent activity</h2><span class="subtle">Latest 8 records</span></div><div class="table-wrap"><table><thead><tr><th>Reference</th><th>Type</th><th>Account</th><th>Amount</th><th>Time</th></tr></thead><tbody>${data.recentTransactions.length ? data.recentTransactions.map(transactionRow).join('') : `<tr><td colspan="5">${empty('No activity yet.')}</td></tr>`}</tbody></table></div></div>`;
}

function transactionRow(item) { return `<tr><td>${escapeHtml(item.id)}</td><td><span class="badge">${escapeHtml(item.type)}</span></td><td>${escapeHtml(item.accountNumber)}${item.relatedAccount ? ` → ${escapeHtml(item.relatedAccount)}` : ''}</td><td class="amount">${money(item.amount)}</td><td>${dateTime(item.createdAt)}</td></tr>`; }
