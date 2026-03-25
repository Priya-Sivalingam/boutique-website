// ── GA4 Event Tracking Helpers ─────────────────────────────
// Wraps window.gtag safely — won't crash if GA4 hasn't loaded

const gtag = (...args) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args)
  }
}

// ── Page View ──────────────────────────────────────────────
// Call on every route change
export const trackPageView = (pagePath, pageTitle) => {
  gtag('event', 'page_view', {
    page_path:  pagePath,
    page_title: pageTitle,
  })
}

// ── Product Viewed ─────────────────────────────────────────
// Call on ProductDetail page load
export const trackViewItem = (product) => {
  gtag('event', 'view_item', {
    currency: 'USD',
    value:    product.price,
    items: [{
      item_id:       product.id,
      item_name:     product.name,
      item_category: product.category,
      price:         product.price,
    }],
  })
}

// ── Add to Cart ────────────────────────────────────────────
// Call when user clicks Add to Bag
export const trackAddToCart = (product, quantity = 1) => {
  gtag('event', 'add_to_cart', {
    currency: 'USD',
    value:    product.price * quantity,
    items: [{
      item_id:       product.id,
      item_name:     product.name,
      item_category: product.category,
      price:         product.price,
      quantity,
    }],
  })
}

// ── Begin Checkout ─────────────────────────────────────────
// Call when user clicks Proceed to Checkout
export const trackBeginCheckout = (cartItems, cartTotal) => {
  gtag('event', 'begin_checkout', {
    currency: 'USD',
    value:    cartTotal,
    items: cartItems.map(item => ({
      item_id:       item.id,
      item_name:     item.name,
      item_category: item.category,
      price:         item.price,
      quantity:      item.quantity,
    })),
  })
}

// ── Purchase ───────────────────────────────────────────────
// Call on Order Confirmation page
export const trackPurchase = (order) => {
  gtag('event', 'purchase', {
    transaction_id: order.id,
    currency:       'USD',
    value:          order.total,
    shipping:       order.shipping,
    items: order.items.map(item => ({
      item_id:       item.id,
      item_name:     item.name,
      item_category: item.category,
      price:         item.price,
      quantity:      item.quantity,
    })),
  })
}