import './Summary.module.css'
import { Link } from 'react-router-dom';

function Summary() {

  return (
    <>
      <h1>Vite + React</h1>
      <Link to="/home">ホーム</Link>
      <Link to="/expense_registration">登録</Link>
      <h2>支出</h2>
      <div>月ごとの支出を表示(予定)</div>
    </>
  )
}

export default Summary
