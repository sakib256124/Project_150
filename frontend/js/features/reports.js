import { apiRequest } from '../api.js';

export async function getReportSummary() { return apiRequest('/reports/summary'); }
