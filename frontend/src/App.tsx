import logo from './assets/global_budget_icon.png'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import ExpenseRegistration from './pages/ExpenseRegistration/ExpenseRegistration'
import Summary from './pages/Summary/Summary'

function App() {
  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Global Budget" />
      </div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/expense_registration" element={<ExpenseRegistration />} />
      </Routes>
    </>
  )
}

export default App
