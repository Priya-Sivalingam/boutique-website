import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { trackPurchase } from '../utils/analytics'

const OrderConfirm = () => {
  const { state } = useLocation()
  const order = state?.order

  useEffect(() => {
  if (order) trackPurchase(order)
}, [])

  // Guard — if someone navigates here directly without an order
  if (!order) {
    return (
      <div className="min-h-screen bg-cream flex flex-col
        items-center justify-center gap-6">
        <h2 className="font-serif text-3xl text-charcoal">No order found</h2>
        <Link
          to="/"
          className="bg-mauve text-white font-sans text-xs tracking-widest
            uppercase px-10 py-4 hover:bg-rose transition-colors"
        >
          Go Home
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-screen">

      {/* ── Success Banner ─────────────────────── */}
      <div className="bg-blush py-20 text-center px-6">

        {/* Animated checkmark */}
        <div className="w-20 h-20 rounded-full bg-mauve/20 flex items-center
          justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-mauve" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
              strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <p className="font-sans text-xs tracking-[0.3em] uppercase text-mauve mb-3">
          Order Confirmed
        </p>
        <h1 className="font-serif text-5xl text-charcoal mb-4">
          Thank You, {order.name.split(' ')[0]}!
        </h1>
        <p className="font-sans text-sm text-charcoal/60 max-w-md mx-auto">
          Your order <span className="text-mauve font-medium">{order.id}</span> has
          been placed. A confirmation will be sent to{' '}
          <span className="text-mauve">{order.email}</span>
        </p>
        <div className="w-16 h-px bg-mauve mx-auto mt-6" />
      </div>

      {/* ── Order Details ──────────────────────── */}
      <div className="max-w-2xl mx-auto px-6 py-14">

        {/* Order Summary Card */}
        <div className="bg-blush p-8 mb-8">
          <h2 className="font-serif text-2xl text-charcoal mb-6">
            Order Summary
          </h2>

          {/* Items */}
          <div className="flex flex-col gap-4 mb-6">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 object-cover bg-white flex-shrink-0"
                />
                <div className="flex-grow">
                  <p className="font-serif text-sm text-charcoal">{item.name}</p>
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
              <span>Shipping</span>
              <span className={order.shipping === 0 ? 'text-green-500' : ''}>
                {order.shipping === 0 ? 'Free ✓' : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-charcoal font-medium text-base mt-1">
              <span className="font-serif">Total Paid</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-white border border-mauve/20 p-6 mb-8">
          <h3 className="font-serif text-lg text-charcoal mb-3">
            Delivery Address
          </h3>
          <p className="font-sans text-sm text-charcoal/60">{order.address}</p>
          <p className="font-sans text-xs text-charcoal/40 mt-3">
            📦 Estimated delivery: 3–5 business days
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 text-center bg-mauve text-white font-sans
              text-xs tracking-widest uppercase py-4
              hover:bg-rose transition-colors duration-300"
          >
            Back to Home
          </Link>
          <Link
            to="/catalog"
            className="flex-1 text-center border border-mauve text-mauve
              font-sans text-xs tracking-widest uppercase py-4
              hover:bg-mauve hover:text-white transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  )
}

export default OrderConfirm
