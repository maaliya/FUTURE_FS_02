import React from 'react'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import { CartProvider } from './context/CartContext'

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-blue-50">
        <header className="bg-blue-800 text-white p-4 shadow-md flex items-center gap-3">
          <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold">E-Mart 🛒</h1>
        </header>
        <main className="max-w-5xl mx-auto p-4">
          <ProductList />
          <Cart />
        </main>
      </div>
    </CartProvider>
  )
}