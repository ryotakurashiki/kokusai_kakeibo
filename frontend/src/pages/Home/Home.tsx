import { useState, useEffect } from 'react'
import './Home.module.css'
import type { ResponseHomeData } from '../../../../api_types/home_data';
import ExpenseList from '../../components/ExpenseList/ExpenseList';
import { current_days, this_month_days } from '../../functions/date';

function Home() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<ResponseHomeData | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/home_data")
      .then((response) => response.json())
      .then((data: ResponseHomeData) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function calc_budget_rate(budget_amount: number, expense_total_amount: number): number {
    const estimated_expense_total_amount = expense_total_amount / current_days() * this_month_days();
    return Math.floor(estimated_expense_total_amount/budget_amount*100);
  }

  const bugetsResultItems = (data?.budget_with_results || []).map(budget_with_result => {
    const rate = calc_budget_rate(budget_with_result.budget_amount, budget_with_result.expense_total_amount);
    return (
      <div key={budget_with_result.budget_id}>
        <div>{ budget_with_result.large_category_name }</div>
        <div>予算{ budget_with_result.currency_symbol }{ budget_with_result.budget_amount }</div>
        <div>実績{ budget_with_result.currency_symbol }{ budget_with_result.expense_total_amount }</div>
        {rate > 100 ? (<div>！このペースだと予算を{budget_with_result.currency_symbol}{budget_with_result.budget_amount*(rate-100)/100}オーバーします</div>) : (<div></div>) }
      </div>
    )
  });

  return (
    <>
      <h1>Vite + React</h1>
      <h2>予算状況</h2>
      <div>{bugetsResultItems}</div>
      <h2>最近の支出</h2>
      <ExpenseList expenses={data?.expenses || []} />
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
