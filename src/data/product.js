export const products = [
  {
    id: 1,
    name: "Rosette Wrap Dress",
    category: "Dresses",
    price: 89.99,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blush", "Cream"],
    description:
      "A dreamy wrap dress with delicate rosette details. Perfect for brunches, garden parties, or date nights.",
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500&auto=format",
    featured: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Lavender Cloud Blouse",
    category: "Tops",
    price: 54.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Lavender", "White"],
    description:
      "Floaty and feminine — this chiffon blouse drapes beautifully and pairs with everything.",
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500&auto=format",
    featured: true,
    inStock: true,
  },
  {
    id: 3,
    name: "Pearl Pleat Midi Skirt",
    category: "Skirts",
    price: 67.99,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Cream", "Mauve"],
    description:
      "A pleated midi skirt with a soft satin finish. Timeless, elegant, effortlessly chic.",
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=500&auto=format",
    featured: false,
    inStock: true,
  },
  {
    id: 4,
    name: "Blossom Puff Sleeve Top",
    category: "Tops",
    price: 48.99,
    sizes: ["S", "M", "L"],
    colors: ["Pink", "Sage"],
    description:
      "Romantic puff sleeves with a fitted bodice. A wardrobe staple for every soft aesthetic lover.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format",
    featured: true,
    inStock: true,
  },
  {
    id: 5,
    name: "Dahlia Floral Maxi Dress",
    category: "Dresses",
    price: 112.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral Pink", "Floral Lilac"],
    description:
      "A sweeping floral maxi dress that turns heads at every occasion. Light, breezy, unforgettable.",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format",
    featured: true,
    inStock: true,
  },
  {
    id: 6,
    name: "Velvet Dusk Blazer",
    category: "Outerwear",
    price: 134.99,
    sizes: ["S", "M", "L"],
    colors: ["Dusty Rose", "Mauve"],
    description:
      "A luxe velvet blazer that transitions from office to evening effortlessly.",
    image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=500&auto=format",
    featured: false,
    inStock: true,
  },
  {
    id: 7,
    name: "Whisper Linen Co-ord Set",
    category: "Sets",
    price: 98.99,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Oat", "Blush"],
    description:
      "Relaxed linen co-ord set — wide-leg trousers and a cropped blouse. Effortless summer dressing.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format",
    featured: false,
    inStock: true,
  },
  {
    id: 8,
    name: "Silk Reverie Slip Dress",
    category: "Dresses",
    price: 79.99,
    sizes: ["XS", "S", "M"],
    colors: ["Champagne", "Blush"],
    description:
      "A minimalist silk-finish slip dress. Wear alone or layer over a fitted turtleneck.",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format",
    featured: false,
    inStock: true,
  },
  {
    id: 9,
    name: "Meadow Smock Dress",
    category: "Dresses",
    price: 72.99,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sage", "Dusty Pink"],
    description:
      "A flowy smocked dress with adjustable straps — comfortable, cute, and countryside-ready.",
    image: "https://images.unsplash.com/photo-1532453288672-3a17ac36f734?w=500&auto=format",
    featured: false,
    inStock: false,
  },
  {
    id: 10,
    name: "Creme Knit Cardigan",
    category: "Tops",
    price: 62.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Blush"],
    description:
      "Cosy oversized cardigan in a soft knit. The perfect throw-on piece for any soft girl wardrobe.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format",
    featured: true,
    inStock: true,
  },
  {
    id: 11,
    name: "Aurora Pleated Trousers",
    category: "Bottoms",
    price: 76.99,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Lilac", "Cream"],
    description:
      "High-waisted pleated trousers with a wide leg. Polished and feminine for any occasion.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4f8c?w=500&auto=format",
    featured: false,
    inStock: true,
  },
  {
    id: 12,
    name: "Petal Mini Skirt",
    category: "Skirts",
    price: 44.99,
    sizes: ["XS", "S", "M"],
    colors: ["Pink", "White"],
    description:
      "A fun, flirty mini skirt with petal hem detail. Pairs perfectly with any of our blouses.",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&auto=format",
    featured: true,
    inStock: true,
  },
]

// ─── Helper functions (algorithms that run on this data) ───────────────────

// Get only featured products for homepage
export const getFeaturedProducts = () =>
  products.filter(p => p.featured)

// Get product by ID — used in ProductDetail page
export const getProductById = (id) =>
  products.find(p => p.id === Number(id))

// Get all unique categories
export const getCategories = () =>
  ['All', ...new Set(products.map(p => p.category))]

// Filter products by category
export const filterByCategory = (category) =>
  category === 'All'
    ? products
    : products.filter(p => p.category === category)

// Sort products
export const sortProducts = (list, sortBy) => {
  switch (sortBy) {
    case 'price-low':  return [...list].sort((a, b) => a.price - b.price)
    case 'price-high': return [...list].sort((a, b) => b.price - a.price)
    case 'name':       return [...list].sort((a, b) => a.name.localeCompare(b.name))
    default:           return list
  }
}