import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddTransaction from './pages/AddTransaction'
import EditTransaction from './pages/EditTransaction'
import DeleteTransaction from './pages/DeleteTransaction'


function App() {
  
  return (
     <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 animate-gradient-x">

        <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 text-white shadow-md">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>
          </div>
        </header>
        
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/add" element={<AddTransaction/>} />
            <Route path="/:id/edit" element={<EditTransaction />} />
            <Route path="/:id/delete" element={<DeleteTransaction />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
