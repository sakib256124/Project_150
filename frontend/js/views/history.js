import { getTransactionHistory } from '../features/transaction-history.js';
import { dateTime, empty, escapeHtml, heading, money, toast } from '../utils.js';

export async function renderHistory(container) {
  const transactions = await getTransactionHistory();
  container.innerHTML = `${heading('Account activity', 'Transaction history', 'Search by account number to review a customer’s complete activity.')}<div class="section-card"><div class="history-filter"><label class="field">Account number (optional)<input id="history-account" placeholder="e.g. ACC-1001"></label><button class="btn btn-secondary" id="filter-history">Filter history</button><button class="btn btn-secondary" id="reset-history">Show all</button></div><div class="table-wrap"><table><thead><tr><th>Reference</th><th>Type</th><th>Account</th><th>Related account</th><th>Note</th><th>Amount</th><th>Time</th></tr></thead><tbody id="history-table">${historyRows(transactions)}</tbody></table></div></div>`;
  document.getElementById('filter-history').addEventListener('click', filterHistory);
  document.getElementById('reset-history').addEventListener('click', () => { document.getElementById('history-account').value = ''; filterHistory(); });
}

function historyRows(items) { return items.length ? items.map((item) => `<tr><td>${escapeHtml(item.id)}</td><td><span class="badge">${escapeHtml(item.type)}</span></td><td>${escapeHtml(item.accountNumber)}</td><td>${escapeHtml(item.relatedAccount || '—')}</td><td>${escapeHtml(item.note || '—')}</td><td class="amount">${money(item.amount)}</td><td>${dateTime(item.createdAt)}</td></tr>`).join('') : `<tr><td colspan="7">${empty('No transactions match this account.')}</td></tr>`; }
async function filterHistory() { try { document.getElementById('history-table').innerHTML = historyRows(await getTransactionHistory(document.getElementById('history-account').value.trim())); } catch (error) { toast(error.message, 'error'); } }
