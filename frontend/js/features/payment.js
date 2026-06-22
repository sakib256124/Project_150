import { money, submitBankingForm, toast } from '../utils.js';

export function bindPayment(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try { await submitBankingForm(form, '/transactions/payment', (values) => `Confirm bill payment of ${money(values.amount)} to ${values.biller} from ${values.accountNumber}?`, (data) => `${data.message} New balance: ${money(data.balance)}`); }
    catch (error) { toast(error.message, 'error'); }
  });
}
