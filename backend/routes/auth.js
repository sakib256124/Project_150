import { sendError, sendJson } from '../lib/http.js';
import { readDatabase } from '../lib/store.js';

export function handleAuth(req, res, url, body) {
  if (req.method !== 'POST' || url.pathname !== '/api/auth/login') return false;
  const database = readDatabase();
  if (body.email !== database.admin.email || body.password !== database.admin.password) sendError(res, 'Invalid administrator email or password.', 401);
  else sendJson(res, 200, { success: true, admin: { name: database.admin.name, email: database.admin.email } });
  return true;
}
