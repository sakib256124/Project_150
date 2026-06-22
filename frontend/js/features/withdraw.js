import { money, submitBankingForm, toast } from '../utils.js';

export function bindWithdraw(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try { await submitBankingForm(form, '/transactions/withdraw', (values) => `Confirm withdrawal of ${money(values.amount)} from ${values.accountNumber}?`, (data) => `${data.message} New balance: ${money(data.balance)}`); }
    catch (error) { toast(error.message, 'error'); }
  });
}
