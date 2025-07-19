import React, { useState } from 'react'
import { useCart } from '../context/CartContext'

const products = [
  { id: 1, name: 'Laptop', price: 75000, image: 'https://via.placeholder.com/200x150?text=Laptop' },
  { id: 2, name: 'Smartphone', price: 25000, image: 'https://via.placeholder.com/200x150?text=Smartphone' },
  { id: 3, name: 'Headphones', price: 3000, image: 'https://via.placeholder.com/200x150?text=Headphones' },
  { id: 4, name: 'Keyboard', price: 1500, image: 'https://via.placeholder.com/200x150?text=Keyboard' },
  { id: 5, name: 'Mouse', price: 800, image: 'https://via.placeholder.com/200x150?text=Mouse' },
  { id: 6, name: 'Samsung S24', price: 800, image: 'https://via.placeholder.com/200x150?text=Samsung S24' },
]

export default function ProductList() {
  const { addToCart } = useCart()
  const [search, setSearch] = useState("")

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Products</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 w-full border rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="p-4 border rounded shadow bg-white">
            <img src={product.image} alt={product.name} className="mb-2 rounded" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="mb-2">₹{product.price}</p>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
        {filteredProducts.length === 0 && <p className="text-gray-500 col-span-3">No products found.</p>}
      </div>
    </div>
  )
}