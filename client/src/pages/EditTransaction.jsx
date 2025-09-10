import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TransactionForm from '../components/TransactionForm'
import axios from 'axios'

const EditTransaction = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
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

  const handleSubmit = async (transactionData) => {
    setSubmitting(true)
    setError('')
    
    try {
      await axios.put(`https://finance-tracker-y6x1.onrender.com/api/transactions/${id}`, transactionData)
      navigate('/')
    } catch (err) {
      setError('Failed to update transaction')
      setSubmitting(false)
    }
  }

  if (loading) return <div className="text-center mt-8">Loading...</div>
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Edit Transaction</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <TransactionForm 
        onSubmit={handleSubmit} 
        loading={submitting}
        initialData={transaction}
        buttonText="Update Transaction"
      />
    </div>
  )
}

export default EditTransaction
