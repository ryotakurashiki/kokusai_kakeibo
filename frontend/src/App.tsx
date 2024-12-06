import { useState, useEffect } from 'react'
import Test from "./components/Test";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { ResponseHomeData } from '../../api_types/home_data';

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<ResponseHomeData | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/home_data")
      .then((response) => response.json())
      .then((data: ResponseHomeData) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const listItems = data?.expenses?.map(expense =>
    <li key={expense.id}>
      {expense.name}
    </li>
  );

  const handleClick = () => {
    alert("Button clicked!");
  };

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
      <h1>Vite + React</h1>
      <h2>{ data ? data.kakeibo?.id : "dataなし" }</h2>
      <ul>{listItems}</ul>
      <div className="card">
        <Test label="Click Me" onClick={handleClick} />
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

export default App
