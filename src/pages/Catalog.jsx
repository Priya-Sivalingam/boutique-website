import { useState, useMemo } from 'react'
import {
  products,
  getCategories,
  filterByCategory,
  sortProducts
} from '../data/product'
import ProductCard from '../components/ProductCard'

const Catalog = () => {

  // ── State ──────────────────────────────
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSort, setSelectedSort]         = useState('default')

  const categories = getCategories() // ['All', 'Dresses', 'Tops', ...]

  // ── Algorithm: filter then sort ────────
  // useMemo → only recalculates when category or sort changes (performance)
  const displayedProducts = useMemo(() => {
    const filtered = filterByCategory(selectedCategory)  // O(n) filter
    return sortProducts(filtered, selectedSort)           // O(n log n) sort
  }, [selectedCategory, selectedSort])

  return (
    <div className="bg-cream min-h-screen">

      {/* ══════════════════════════════════
           PAGE HEADER
      ══════════════════════════════════ */}
      <div className="bg-blush py-14 text-center">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-mauve mb-2">
          Our Collection
        </p>
        <h1 className="font-serif text-5xl text-charcoal">The Shop</h1>
        <div className="w-16 h-px bg-mauve mx-auto mt-4" />
      </div>


      {/* ══════════════════════════════════
           FILTERS + SORT BAR
      ══════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 py-8
        flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-sans text-xs tracking-widest uppercase px-4 py-2
                border transition-all duration-200
                ${selectedCategory === cat
                  ? 'bg-mauve text-white border-mauve'        // active
                  : 'bg-transparent text-charcoal border-charcoal/30 hover:border-mauve hover:text-mauve'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="font-sans text-xs tracking-widest uppercase
            border border-charcoal/30 bg-cream text-charcoal
            px-4 py-2 focus:outline-none focus:border-mauve
            hover:border-mauve transition-colors cursor-pointer"
        >
          <option value="default">Sort: Default</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="name">Name: A → Z</option>
        </select>
      </div>


      {/* ══════════════════════════════════
           RESULTS COUNT
      ══════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 pb-4">
        <p className="font-sans text-xs text-charcoal/50">
          Showing {displayedProducts.length} piece{displayedProducts.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
        </p>
      </div>


      {/* ══════════════════════════════════
           PRODUCT GRID
      ══════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-charcoal/40">
              No pieces found
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-6 font-sans text-xs tracking-widest uppercase
                text-mauve border border-mauve px-8 py-3
                hover:bg-mauve hover:text-white transition-all duration-200"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

export default Catalog
