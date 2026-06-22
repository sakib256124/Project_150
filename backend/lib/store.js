import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const databasePath = path.join(__dirname, '..', 'data', 'database.json');

export function readDatabase() { return JSON.parse(fs.readFileSync(databasePath, 'utf8')); }
export function saveDatabase(database) { fs.writeFileSync(databasePath, `${JSON.stringify(database, null, 2)}\n`); }
export function addTransaction(database, details) { database.transactions.push({ id: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`, createdAt: new Date().toISOString(), ...details }); }
export function accountForPin(database, accountNumber, pin) { const account = database.accounts.find((item) => item.accountNumber === String(accountNumber).trim()); return account?.pin === String(pin) ? account : null; }
export function isAccountFrozen(account) { return account?.status === 'Frozen'; }
