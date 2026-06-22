import { apiRequest } from '../api.js';

export async function getTransactionHistory(accountNumber = '') { return (await apiRequest(`/transactions?accountNumber=${encodeURIComponent(accountNumber)}`)).transactions; }
