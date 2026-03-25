import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { trackBeginCheckout } from '../utils/analytics'
  import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, cartTotal, cartCount,
          removeFromCart, updateQuantity, clearCart } = useCart()

  // Free shipping threshold
  const SHIPPING_THRESHOLD = 75
  const shippingCost = cartTotal >= SHIPPING_THRESHOLD ? 0 : 9.99
  const orderTotal   = cartTotal + shippingCost


// inside Cart component:
const navigate = useNavigate()

const handleCheckout = () => {
  trackBeginCheckout(cartItems, cartTotal)
  navigate('/checkout')
}

// Replace the Proceed to Checkout Link with:
<button
  onClick={handleCheckout}
  className="block w-full text-center bg-mauve text-white
    font-sans text-xs tracking-widest uppercase py-4 mt-8
    hover:bg-rose transition-colors duration-300"
>
  Proceed to Checkout
</button>

  // ── Empty Cart State ───────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6 px-6">

        {/* Bag icon */}
        <svg xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-mauve/30" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>

        <div className="text-center">
          <h2 className="font-serif text-3xl text-charcoal mb-2">Your bag is empty</h2>
          <p className="font-sans text-sm text-charcoal/50">
            Looks like you haven't added anything yet.
          </p>
        </div>

        <Link
          to="/catalog"
          className="bg-mauve text-white font-sans text-xs tracking-widest
            uppercase px-10 py-4 hover:bg-rose transition-colors duration-300"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-screen">

      {/* ── Page Header ───────────────────────────── */}
      <div className="bg-blush py-14 text-center">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-mauve mb-2">
          Review
        </p>
        <h1 className="font-serif text-5xl text-charcoal">Your Bag</h1>
        <p className="font-sans text-sm text-charcoal/50 mt-2">
          {cartCount} item{cartCount !== 1 ? 's' : ''}
        </p>
        <div className="w-16 h-px bg-mauve mx-auto mt-4" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12
        grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* ══════════════════════════════════
             LEFT — Cart Items List
        ══════════════════════════════════ */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Clear All Button */}
          <div className="flex justify-end">
            <button
              onClick={clearCart}
              className="font-sans text-xs tracking-widest uppercase
                text-charcoal/40 hover:text-rose transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Cart Item Cards */}
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex gap-5 bg-white p-4 shadow-sm"
            >
              {/* Product Image */}
              <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-32 object-cover bg-blush"
                />
              </Link>

              {/* Item Details */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  {/* Name + Remove */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-sans text-xs text-mauve tracking-widest
                        uppercase mb-1">
                        {item.category}
                      </p>
                      <h3 className="font-serif text-lg text-charcoal">
                        {item.name}
                      </h3>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-charcoal/30 hover:text-rose transition-colors flex-shrink-0"
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Size + Color */}
                  <div className="flex gap-3 mt-2">
                    <span className="font-sans text-xs text-charcoal/50
                      border border-charcoal/20 px-2 py-1">
                      {item.selectedSize}
                    </span>
                    <span className="font-sans text-xs text-charcoal/50
                      border border-charcoal/20 px-2 py-1">
                      {item.selectedColor}
                    </span>
                  </div>
                </div>

                {/* Quantity + Price */}
                <div className="flex items-center justify-between mt-4">

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-charcoal/20">
                    <button
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className="px-3 py-2 text-charcoal hover:text-mauve
                        transition-colors font-sans leading-none"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 font-sans text-sm text-charcoal
                      border-x border-charcoal/20">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="px-3 py-2 text-charcoal hover:text-mauve
                        transition-colors font-sans leading-none"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <p className="font-sans text-sm text-charcoal font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <Link
            to="/catalog"
            className="font-sans text-xs tracking-widest uppercase
              text-charcoal/40 hover:text-mauve transition-colors self-start"
          >
            ← Continue Shopping
          </Link>
        </div>


        {/* ══════════════════════════════════
             RIGHT — Order Summary
        ══════════════════════════════════ */}
        <div className="lg:col-span-1">
          <div className="bg-blush p-8 sticky top-24">

            <h2 className="font-serif text-2xl text-charcoal mb-6">
              Order Summary
            </h2>

            {/* Line Items */}
            <div className="flex flex-col gap-3 font-sans text-sm text-charcoal/70">

              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shippingCost === 0 ? 'text-green-500' : ''}>
                  {shippingCost === 0 ? 'Free ✓' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              {/* Free shipping progress */}
              {shippingCost > 0 && (
                <div className="mt-1">
                  <p className="text-xs text-charcoal/50 mb-2">
                    Add ${(SHIPPING_THRESHOLD - cartTotal).toFixed(2)} more for free shipping
                  </p>
                  {/* Progress Bar — algorithm: (current/threshold) * 100 */}
                  <div className="w-full bg-white h-1.5">
                    <div
                      className="bg-mauve h-1.5 transition-all duration-500"
                      style={{
                        width: `${Math.min((cartTotal / SHIPPING_THRESHOLD) * 100, 100)}%`
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="w-full h-px bg-mauve/20 my-2" />

              {/* Order Total */}
              <div className="flex justify-between text-charcoal font-medium text-base">
                <span className="font-serif">Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              className="block w-full text-center bg-mauve text-white
                font-sans text-xs tracking-widest uppercase py-4 mt-8
                hover:bg-rose transition-colors duration-300"
            >
              Proceed to Checkout
            </Link>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-col gap-2">
              <p className="font-sans text-xs text-charcoal/40 text-center">
                🔒 Secure checkout
              </p>
              <p className="font-sans text-xs text-charcoal/40 text-center">
                ↩ Free 30-day returns
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart