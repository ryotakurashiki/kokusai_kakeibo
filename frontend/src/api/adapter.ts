import { requestApi } from './requestApi';
import { ResponseRecentExpenses } from '../../../api_types/recent_expenses';
import { ResponseExpenses } from '../../../api_types/expenses';
import { ResponseBudgets } from '../../../api_types/budgets';
import { ResponseLargeCategories } from '../../../api_types/large_categories';
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

export async function expenses(year: number, month: number) {
  const res = await requestApi<ResponseExpenses>({
    url: `/expenses?year=${year}&month=${month}`,
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

export async function large_categories() {
  const res = await requestApi<ResponseLargeCategories>({
    url: '/large_categories',
    method: 'GET',
  });
  return res;
}

