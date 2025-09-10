const Transaction = require('../models/Transaction');

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { title, amount, type, date, category } = req.body;
    const transaction = new Transaction({ title, amount, type, date, category });
    const createdTransaction = await transaction.save();
    res.status(201).json(createdTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { title, amount, type, date, category } = req.body;
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    transaction.title = title || transaction.title;
    transaction.amount = amount || transaction.amount;
    transaction.type = type || transaction.type;
    transaction.date = date || transaction.date;
    transaction.category = category || transaction.category;
    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    await Transaction.deleteOne({ _id: req.params.id });
    res.json({ message: 'Transaction removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTransactions, getTransaction, createTransaction, updateTransaction, deleteTransaction };