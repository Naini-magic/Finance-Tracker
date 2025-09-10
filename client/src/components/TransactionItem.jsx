import { Link } from 'react-router-dom'

const TransactionItem = ({ transaction, onDeleted }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50">
      <div className="font-medium">{transaction.title}</div>
      
      <div className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
      </div>
      
      <div>{formatDate(transaction.date)}</div>
      
      <div>{transaction.category}</div>
      
     <div className="flex justify-center space-x-2">
  <Link
    to={`/${transaction._id}/edit`}
    className="bg-blue-500 text-white px-3 py-1 rounded-md shadow hover:bg-blue-600 transition duration-200"
  >
    Edit
  </Link>
  <Link
    to={`/${transaction._id}/delete`}
    className="bg-red-400 text-white px-3 py-1 rounded-md shadow hover:bg-red-500 transition duration-200"
  >
    Delete
  </Link>
</div>

    </div>
  )
}

export default TransactionItem