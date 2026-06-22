import { setActivePage, getActivePage, getAdmin, setAdmin } from './state.js';
import { empty } from './utils.js';
import { renderAccounts } from './views/accounts.js';
import { renderBanking } from './views/banking.js';
import { renderDashboard } from './views/dashboard.js';
import { renderHistory } from './views/history.js';
import { renderLogin } from './views/login.js';
import { renderPayment } from './views/payment.js';
import { renderReports } from './views/reports.js';
import { renderSecurity } from './views/security.js';

const app = document.getElementById('app');
const views = { dashboard: renderDashboard, accounts: renderAccounts, banking: renderBanking, payments: renderPayment, history: renderHistory, security: renderSecurity, reports: renderReports };

export function renderApp() {
  if (!getAdmin()) return renderLogin(app, renderApp);
  const navItems = [['dashboard', '▦', 'Dashboard'], ['accounts', '◉', 'Accounts'], ['banking', '⇄', 'Banking'], ['payments', '▣', 'Bill payment'], ['history', '◷', 'History'], ['security', '⌘', 'Security'], ['reports', '▤', 'Reports']];
  app.innerHTML = `<div class="shell"><header class="topbar"><div class="brand brand--dark"><span class="brand-mark">B</span> Bankly</div><div class="topbar-actions"><span>Administrator workspace</span><button class="btn btn-secondary btn-small" id="logout">Log out</button></div></header><div class="layout"><nav class="sidebar">${navItems.map(([key, icon, label]) => `<button class="nav-item ${key === getActivePage() ? 'active' : ''}" data-page="${key}"><span class="nav-icon">${icon}</span>${label}</button>`).join('')}</nav><section class="content" id="page-content"></section></div></div>`;
  document.querySelectorAll('[data-page]').forEach((button) => button.addEventListener('click', () => { setActivePage(button.dataset.page); renderApp(); }));
  document.getElementById('logout').addEventListener('click', () => { setAdmin(null); setActivePage('dashboard'); renderApp(); });
  renderCurrentPage();
}

async function renderCurrentPage() {
  const container = document.getElementById('page-content');
  try { await views[getActivePage()](container); }
  catch (error) { container.innerHTML = `<div class="section-card">${empty(`${error.message} Please ensure the backend server is running.`)}</div>`; }
}

renderApp();
