import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { fetchData } from './api';
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  const [data, setData] = useState<string>("");

    useEffect(() => {
        fetchData().then((res) => {if (res) setData(res)})
    }, []);
    console.log(data ? data : "Loading...")

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
