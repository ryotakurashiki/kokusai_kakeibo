import type { ExpenseAttributes } from '../src/models/expense';
import type { KakeiboAttributes } from '../src/models/kakeibo';

export type ResponseHomeData = null | {
  expenses: ExpenseAttributes[]
  kakeibo: KakeiboAttributes
}
