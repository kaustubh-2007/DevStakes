import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Chat from './pages/Chat'
import Login from './pages/Login'
import AIChatbot from './components/AIChatbot'

function App() {
  const [cart, setCart] = useState([])
  const [orders, setOrders] = useState([])
  const [farmerProducts, setFarmerProducts] = useState([])
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('farm2city-theme')
    if (storedTheme === 'dark' || storedTheme === 'light') {
      setTheme(storedTheme)
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark')
    window.localStorage.setItem('farm2city-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const placeOrder = (cartItems) => {
    if (!cartItems.length) return

    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      total: cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) * 1.05,
      status: 'Processing',
      items: cartItems.reduce((acc, item) => acc + item.quantity, 0),
      delivery: 'Expected in 3-5 days',
      cart: cartItems.map(item => ({ name: item.name, qty: item.quantity, price: item.price }))
    }

    setOrders(prev => [newOrder, ...prev])
    setCart([])
    return newOrder
  }

  const addProduct = (productData) => {
    const newProduct = {
      id: `FP-${Date.now()}`,
      ...productData,
      farmer: user?.name || 'Your Farm',
      rating: 4.5,
      unit: 'kg'
    }
    setFarmerProducts(prev => [newProduct, ...prev])
    return newProduct
  }

  return (
    <div className="app-container">
      <Navbar
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        user={user}
        setUser={setUser}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/marketplace" element={<Marketplace addToCart={addToCart} user={user} farmerProducts={farmerProducts} />} />
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} setCart={setCart} placeOrder={placeOrder} />} />
          <Route path="/profile" element={user ? <Profile user={user} orders={orders} /> : <Navigate to="/login" />} />
          <Route path="/orders" element={user ? <Orders user={user} orders={orders} /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={user && user.role === 'farmer' ? <Dashboard farmerProducts={farmerProducts} addProduct={addProduct} /> : <Navigate to="/login" />} />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      <AIChatbot />
    </div>
  )
}

export default App
