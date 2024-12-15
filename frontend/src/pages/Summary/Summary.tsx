import { useEffect, useState } from 'react';
import { ExpenseAttributes } from '../../../../src/models/expense';
import './Summary.scss'
import { Link } from 'react-router-dom';
import { MiddleCategoryAttributes } from '../../../../src/models/middle_category';
import { CurrencyAttributes } from '../../../../src/models/currency';
import { current_month, current_year } from '../../functions/date';
import { LargeCategoryAttributes } from '../../../../src/models/large_category';
import CategorySummary from '../../components/CategorySummary/CategorySummary';
import * as adapter from '../../api/adapter';

function Summary() {
  const [largeCategories, setLargeCategories] = useState<(LargeCategoryAttributes & { middle_categories: MiddleCategoryAttributes[] })[]>([]);
  const [expenses, setExpenses] = useState<(ExpenseAttributes& { middle_category: MiddleCategoryAttributes, currency: CurrencyAttributes })[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(current_year());
  const [selectedMonth, setSelectedMonth] = useState<number>(current_month());

  function refresh_expenses(year: number, month: number) {
    adapter.expenses(year, month).then(data=>{
      setExpenses(data.expenses);
    });
  }

  function back_month() {
    let year = selectedYear;
    let month = selectedMonth;
    if (selectedMonth == 1) {
      year -= 1;
      month = 12;
    } else {
      month -= 1;
    }
    setSelectedYear(year);
    setSelectedMonth(month);
    refresh_expenses(year, month);
  }

  function forward_month() {
    let year = selectedYear;
    let month = selectedMonth;
    if (selectedMonth == 12) {
      year += 1;
      month = 1;
    } else {
      month += 1;
    }
    setSelectedYear(year);
    setSelectedMonth(month);
    refresh_expenses(year, month);
  }

  useEffect(() => {
    adapter.large_categories().then(data=>{
      setLargeCategories(data.large_categories);
    });

    refresh_expenses(selectedYear, selectedMonth);
  }, []);

 const CategorySummaries = largeCategories.map(largeCategory=>{
  return <CategorySummary large_category={largeCategory} expenses={expenses} />
 });

  return (
    <>
      <h1>集計</h1>
      <nav>
        <Link to="/home">ホーム</Link>
        <Link to="/expense_registration">登録</Link>
      </nav>
      <h2>{selectedYear}年{selectedMonth}月</h2>
      <div>
        <button className='change_month' type="button" onClick={back_month}> ← </button>
        <button className='change_month' type="button" onClick={forward_month}> → </button>
      </div>
      {CategorySummaries}
    </>
  )
}

export default Summary
