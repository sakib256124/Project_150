import { bindPayment } from '../features/payment.js';
import { heading } from '../utils.js';

export function renderPayment(container) {
  container.innerHTML = `${heading('Payments', 'Pay a bill', 'Record utility, internet, mobile, or other payments from an account.')}<div class="two-column"><div class="section-card"><div class="section-title"><h2>New bill payment</h2></div><form id="payment-form"><label class="field">Account number<input name="accountNumber" required></label><label class="field">PIN<input name="pin" type="password" inputmode="numeric" maxlength="4" required></label><label class="field">Biller / service name<input name="biller" placeholder="e.g. DESCO electricity" required></label><label class="field">Amount (BDT)<input name="amount" type="number" min="1" step="0.01" required></label><div class="form-actions"><button class="btn btn-primary">Pay bill</button></div></form></div><aside class="account-summary"><p>Quick reminder</p><h3>Check carefully before paying.</h3><p>Payments are immediately recorded in the customer account history and reduce the available balance.</p></aside></div>`;
  bindPayment(document.getElementById('payment-form'));
}
