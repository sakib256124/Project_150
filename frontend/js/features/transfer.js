import { money, submitBankingForm, toast } from '../utils.js';

export function bindTransfer(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try { await submitBankingForm(form, '/transactions/transfer', (values) => `Confirm transfer of ${money(values.amount)} from ${values.fromAccount} to ${values.toAccount}?`, (data) => `${data.message} New balance: ${money(data.balance)}`); }
    catch (error) { toast(error.message, 'error'); }
  });
}
