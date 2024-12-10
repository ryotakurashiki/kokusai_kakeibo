export type ResponseBudgets = {
  budget_with_results: {
    budget_id: number;
    large_category_name: string;
    currency_symbol: string;
    budget_amount: number;
    expense_total_amount: number
  }[]
}
