import React, { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, checkout, orders } = useCart()
  const [showMessage, setShowMessage] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleCheckout = () => {
    checkout()
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 3000)
  }

  return (
    <div className="p-4 bg-gray-100 rounded mt-6 shadow">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <div>
                {item.name} <br />
                <span className="text-sm text-gray-600">₹{item.price} × {item.qty}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-2 bg-gray-200 rounded" onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.qty}</span>
                <button className="px-2 bg-gray-200 rounded" onClick={() => increaseQty(item.id)}>+</button>
                <button className="text-red-500 ml-2" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-lg font-semibold">Total: ₹{total}</div>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Checkout
          </button>
        </>
      )}
      {showMessage && <p className="mt-4 text-green-600 font-semibold">✅ Order placed successfully!</p>}

      {orders.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Order History</h3>
          {orders.map((order, i) => (
            <div key={i} className="bg-white p-2 rounded mb-2 shadow">
              <p className="text-sm text-gray-700">📅 {order.date}</p>
              <ul className="ml-4 list-disc">
                {order.items.map((item, j) => (
                  <li key={j}>{item.name} × {item.qty}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}