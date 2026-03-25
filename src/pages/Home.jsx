import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../data/product'

const Home = () => {
  const featured = getFeaturedProducts()

  return (
    <div className="bg-cream">

      {/* ══════════════════════════════════
           HERO SECTION
      ══════════════════════════════════ */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&auto=format"
          alt="Boutique hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Soft overlay so text is readable */}
        <div className="absolute inset-0 bg-blush/50" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">

          {/* Eyebrow label */}
          <p className="font-sans text-sm tracking-[0.3em] uppercase text-mauve mb-4">
            New Collection 2025
          </p>

          {/* Main heading */}
          <h1 className="font-serif text-5xl md:text-7xl text-charcoal leading-tight mb-6">
            Dress in
            <span className="text-mauve italic"> Softness</span>
          </h1>

          {/* Subtext */}
          <p className="font-sans text-base md:text-lg text-charcoal/70 mb-10 leading-relaxed">
            Curated fashion for the feminine soul — delicate fabrics,
            timeless silhouettes, and effortless elegance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/catalog"
              className="bg-mauve text-white font-sans text-sm tracking-widest
                uppercase px-10 py-4 hover:bg-rose transition-colors duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="border border-mauve text-mauve font-sans text-sm
                tracking-widest uppercase px-10 py-4 hover:bg-blush transition-colors duration-300"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <p className="font-sans text-xs tracking-widest text-charcoal/50 uppercase">Scroll</p>
          <div className="w-px h-10 bg-mauve/40 animate-pulse" />
        </div>
      </section>


      {/* ══════════════════════════════════
           MARQUEE STRIP
      ══════════════════════════════════ */}
      <div className="bg-mauve py-3 overflow-hidden">
        <p className="font-sans text-xs text-white tracking-[0.25em] uppercase whitespace-nowrap
          animate-marquee inline-block">
          Free shipping on orders over $75 &nbsp;✦&nbsp;
          New arrivals every Friday &nbsp;✦&nbsp;
          Sustainable & ethically made &nbsp;✦&nbsp;
          Free returns within 30 days &nbsp;✦&nbsp;
          Free shipping on orders over $75 &nbsp;✦&nbsp;
          New arrivals every Friday &nbsp;✦&nbsp;
        </p>
      </div>


      {/* ══════════════════════════════════
           FEATURED PRODUCTS STRIP
      ══════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-mauve mb-2">
            Hand Picked
          </p>
          <h2 className="font-serif text-4xl text-charcoal">
            Featured Pieces
          </h2>
          <div className="w-16 h-px bg-mauve mx-auto mt-4" />
        </div>

        {/* Product Grid — uses getFeaturedProducts() algorithm */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group cursor-pointer"
            >
              {/* Product Image */}
              <div className="overflow-hidden bg-blush aspect-[3/4] mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105
                    transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="text-center">
                <p className="font-sans text-xs text-mauve tracking-widest
                  uppercase mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif text-lg text-charcoal group-hover:text-mauve
                  transition-colors">
                  {product.name}
                </h3>
                <p className="font-sans text-sm text-charcoal/60 mt-1">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-14">
          <Link
            to="/catalog"
            className="border border-mauve text-mauve font-sans text-sm
              tracking-widest uppercase px-12 py-4 hover:bg-mauve hover:text-white
              transition-all duration-300"
          >
            View All Pieces
          </Link>
        </div>
      </section>


      {/* ══════════════════════════════════
           BRAND VALUES STRIP
      ══════════════════════════════════ */}
      <section className="bg-blush py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

          {[
            { icon: '🌸', title: 'Ethically Made', desc: 'Every piece is crafted with care for people and planet.' },
            { icon: '✨', title: 'Timeless Design', desc: 'Silhouettes that transcend seasons and trends.' },
            { icon: '🎀', title: 'Free Returns', desc: '30-day hassle-free returns — always.' },
          ].map((val, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <span className="text-4xl">{val.icon}</span>
              <h3 className="font-serif text-xl text-charcoal">{val.title}</h3>
              <p className="font-sans text-sm text-charcoal/60 leading-relaxed max-w-xs">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Home