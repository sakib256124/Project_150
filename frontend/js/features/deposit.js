import { money, submitBankingForm, toast } from '../utils.js';

export function bindDeposit(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try { await submitBankingForm(form, '/transactions/deposit', (values) => `Confirm cash deposit of ${money(values.amount)} to ${values.accountNumber}?`, (data) => `${data.message} New balance: ${money(data.balance)}`); }
    catch (error) { toast(error.message, 'error'); }
  });
}
