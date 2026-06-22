import { bindAccountCreate } from '../features/account-create.js';
import { deleteAccount } from '../features/account-delete.js';
import { searchAccounts } from '../features/account-search.js';
import { updateAccountStatus } from '../features/account-status.js';
import { bindAccountUpdate, getAccountForEdit } from '../features/account-update.js';
import { apiRequest } from '../api.js';
import { empty, escapeHtml, heading, money, toast } from '../utils.js';

export async function renderAccounts(container) {
  const accounts = (await apiRequest('/accounts')).accounts;
  container.innerHTML = `${heading('Customer accounts', 'Accounts', 'Create, search, update, freeze, or remove customer account records.')}<div class="two-column"><div class="section-card" id="account-form-card"><div class="section-title"><h2>Create a new account</h2></div>${accountForm()}</div><div class="account-summary"><p>Account management</p><h3>Everything in one place.</h3><p>Frozen accounts cannot deposit, withdraw, transfer, or make payments.</p><div class="account-balance">${accounts.length} accounts</div></div></div><div class="section-card" style="margin-top:1.2rem"><div class="section-title"><h2>Account directory</h2><div class="search-row"><input class="search-input" id="account-search" placeholder="Search name, account or phone"><button class="btn btn-secondary btn-small" id="search-accounts">Search</button></div></div><div class="table-wrap"><table><thead><tr><th>Account</th><th>Customer</th><th>Phone</th><th>Status</th><th>Balance</th><th>Actions</th></tr></thead><tbody id="accounts-table">${accountRows(accounts)}</tbody></table></div></div>`;
  bindCreateForm(container); bindDirectory(container); bindSearch(container);
}

function accountForm(account = {}) {
  const editing = Boolean(account.accountNumber);
  return `<form id="account-form"><div class="form-grid"><label class="field">Account number<input name="accountNumber" value="${escapeHtml(account.accountNumber || '')}" ${editing ? 'readonly' : 'placeholder="e.g. ACC-1003"'} required></label><label class="field">Customer name<input name="name" value="${escapeHtml(account.name || '')}" required></label><label class="field">Phone<input name="phone" value="${escapeHtml(account.phone || '')}" required></label><label class="field">Email<input name="email" type="email" value="${escapeHtml(account.email || '')}" required></label><label class="field">Nominee<input name="nominee" value="${escapeHtml(account.nominee || '')}" required></label><label class="field">${editing ? 'New PIN (optional)' : '4 digit PIN'}<input name="pin" type="password" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" ${editing ? '' : 'required'}><span class="field-hint">${editing ? 'Leave empty to keep current PIN.' : 'Used for customer transactions.'}</span></label>${editing ? '' : '<label class="field">Opening balance<input name="openingBalance" type="number" min="0" step="0.01" value="0" required></label>'}<label class="field wide">Address<textarea name="address" required>${escapeHtml(account.address || '')}</textarea></label></div><div class="form-actions">${editing ? '<button type="button" class="btn btn-secondary" id="cancel-edit">Cancel</button>' : ''}<button class="btn btn-primary">${editing ? 'Save changes' : 'Create account'}</button></div></form>`;
}

function accountRows(accounts) {
  return accounts.length ? accounts.map((account) => `<tr><td>${escapeHtml(account.accountNumber)}</td><td><strong>${escapeHtml(account.name)}</strong><br><span class="subtle">${escapeHtml(account.email)}</span></td><td>${escapeHtml(account.phone)}</td><td><span class="badge ${account.status === 'Frozen' ? 'badge-frozen' : ''}">${escapeHtml(account.status || 'Active')}</span></td><td class="amount">${money(account.balance)}</td><td><div class="actions"><button class="btn btn-secondary btn-small" data-edit="${escapeHtml(account.accountNumber)}">Edit</button><button class="btn btn-secondary btn-small" data-status-account="${escapeHtml(account.accountNumber)}" data-status-value="${account.status === 'Frozen' ? 'Active' : 'Frozen'}">${account.status === 'Frozen' ? 'Unfreeze' : 'Freeze'}</button><button class="btn btn-danger btn-small" data-delete="${escapeHtml(account.accountNumber)}">Delete</button></div></td></tr>`).join('') : `<tr><td colspan="6">${empty('No accounts found.')}</td></tr>`;
}

function bindCreateForm(container) { bindAccountCreate(document.getElementById('account-form'), () => renderAccounts(container)); }
function bindSearch(container) {
  document.getElementById('search-accounts').addEventListener('click', async () => {
    try { document.getElementById('accounts-table').innerHTML = accountRows(await searchAccounts(document.getElementById('account-search').value)); bindDirectory(container); }
    catch (error) { toast(error.message, 'error'); }
  });
}
function bindDirectory(container) {
  document.querySelectorAll('[data-delete]').forEach((button) => button.addEventListener('click', () => deleteAccount(button.dataset.delete, () => renderAccounts(container))));
  document.querySelectorAll('[data-status-account]').forEach((button) => button.addEventListener('click', () => updateAccountStatus(button.dataset.statusAccount, button.dataset.statusValue, () => renderAccounts(container))));
  document.querySelectorAll('[data-edit]').forEach((button) => button.addEventListener('click', async () => {
    try {
      const account = await getAccountForEdit(button.dataset.edit); const card = document.getElementById('account-form-card'); card.innerHTML = `<div class="section-title"><h2>Edit ${escapeHtml(account.accountNumber)}</h2></div>${accountForm(account)}`;
      bindAccountUpdate(document.getElementById('account-form'), account.accountNumber, () => renderAccounts(container));
      document.getElementById('cancel-edit').addEventListener('click', () => renderAccounts(container)); card.scrollIntoView({ behavior: 'smooth' });
    } catch (error) { toast(error.message, 'error'); }
  }));
}
