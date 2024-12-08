import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import ExpenseRegistration from './pages/ExpenseRegistration/ExpenseRegistration'
import Summary from './pages/Summary/Summary'

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
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
