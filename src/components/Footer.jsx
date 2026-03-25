import { Link } from 'react-router-dom'
import { useState } from 'react'

const Footer = () => {
  const [email, setEmail]     = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-charcoal text-white/70">

      {/* ── Main Footer Grid ──────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-16
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-2xl text-white">✨ Lumière</h3>
          <p className="font-sans text-xs leading-relaxed text-white/50">
            Soft fashion for the feminine soul. Ethically made,
            thoughtfully designed.
          </p>
          {/* Socials */}
          <div className="flex gap-4 mt-2">
            {['Instagram', 'Pinterest', 'TikTok'].map(s => (
              <span
                key={s}
                className="font-sans text-xs text-white/40
                  hover:text-mauve transition-colors cursor-pointer"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Shop Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-sans text-xs tracking-widest uppercase
            text-white mb-2">
            Shop
          </h4>
          {[
            { label: 'All Pieces',  to: '/catalog' },
            { label: 'Dresses',     to: '/catalog' },
            { label: 'Tops',        to: '/catalog' },
            { label: 'Skirts',      to: '/catalog' },
            { label: 'Sets',        to: '/catalog' },
          ].map(link => (
            <Link
              key={link.label}
              to={link.to}
              className="font-sans text-xs text-white/50
                hover:text-mauve transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Info Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-sans text-xs tracking-widest uppercase
            text-white mb-2">
            Info
          </h4>
          {[
            { label: 'Our Story',       to: '/about' },
            { label: 'Sustainability',  to: '/about' },
            { label: 'Size Guide',      to: '/catalog' },
            { label: 'Returns Policy',  to: '/about' },
            { label: 'Contact Us',      to: '/about' },
          ].map(link => (
            <Link
              key={link.label}
              to={link.to}
              className="font-sans text-xs text-white/50
                hover:text-mauve transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-xs tracking-widest uppercase
            text-white mb-2">
            Stay in the Loop
          </h4>
          <p className="font-sans text-xs text-white/50 leading-relaxed">
            New arrivals, exclusive offers, and soft style inspo —
            delivered to your inbox.
          </p>

          {subscribed ? (
            <p className="font-sans text-xs text-mauve">
              🎀 Thank you for subscribing!
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-white/10 border border-white/20 text-white
                  font-sans text-xs px-4 py-3 placeholder:text-white/30
                  focus:outline-none focus:border-mauve transition-colors"
              />
              <button
                onClick={handleSubscribe}
                className="bg-mauve text-white font-sans text-xs
                  tracking-widest uppercase py-3
                  hover:bg-rose transition-colors duration-300"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom Bar ────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6
          flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-white/30">
            © 2025 Lumière Boutique. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <span
                key={item}
                className="font-sans text-xs text-white/30
                  hover:text-mauve transition-colors cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer