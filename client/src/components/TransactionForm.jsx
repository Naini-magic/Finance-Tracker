import { useState, useEffect } from 'react'

const TransactionForm = ({ onSubmit, loading, initialData, buttonText = "Submit" }) => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      setAmount(initialData.amount)
      setType(initialData.type)
      setDate(new Date(initialData.date).toISOString().split('T')[0])
      setCategory(initialData.category)
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const transactionData = {
      title,
      amount: parseFloat(amount),
      type,
      date: new Date(date),
      category
    }
    
    onSubmit(transactionData)
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0.01"
            step="0.01"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : buttonText}
        </button>
      </form>
    </div>
  )
}

export default TransactionForm