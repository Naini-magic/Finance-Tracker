import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'

const DeleteTransaction = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTransaction()
  }, [id])

  const fetchTransaction = async () => {
    try {
      const response = await axios.get(`https://finance-tracker-y6x1.onrender.com/api/transactions/${id}`)
      setTransaction(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch transaction')
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    setError('')
    
    try {
      await axios.delete(`https://finance-tracker-y6x1.onrender.com/api/transactions/${id}`)
      navigate('/')
    } catch (err) {
      setError('Failed to delete transaction')
      setDeleting(false)
    }
  }

  if (loading) return <div className="text-center mt-8">Loading...</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Delete Transaction</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <p className="text-lg mb-2">Are you sure you want to delete this transaction?</p>
        <div className="bg-gray-100 p-4 rounded">
          <p className="font-semibold">{transaction.title}</p>
          <p className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
          </p>
          <p className="text-gray-600">{new Date(transaction.date).toLocaleDateString()}</p>
          <p className="text-gray-600">Category: {transaction.category}</p>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Link 
          to="/" 
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </Link>
        <button 
          onClick={handleDelete} 
          disabled={deleting}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

export default DeleteTransaction
