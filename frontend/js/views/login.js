import { apiRequest } from '../api.js';
import { setAdmin } from '../state.js';
import { toast } from '../utils.js';

export function renderLogin(container, onLogin) {
  container.innerHTML = `<section class="login-page"><div class="login-aside"><div class="brand"><span class="brand-mark">B</span> Bankly</div><div><p class="eyebrow" style="color:#c8e9ce">Bank management, made simple</p><h1>Clarity for every account.</h1><p>A practical management portal for accounts, deposits, transfers, bill payments, and transaction history.</p></div><div class="login-note">Educational demonstration project · Do not use real banking credentials.</div></div><div class="login-card-wrap"><form id="login-form" class="login-card"><p class="eyebrow">Administrator portal</p><h2>Welcome back</h2><p class="subtle">Sign in to manage your bank records.</p><div class="demo-box">Demo access<br><strong>admin@bank.local</strong><br><strong>admin123</strong></div><label class="field">Email<input name="email" type="email" value="admin@bank.local" required></label><label class="field">Password<input name="password" type="password" value="admin123" required></label><button class="btn btn-primary btn-full">Sign in securely</button></form></div></section>`;
  document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    try { const result = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) }); setAdmin(result.admin); onLogin(); toast(`Welcome, ${result.admin.name}.`); }
    catch (error) { toast(error.message, 'error'); }
  });
}
