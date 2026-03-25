import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import { trackPageView } from './utils/analytics'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirm from './pages/OrderConfirm'
import About from './pages/About'

// ── Page tracker component ─────────────────────
const PageTracker = () => {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname, document.title)
  }, [location])  // fires every time URL changes

  return null  // renders nothing, just tracks
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="flex flex-col min-h-screen bg-cream">

          <PageTracker />  {/* ← invisible tracker */}
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/"              element={<Home />} />
              <Route path="/catalog"       element={<Catalog />} />
              <Route path="/product/:id"   element={<ProductDetail />} />
              <Route path="/cart"          element={<Cart />} />
              <Route path="/checkout"      element={<Checkout />} />
              <Route path="/order-confirm" element={<OrderConfirm />} />
              <Route path="/about"         element={<About />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App