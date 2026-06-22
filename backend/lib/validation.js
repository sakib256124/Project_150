export function requiredFields(body, fields) { return fields.every((field) => String(body[field] ?? '').trim()); }
export function positiveAmount(value) { const amount = Number(value); return Number.isFinite(amount) && amount > 0 ? amount : null; }
export function accountNumber(value) { return String(value ?? '').trim().toUpperCase(); }
export function publicAccount(account) { const { pin, ...safeAccount } = account; return { ...safeAccount, status: safeAccount.status || 'Active' }; }
