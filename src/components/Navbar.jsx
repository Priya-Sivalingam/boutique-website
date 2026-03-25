import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { cartCount } = useCart()          // ← real cart count now

  const isActive = (path) =>
    location.pathname === path
      ? 'text-mauve font-semibold border-b-2 border-mauve'
      : 'text-charcoal hover:text-mauve transition-colors duration-200'

  return (
    <nav className="bg-blush shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="font-serif text-2xl text-mauve tracking-wide">
          ✨ Lumière
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/"        className={isActive('/')}>Home</Link>
          <Link to="/catalog" className={isActive('/catalog')}>Shop</Link>
          <Link to="/about"   className={isActive('/about')}>About</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative text-charcoal hover:text-mauve transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-mauve text-white
                text-xs rounded-full h-5 w-5 flex items-center justify-center font-sans">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden text-charcoal hover:text-mauve transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-blush border-t border-rose/20 px-6 pb-4 flex flex-col gap-4">
          <Link to="/"        onClick={() => setMenuOpen(false)} className={`pt-3 ${isActive('/')}`}>Home</Link>
          <Link to="/catalog" onClick={() => setMenuOpen(false)} className={isActive('/catalog')}>Shop</Link>
          <Link to="/about"   onClick={() => setMenuOpen(false)} className={isActive('/about')}>About</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar