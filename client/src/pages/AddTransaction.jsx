import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TransactionForm from '../components/TransactionForm'
import axios from 'axios'

const AddTransaction = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (transactionData) => {
    setLoading(true)
    setError('')
    
    try {
      await axios.post('https://finance-tracker-y6x1.onrender.com/api/transactions', transactionData)
      navigate('/')
    } catch (err) {
      setError('Failed to add transaction')
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Add New Transaction</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <TransactionForm 
        onSubmit={handleSubmit} 
        loading={loading}
        buttonText="Add Transaction"
      />
    </div>
  )
}

export default AddTransaction
