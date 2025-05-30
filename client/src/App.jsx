
import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import QueryGenerator from './components/QueryGenerator'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/query' element={<QueryGenerator />} />
  </Routes>
  </BrowserRouter>
  )
}

export default App
