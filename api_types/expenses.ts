import { CurrencyAttributes } from '../src/models/currency';
import { ExpenseAttributes } from '../src/models/expense';
import { MiddleCategoryAttributes } from '../src/models/middle_category';

export type ResponseExpenses = {
  expenses: (ExpenseAttributes & {
    currency: CurrencyAttributes,
    middle_category: MiddleCategoryAttributes
  })[],
}
