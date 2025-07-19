import React, { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('e-mart-cart')
    return stored ? JSON.parse(stored) : []
  })

  const [orders, setOrders] = useState(() => {
    const stored = localStorage.getItem('e-mart-orders')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('e-mart-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('e-mart-orders', JSON.stringify(orders))
  }, [orders])

  const addToCart = (product) => {
    const index = cart.findIndex((item) => item.id === product.id)
    if (index !== -1) {
      const updated = [...cart]
      updated[index].qty += 1
      setCart(updated)
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const increaseQty = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item))
  }

  const decreaseQty = (id) => {
    setCart(cart.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item))
  }

  const clearCart = () => setCart([])

  const checkout = () => {
    setOrders([...orders, { date: new Date().toLocaleString(), items: cart }])
    clearCart()
  }

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, increaseQty, decreaseQty,
      clearCart, checkout, orders
    }}>
      {children}
    </CartContext.Provider>
  )
}