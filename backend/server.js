import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readBody, sendError } from './lib/http.js';
import { handleAccounts } from './routes/accounts.js';
import { handleAccountStatus } from './routes/account-status.js';
import { handleAuth } from './routes/auth.js';
import { handleChangePin } from './routes/change-pin.js';
import { handleDashboard } from './routes/dashboard.js';
import { handleDeposit } from './routes/deposit.js';
import { handleHistory } from './routes/history.js';
import { handlePayment } from './routes/payment.js';
import { handleReports } from './routes/reports.js';
import { handleTransfer } from './routes/transfer.js';
import { handleWithdraw } from './routes/withdraw.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, '..', 'frontend');
const port = process.env.PORT || 5000;
const mimeTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8' };
const apiRoutes = [handleAuth, handleDashboard, handleAccounts, handleAccountStatus, handleChangePin, handleDeposit, handleWithdraw, handleTransfer, handlePayment, handleHistory, handleReports];

function serveFrontend(res, pathname) {
  const requested = pathname === '/' ? 'index.html' : path.normalize(pathname).replace(/^[/\\]+/, '');
  const filePath = path.join(frontendPath, requested);
  if (!filePath.startsWith(frontendPath) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(200, { 'Content-Type': mimeTypes['.html'] });
    return res.end(fs.readFileSync(path.join(frontendPath, 'index.html')));
  }
  res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
  return res.end(fs.readFileSync(filePath));
}

http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  try {
    if (!url.pathname.startsWith('/api/')) return serveFrontend(res, url.pathname);
    if (url.pathname === '/api/health' && req.method === 'GET') return res.end(JSON.stringify({ success: true, message: 'Bank API is running.' }));
    const body = ['POST', 'PUT'].includes(req.method) ? await readBody(req) : {};
    for (const route of apiRoutes) if (await route(req, res, url, body)) return;
    return sendError(res, 'API endpoint not found.', 404);
  } catch (error) {
    console.error(error);
    return sendError(res, error.message || 'Unexpected server error.', 500);
  }
}).listen(port, () => console.log(`Bank Management System: http://localhost:${port}`));
