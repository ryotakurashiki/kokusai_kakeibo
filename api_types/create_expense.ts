export type RequestCreateExpense = {
  amount: number;
  payment_date: string;
  name: string;
  middle_category_id: number;
  currency_id: number;
}

export type ResponseCreateExpense = {}
