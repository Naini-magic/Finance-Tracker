// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import TransactionList from '../components/TransactionList'
// import axios from 'axios'

// const Home = () => {
//   const [transactions, setTransactions] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [balance, setBalance] = useState(0)

//   useEffect(() => {
//     fetchTransactions()
//   }, [])

//   const fetchTransactions = async () => {
//     try {
//       const response = await axios.get('/api/transactions')
//       setTransactions(response.data)
//       calculateBalance(response.data)
//       setLoading(false)
//     } catch (err) {
//       setError('Failed to fetch transactions')
//       setLoading(false)
//     }
//   }

//   const calculateBalance = (transactions) => {
//     const total = transactions.reduce((acc, transaction) => {
//       return transaction.type === 'income' 
//         ? acc + transaction.amount 
//         : acc - transaction.amount
//     }, 0)
//     setBalance(total)
//   }

//   if (loading) return <div className="text-center mt-8">Loading...</div>
//   if (error) return <div className="text-center mt-8 text-red-500">{error}</div>

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Transactions</h2>
//         <Link 
//           to="/add" 
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Add Transaction
//         </Link>
//       </div>

//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h3 className="text-lg font-semibold mb-2">Current Balance</h3>
//         <p className={`text-2xl ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//           ${balance.toFixed(2)}
//         </p>
//       </div>

//       <TransactionList 
//         transactions={transactions} 
//         onTransactionDeleted={fetchTransactions} 
//       />
//     </div>
//   )
// }

// export default Home






















import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TransactionList from '../components/TransactionList'
import axios from 'axios'

const Home = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [balance, setBalance] = useState(0)
  const [income, setIncome] = useState(0)
  const [expenses, setExpenses] = useState(0)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('https://finance-tracker-y6x1.onrender.com/api/transactions')
      setTransactions(response.data)
      calculateBalance(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch transactions')
      setLoading(false)
    }
  }

  const calculateBalance = (transactions) => {
    let totalIncome = 0;
    let totalExpenses = 0;
    
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else {
        totalExpenses += transaction.amount;
      }
    });
    
    const totalBalance = totalIncome - totalExpenses;
    setBalance(totalBalance);
    setIncome(totalIncome);
    setExpenses(totalExpenses);
  }

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
  
  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {error}
    </div>
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Financial Overview</h2>
        <Link 
          to="/add" 
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center shadow-md hover:shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Transaction
        </Link>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium opacity-80">Current Balance</p>
              <h3 className="text-3xl font-bold mt-2">${balance.toFixed(2)}</h3>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className={`mt-4 flex items-center text-sm ${balance >= 0 ? 'text-green-200' : 'text-red-200'}`}>
            {balance >= 0 ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Positive cash flow
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Negative cash flow
              </>
            )}
          </div>
        </div>

        {/* Income Card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium opacity-80">Total Income</p>
              <h3 className="text-3xl font-bold mt-2">${income.toFixed(2)}</h3>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-sm text-green-200">
            {transactions.filter(t => t.type === 'income').length} income transactions
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium opacity-80">Total Expenses</p>
              <h3 className="text-3xl font-bold mt-2">${expenses.toFixed(2)}</h3>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-sm text-red-200">
            {transactions.filter(t => t.type === 'expense').length} expense transactions
          </div>
        </div>
      </div>

      <TransactionList 
        transactions={transactions} 
        onTransactionDeleted={fetchTransactions} 
      />
    </div>
  )
}

export default Home
