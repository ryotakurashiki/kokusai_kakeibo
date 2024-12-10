import { requestApi } from './requestApi';
import { ResponseRecentExpenses } from '../../../api_types/recent_expenses';
import { ResponseBudgets } from '../../../api_types/budgets';
/**
 * 最近の支出を取得
 */
export async function recentExpenses() {
  const res = await requestApi<ResponseRecentExpenses>({
    url: '/recent_expenses',
    method: 'GET',
  });
  return res;
}

export async function budgets() {
  const res = await requestApi<ResponseBudgets>({
    url: '/budgets',
    method: 'GET',
  });
  return res;
}

