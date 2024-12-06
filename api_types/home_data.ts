import { CurrencyAttributes } from '../src/models/currency';
import type { ExpenseAttributes } from '../src/models/expense';
import type { KakeiboAttributes } from '../src/models/kakeibo';
import { MiddleCategoryAttributes } from '../src/models/middle_category';

export type ResponseHomeData = null | {
  expenses: (ExpenseAttributes & {
    currency: CurrencyAttributes,
    middle_category: MiddleCategoryAttributes
  })[]
  kakeibo: KakeiboAttributes
}
