import TransactionItem from './TransactionItem'

const TransactionList = ({ transactions, onTransactionDeleted }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-gradient-to-r from-purple-100 via-blue-100 to-purple-100 p-8 rounded-xl shadow-lg text-center mt-6">
        <p className="text-gray-700 text-lg font-medium">
          No transactions yet. Add your first transaction!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-6">
      {/* Header */}
      <div className="grid grid-cols-5 gap-4 p-4 bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200 text-gray-800 font-semibold uppercase tracking-wider">
        <div className="text-left">Title</div>
        <div className="text-left">Amount</div>
        <div className="text-left">Date</div>
        <div className="text-left">Category</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Transaction Items */}
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction._id}
          transaction={transaction}
          onDeleted={onTransactionDeleted}
        />
      ))}
    </div>
  )
}

export default TransactionList
