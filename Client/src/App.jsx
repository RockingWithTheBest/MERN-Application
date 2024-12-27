import Client from './Components/Client/ClientRoute'
import Cashier from './Components/Cashiers/Cashiers'
import Currency from './Components/Currency/currency'
import Transaction from './Components/Transactions/transaction'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import OpenPage from './Page/page'
import './App.css'

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<OpenPage />} />
          <Route path="/client" element={<Client />} />
          <Route path="/cashier" element={<Cashier />} />
          <Route path="/currency" element={<Currency />} />
          <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
