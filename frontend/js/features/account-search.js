import { apiRequest } from '../api.js';

export async function searchAccounts(query) { return (await apiRequest(`/accounts?search=${encodeURIComponent(query)}`)).accounts; }
