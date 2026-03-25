import { createContext, useContext, useReducer, useMemo } from 'react'
import PropTypes from 'prop-types'

// ── 1. Create the Context ──────────────────────────
export const CartContext = createContext()

// ── 2. Reducer — all cart logic lives here ─────────
// A reducer is a pure function: (currentState, action) → newState
const cartReducer = (state, action) => {
  switch (action.type) {

    case 'ADD_ITEM': {
      const existingIndex = state.findIndex(
        item =>
          item.id           === action.payload.id &&
          item.selectedSize  === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      )

      // If exact match (same id + size + color) → increase quantity
      if (existingIndex >= 0) {
        return state.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      }

      // Otherwise → add as new item
      return [...state, action.payload]
    }

    case 'REMOVE_ITEM': {
      return state.filter((_, index) => index !== action.payload)
    }

    case 'UPDATE_QUANTITY': {
      const { index, quantity } = action.payload
      if (quantity <= 0) {
        // Remove item if quantity drops to 0
        return state.filter((_, i) => i !== index)
      }
      return state.map((item, i) =>
        i === index ? { ...item, quantity } : item
      )
    }

    case 'CLEAR_CART': {
      return []
    }

    default:
      return state
  }
}

// ── 3. Provider — wraps the app, shares state ──────
export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [])

  // ── Action creators (clean API for components) ───
  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  const removeFromCart = (index) => {
    dispatch({ type: 'REMOVE_ITEM', payload: index })
  }

  const updateQuantity = (index, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  // ── Derived values (algorithms) ──────────────────
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  ) // O(n) accumulator

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  ) // O(n) accumulator

  // ── Share everything via context value ───────────
  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// ── 4. Custom hook — clean way to use cart ─────────
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }
  return context
}