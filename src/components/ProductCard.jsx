import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-blush aspect-[3/4] mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105
            transition-transform duration-500"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-cream/70 flex items-center justify-center">
            <span className="font-sans text-xs tracking-widest uppercase text-charcoal/60">
              Sold Out
            </span>
          </div>
        )}
        {product.featured && product.inStock && (
          <span className="absolute top-3 left-3 bg-mauve text-white
            font-sans text-xs tracking-widest uppercase px-3 py-1">
            Featured
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="text-center px-2">
        <p className="font-sans text-xs text-mauve tracking-widest uppercase mb-1">
          {product.category}
        </p>
        <h3 className="font-serif text-lg text-charcoal group-hover:text-mauve
          transition-colors duration-200">
          {product.name}
        </h3>
        <p className="font-sans text-xs text-charcoal/50 mt-1">
          {product.colors.join(' · ')}
        </p>
        <p className="font-sans text-sm text-charcoal/70 mt-2 font-medium">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  )
}

// ── PropTypes validation ──────────────────
ProductCard.propTypes = {
  product: PropTypes.shape({
    id:       PropTypes.number.isRequired,
    name:     PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price:    PropTypes.number.isRequired,
    image:    PropTypes.string.isRequired,
    colors:   PropTypes.arrayOf(PropTypes.string).isRequired,
    inStock:  PropTypes.bool.isRequired,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
}

export default ProductCard