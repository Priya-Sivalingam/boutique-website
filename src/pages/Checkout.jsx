import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, cartTotal, cartCount, clearCart } = useCart()

  const SHIPPING_THRESHOLD = 75
  const shippingCost = cartTotal >= SHIPPING_THRESHOLD ? 0 : 9.99
  const orderTotal   = cartTotal + shippingCost

  // ── Form State ─────────────────────────────────
  const [form, setForm] = useState({
    firstName:   '',
    lastName:    '',
    email:       '',
    phone:       '',
    address:     '',
    city:        '',
    postalCode:  '',
    country:     'Sri Lanka',
    cardName:    '',
    cardNumber:  '',
    expiry:      '',
    cvv:         '',
  })

  const [errors,     setErrors]     = useState({})
  const [isPlacing,  setIsPlacing]  = useState(false)

  // ── Redirect if cart is empty ──────────────────
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col
        items-center justify-center gap-6">
        <h2 className="font-serif text-3xl text-charcoal">Your bag is empty</h2>
        <button
          onClick={() => navigate('/catalog')}
          className="bg-mauve text-white font-sans text-xs tracking-widest
            uppercase px-10 py-4 hover:bg-rose transition-colors"
        >
          Go Shopping
        </button>
      </div>
    )
  }

  // ── Handle Input Change ────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // ── Validation Algorithm ───────────────────────
  const validate = () => {
    const newErrors = {}

    if (!form.firstName.trim())  newErrors.firstName  = 'Required'
    if (!form.lastName.trim())   newErrors.lastName   = 'Required'
    if (!form.address.trim())    newErrors.address    = 'Required'
    if (!form.city.trim())       newErrors.city       = 'Required'
    if (!form.postalCode.trim()) newErrors.postalCode = 'Required'
    if (!form.cardName.trim())   newErrors.cardName   = 'Required'

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = 'Required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email'
    }

    // Card number — 16 digits
    const cardDigits = form.cardNumber.replace(/\s/g, '')
    if (!cardDigits) {
      newErrors.cardNumber = 'Required'
    } else if (!/^\d{16}$/.test(cardDigits)) {
      newErrors.cardNumber = 'Must be 16 digits'
    }

    // Expiry MM/YY
    if (!form.expiry.trim()) {
      newErrors.expiry = 'Required'
    } else if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
      newErrors.expiry = 'Format: MM/YY'
    }

    // CVV — 3 or 4 digits
    if (!form.cvv.trim()) {
      newErrors.cvv = 'Required'
    } else if (!/^\d{3,4}$/.test(form.cvv)) {
      newErrors.cvv = '3-4 digits'
    }

    return newErrors
  }

  // ── Submit Handler ─────────────────────────────
  const handleSubmit = () => {
    const newErrors = validate()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Simulate placing order
    setIsPlacing(true)
    setTimeout(() => {
      // Build order summary to pass to confirmation page
      const order = {
        id:        `LM-${Date.now()}`,
        items:     cartItems,
        total:     orderTotal,
        shipping:  shippingCost,
        email:     form.email,
        name:      `${form.firstName} ${form.lastName}`,
        address:   `${form.address}, ${form.city}, ${form.postalCode}, ${form.country}`,
      }

      clearCart()
      navigate('/order-confirm', { state: { order } })
    }, 1800) // simulate network delay
  }

  // ── Reusable Input Component ───────────────────
  const Input = ({ label, name, type = 'text', placeholder, half }) => (
    <div className={half ? 'flex-1' : 'w-full'}>
      <label className="font-sans text-xs tracking-widest uppercase
        text-charcoal/60 block mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full border bg-white font-sans text-sm text-charcoal
          px-4 py-3 focus:outline-none transition-colors
          ${errors[name]
            ? 'border-rose focus:border-rose'
            : 'border-charcoal/20 focus:border-mauve'
          }`}
      />
      {errors[name] && (
        <p className="font-sans text-xs text-rose mt-1">{errors[name]}</p>
      )}
    </div>
  )

  return (
    <div className="bg-cream min-h-screen">

      {/* ── Page Header ───────────────────────── */}
      <div className="bg-blush py-14 text-center">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-mauve mb-2">
          Almost There
        </p>
        <h1 className="font-serif text-5xl text-charcoal">Checkout</h1>
        <div className="w-16 h-px bg-mauve mx-auto mt-4" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12
        grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* ════════════════════════════════════
             LEFT — Forms
        ════════════════════════════════════ */}
        <div className="lg:col-span-2 flex flex-col gap-10">

          {/* ── Shipping Information ──────────── */}
          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-6 pb-2
              border-b border-mauve/20">
              Shipping Information
            </h2>

            <div className="flex flex-col gap-4">

              {/* Name Row */}
              <div className="flex gap-4">
                <Input label="First Name" name="firstName"
                  placeholder="Jane" half />
                <Input label="Last Name"  name="lastName"
                  placeholder="Doe"  half />
              </div>

              <Input label="Email Address" name="email"
                type="email" placeholder="jane@example.com" />

              <Input label="Phone (optional)" name="phone"
                type="tel" placeholder="+94 77 123 4567" />

              <Input label="Street Address" name="address"
                placeholder="123 Blossom Lane" />

              <div className="flex gap-4">
                <Input label="City"        name="city"
                  placeholder="Colombo" half />
                <Input label="Postal Code" name="postalCode"
                  placeholder="00100"   half />
              </div>

              {/* Country Select */}
              <div>
                <label className="font-sans text-xs tracking-widest uppercase
                  text-charcoal/60 block mb-1">
                  Country
                </label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full border border-charcoal/20 bg-white
                    font-sans text-sm text-charcoal px-4 py-3
                    focus:outline-none focus:border-mauve transition-colors"
                >
                  {['Sri Lanka', 'India', 'United Kingdom',
                    'United States', 'Australia', 'Canada',
                    'Singapore', 'UAE'].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* ── Payment Information ───────────── */}
          <section>
            <h2 className="font-serif text-2xl text-charcoal mb-2 pb-2
              border-b border-mauve/20">
              Payment
            </h2>
            <p className="font-sans text-xs text-charcoal/40 mb-6">
              🔒 This is a demo — no real payment is processed
            </p>

            <div className="flex flex-col gap-4">

              <Input label="Name on Card" name="cardName"
                placeholder="Jane Doe" />

              <Input label="Card Number" name="cardNumber"
                placeholder="1234 5678 9012 3456" />

              <div className="flex gap-4">
                <Input label="Expiry" name="expiry"
                  placeholder="MM/YY" half />
                <Input label="CVV" name="cvv"
                  placeholder="123" half />
              </div>
            </div>
          </section>

          {/* ── Place Order Button ────────────── */}
          <button
            onClick={handleSubmit}
            disabled={isPlacing}
            className={`w-full py-5 font-sans text-sm tracking-widest uppercase
              transition-all duration-300
              ${isPlacing
                ? 'bg-mauve/60 text-white cursor-wait'
                : 'bg-mauve text-white hover:bg-rose'
              }`}
          >
            {isPlacing ? 'Placing Your Order...' : 'Place Order'}
          </button>
        </div>

        {/* ════════════════════════════════════
             RIGHT — Order Summary
        ════════════════════════════════════ */}
        <div className="lg:col-span-1">
          <div className="bg-blush p-8 sticky top-24">
            <h2 className="font-serif text-2xl text-charcoal mb-6">
              Your Order
            </h2>

            {/* Items List */}
            <div className="flex flex-col gap-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-18 object-cover bg-blush flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <p className="font-serif text-sm text-charcoal leading-snug">
                      {item.name}
                    </p>
                    <p className="font-sans text-xs text-charcoal/50 mt-1">
                      {item.selectedSize} · {item.selectedColor}
                    </p>
                    <p className="font-sans text-xs text-charcoal/50">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-sans text-sm text-charcoal flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-mauve/20 mb-4" />

            {/* Totals */}
            <div className="flex flex-col gap-2 font-sans text-sm text-charcoal/70">
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
              <div className="w-full h-px bg-mauve/20 my-2" />
              <div className="flex justify-between text-charcoal font-medium text-base">
                <span className="font-serif">Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout