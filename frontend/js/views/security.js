import { bindPinChange } from '../features/change-pin.js';
import { heading } from '../utils.js';

export function renderSecurity(container) {
  container.innerHTML = `${heading('Account security', 'Change customer PIN', 'Verify the current PIN first, then set a different four-digit PIN.')}<div class="two-column"><div class="section-card"><div class="section-title"><h2>Change PIN</h2></div><form id="change-pin-form"><label class="field">Account number<input name="accountNumber" required></label><label class="field">Current PIN<input name="currentPin" type="password" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" required></label><label class="field">New PIN<input name="newPin" type="password" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" required></label><label class="field">Confirm new PIN<input name="confirmPin" type="password" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" required></label><div class="form-actions"><button class="btn btn-primary">Update PIN</button></div></form></div><aside class="account-summary"><p>Security note</p><h3>Keep PINs private.</h3><p>For this educational project, PINs are kept in its local JSON data file. Production banking software must encrypt and securely hash credentials.</p></aside></div>`;
  bindPinChange(document.getElementById('change-pin-form'));
}
