import { requestApi } from './requestApi';
import { ResponseRecentExpenses } from '../../../api_types/recent_expenses';
import { ResponseExpenses } from '../../../api_types/expenses';
import { ResponseBudgets } from '../../../api_types/budgets';
import { ResponseLargeCategories } from '../../../api_types/large_categories';
import { RequestCreateExpense, ResponseCreateExpense } from '../../../api_types/create_expense';
import { ResponseCurrencies } from '../../../api_types/currencies';
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

export async function currencies() {
  const res = await requestApi<ResponseCurrencies>({
    url: '/currencies',
    method: 'GET',
  });
  return res;
}

export async function create_expense(config: RequestCreateExpense) {
  const res = await requestApi<ResponseCreateExpense>({
    url: '/create_expense',
    body: {
      amount: config.amount,
      payment_date: config.payment_date,
      name: config.name,
      middle_category_id: config.middle_category_id,
      currency_id: config.currency_id,
    },
    method: 'POST',
  });
  return res;
}
