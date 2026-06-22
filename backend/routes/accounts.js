import { sendError, sendJson } from '../lib/http.js';
import { addTransaction, readDatabase, saveDatabase } from '../lib/store.js';
import { accountNumber, publicAccount, requiredFields } from '../lib/validation.js';

export function handleAccounts(req, res, url, body) {
  if (req.method === 'GET' && url.pathname === '/api/accounts') {
    const search = String(url.searchParams.get('search') || '').trim().toLowerCase();
    const accounts = readDatabase().accounts.filter((account) => !search || [account.accountNumber, account.name, account.phone, account.email].some((value) => String(value).toLowerCase().includes(search))).map(publicAccount);
    sendJson(res, 200, { success: true, accounts }); return true;
  }
  if (req.method === 'POST' && url.pathname === '/api/accounts') {
    const fields = ['accountNumber', 'name', 'phone', 'email', 'address', 'nominee', 'pin'];
    if (!requiredFields(body, fields)) { sendError(res, 'Please complete all account fields.'); return true; }
    if (!/^\d{4}$/.test(String(body.pin))) { sendError(res, 'PIN must contain exactly 4 digits.'); return true; }
    const database = readDatabase(); const accountNumberValue = accountNumber(body.accountNumber);
    if (!/^ACC-\d{4,}$/.test(accountNumberValue)) { sendError(res, 'Use an account number like ACC-1003.'); return true; }
    if (database.accounts.some((account) => account.accountNumber === accountNumberValue)) { sendError(res, 'This account number already exists.'); return true; }
    const openingBalance = Number(body.openingBalance || 0);
    if (!Number.isFinite(openingBalance) || openingBalance < 0) { sendError(res, 'Opening balance cannot be negative.'); return true; }
    const account = { accountNumber: accountNumberValue, name: String(body.name).trim(), phone: String(body.phone).trim(), email: String(body.email).trim(), address: String(body.address).trim(), nominee: String(body.nominee).trim(), pin: String(body.pin), balance: openingBalance, status: 'Active', createdAt: new Date().toISOString() };
    database.accounts.push(account); if (openingBalance > 0) addTransaction(database, { type: 'Deposit', accountNumber: accountNumberValue, amount: openingBalance, note: 'Opening balance' }); saveDatabase(database);
    sendJson(res, 201, { success: true, message: 'Account created successfully.', account: publicAccount(account) }); return true;
  }
  const match = url.pathname.match(/^\/api\/accounts\/([^/]+)$/);
  if (!match) return false;
  const database = readDatabase(); const index = database.accounts.findIndex((account) => account.accountNumber === decodeURIComponent(match[1])); const account = database.accounts[index];
  if (!account) { sendError(res, 'Account not found.', 404); return true; }
  if (req.method === 'GET') { sendJson(res, 200, { success: true, account: publicAccount(account) }); return true; }
  if (req.method === 'PUT') {
    const fields = ['name', 'phone', 'email', 'address', 'nominee'];
    if (!requiredFields(body, fields)) { sendError(res, 'Please complete all editable fields.'); return true; }
    if (body.pin && !/^\d{4}$/.test(String(body.pin))) { sendError(res, 'PIN must contain exactly 4 digits.'); return true; }
    fields.forEach((field) => { account[field] = String(body[field]).trim(); }); if (body.pin) account.pin = String(body.pin); saveDatabase(database);
    sendJson(res, 200, { success: true, message: 'Account details updated.', account: publicAccount(account) }); return true;
  }
  if (req.method === 'DELETE') {
    if (Number(account.balance) !== 0) { sendError(res, 'Settle the account balance before closing this account.'); return true; }
    database.accounts.splice(index, 1); addTransaction(database, { type: 'Account closed', accountNumber: account.accountNumber, amount: 0, note: 'Account closed by administrator' }); saveDatabase(database); sendJson(res, 200, { success: true, message: 'Account closed successfully.' }); return true;
  }
  return false;
}
