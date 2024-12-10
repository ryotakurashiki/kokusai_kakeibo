import { requestApi } from './requestApi';
import { ResponseRecentExpenses } from '../../../api_types/recent_expenses';
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
