import { useState, useEffect } from 'react'
import './Home.scss'
import ExpenseList from '../../components/ExpenseList/ExpenseList';
import { current_days, this_month_days } from '../../functions/date';
import { Link } from 'react-router-dom';
import * as adapter from '../../api/adapter';
import { ExpenseAttributes } from '../../../../src/models/expense';
import { CurrencyAttributes } from '../../../../src/models/currency';
import { MiddleCategoryAttributes } from '../../../../src/models/middle_category';

interface budgetWithResult {
  budget_id: number;
  large_category_name: string;
  currency_symbol: string;
  budget_amount: number;
  expense_total_amount: number;
}

function Home() {
  const [count, setCount] = useState(0);
  const [expenses, setExpenses] = useState<(ExpenseAttributes & { currency: CurrencyAttributes, middle_category: MiddleCategoryAttributes })[]>([]);
  const [budgetWithResults, setBudgetWithResults] = useState<budgetWithResult[]>([]);

  useEffect(() => {
    adapter.budgets().then(data=>{
      setBudgetWithResults(data.budget_with_results);
    });

    adapter.recentExpenses().then(data => {
      setExpenses(data?.expenses || []);
    });
  }, []);

  function calc_budget_rate(budget_amount: number, expense_total_amount: number): number {
    const estimated_expense_total_amount = expense_total_amount / current_days() * this_month_days();
    return Math.floor(estimated_expense_total_amount/budget_amount*100);
  }

  const budgetResultItems = (budgetWithResults).map(budget_with_result => {
    const rate = calc_budget_rate(budget_with_result.budget_amount, budget_with_result.expense_total_amount);
    return (
      <table key={budget_with_result.budget_id} className="budget_result_item">
        <tbody>
          <tr className='category_budget_result'>
            <td className='category'>{ budget_with_result.large_category_name }</td>
            <td className='budget_result'>
              <div className='table_row'>
                <div className='table_cell'>予算</div><div className='table_cell amount'>  { budget_with_result.currency_symbol }{ budget_with_result.budget_amount }</div>
              </div>
              <div className='table_row'>
                <div className='table_cell'>実績</div><div className='table_cell amount'>  { budget_with_result.currency_symbol }{ budget_with_result.expense_total_amount }</div>
              </div>
            </td>
          </tr>
          {rate > 100 ? (<tr><td className='budget_alert' colSpan={2}>このペースだと{budget_with_result.currency_symbol}{budget_with_result.budget_amount*(rate-100)/100}オーバーします</td></tr>) : "" }
        </tbody>
      </table>
    )
  });

  return (
    <>
      <h1>Vite + React</h1>
      <nav>
        <Link to="/summary">集計</Link>
        <Link to="/expense_registration">登録</Link>
      </nav>
      <h2>予算状況</h2>
      <div>{budgetResultItems}</div>
      <h2>最近の支出</h2>
      <ExpenseList expenses={expenses} />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Home
