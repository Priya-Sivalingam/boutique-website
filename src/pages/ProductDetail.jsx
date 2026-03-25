import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById, products } from '../data/product'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useEffect } from 'react'
import { trackViewItem } from '../utils/analytics'
import { trackAddToCart } from '../utils/analytics'


const ProductDetail = () => {
  const { id } = useParams()                        // grab :id from URL
  const navigate = useNavigate()
  const product = getProductById(id)                // O(n) find algorithm

  // ── Local State ────────────────────────────────
  const [selectedSize,  setSelectedSize]  = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [quantity,      setQuantity]      = useState(1)
  const [added,         setAdded]         = useState(false)
  const [error,         setError]         = useState('')
  const { addToCart } = useCart()

  // Track product view in GA4
useEffect(() => {
  if (product) trackViewItem(product)
}, [product])

  // ── Guard: product not found ───────────────────
  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6">
        <h2 className="font-serif text-3xl text-charcoal">Product not found</h2>
        <Link
          to="/catalog"
          className="font-sans text-xs tracking-widest uppercase
            border border-mauve text-mauve px-8 py-3
            hover:bg-mauve hover:text-white transition-all duration-200"
        >
          Back to Shop
        </Link>
      </div>
    )
  }

  

  // ── Related products (same category, exclude current) ──
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)                                    // max 4 related items

  // ── Add to Cart handler (connects to CartContext in Step 9) ──
  const handleAddToCart = () => {

    trackAddToCart({ ...product, selectedSize, selectedColor }, quantity)
    if (!selectedSize) {
      setError('Please select a size')
      return
    }
    if (!selectedColor) {
      setError('Please select a colour')
      return
    }

    setError('')

    addToCart({ ...product, selectedSize, selectedColor, quantity })

    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="bg-cream min-h-screen">

      {/* ── Breadcrumb ────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <p className="font-sans text-xs text-charcoal/50 tracking-widest uppercase">
          <Link to="/" className="hover:text-mauve transition-colors">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/catalog" className="hover:text-mauve transition-colors">Shop</Link>
          <span className="mx-2">›</span>
          <span className="text-mauve">{product.name}</span>
        </p>
      </div>


      {/* ══════════════════════════════════
           MAIN PRODUCT SECTION
      ══════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 pb-20
        grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* ── Left: Product Image ─────────────────── */}
        <div className="relative overflow-hidden bg-blush aspect-[3/4]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-cream/70 flex items-center justify-center">
              <span className="font-sans text-sm tracking-widest uppercase text-charcoal/60">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* ── Right: Product Info ─────────────────── */}
        <div className="flex flex-col gap-6 pt-4">

          {/* Category + Name */}
          <div>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-mauve mb-2">
              {product.category}
            </p>
            <h1 className="font-serif text-4xl text-charcoal leading-snug">
              {product.name}
            </h1>
          </div>

          {/* Price */}
          <p className="font-sans text-2xl text-charcoal/80">
            ${product.price.toFixed(2)}
          </p>

          {/* Description */}
          <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
            {product.description}
          </p>

          <div className="w-full h-px bg-mauve/20" />

          {/* ── Colour Selector ──────────────────── */}
          <div>
            <p className="font-sans text-xs tracking-widest uppercase text-charcoal mb-3">
              Colour
              {selectedColor && (
                <span className="text-mauve ml-2 normal-case tracking-normal">
                  — {selectedColor}
                </span>
              )}
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`font-sans text-xs px-4 py-2 border transition-all duration-200
                    ${selectedColor === color
                      ? 'bg-mauve text-white border-mauve'
                      : 'bg-transparent text-charcoal border-charcoal/30 hover:border-mauve hover:text-mauve'
                    }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* ── Size Selector ────────────────────── */}
          <div>
            <p className="font-sans text-xs tracking-widest uppercase text-charcoal mb-3">
              Size
              {selectedSize && (
                <span className="text-mauve ml-2 normal-case tracking-normal">
                  — {selectedSize}
                </span>
              )}
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`font-sans text-xs w-12 h-12 border transition-all duration-200
                    ${selectedSize === size
                      ? 'bg-mauve text-white border-mauve'
                      : 'bg-transparent text-charcoal border-charcoal/30 hover:border-mauve hover:text-mauve'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ── Quantity Selector ────────────────── */}
          <div>
            <p className="font-sans text-xs tracking-widest uppercase text-charcoal mb-3">
              Quantity
            </p>
            <div className="flex items-center border border-charcoal/30 w-fit">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 py-3 text-charcoal hover:text-mauve
                  transition-colors font-sans text-lg leading-none"
              >
                −
              </button>
              <span className="px-6 py-3 font-sans text-sm text-charcoal
                border-x border-charcoal/30">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-4 py-3 text-charcoal hover:text-mauve
                  transition-colors font-sans text-lg leading-none"
              >
                +
              </button>
            </div>
          </div>

          {/* ── Error Message ────────────────────── */}
          {error && (
            <p className="font-sans text-xs text-rose tracking-wide">
              ⚠ {error}
            </p>
          )}

          {/* ── Add to Cart Button ───────────────── */}
          {product.inStock ? (
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 font-sans text-sm tracking-widest uppercase
                transition-all duration-300
                ${added
                  ? 'bg-green-400 text-white'
                  : 'bg-mauve text-white hover:bg-rose'
                }`}
            >
              {added ? '✓ Added to Bag' : 'Add to Bag'}
            </button>
          ) : (
            <button
              disabled
              className="w-full py-4 font-sans text-sm tracking-widest uppercase
                bg-charcoal/20 text-charcoal/40 cursor-not-allowed"
            >
              Sold Out
            </button>
          )}

          {/* ── Continue Shopping ────────────────── */}
          <button
            onClick={() => navigate('/catalog')}
            className="font-sans text-xs tracking-widest uppercase text-charcoal/50
              hover:text-mauve transition-colors text-center"
          >
            ← Continue Shopping
          </button>

          {/* ── Product Details ──────────────────── */}
          <div className="border-t border-mauve/20 pt-6 flex flex-col gap-2">
            <p className="font-sans text-xs text-charcoal/50">
              🎀 Free shipping on orders over $75
            </p>
            <p className="font-sans text-xs text-charcoal/50">
              ↩ Free returns within 30 days
            </p>
            <p className="font-sans text-xs text-charcoal/50">
              ✦ Ethically & sustainably made
            </p>
          </div>

        </div>
      </div>


      {/* ══════════════════════════════════
           RELATED PRODUCTS
      ══════════════════════════════════ */}
      {related.length > 0 && (
        <section className="bg-blush py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-mauve mb-2">
                You May Also Love
              </p>
              <h2 className="font-serif text-3xl text-charcoal">Related Pieces</h2>
              <div className="w-12 h-px bg-mauve mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}

export default ProductDetail