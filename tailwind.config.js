export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blush:    '#f9e4e4',
        rose:     '#e8a0a0',
        cream:    '#fdf8f4',
        lavender: '#e8d5f5',
        mauve:    '#c9a0c0',
        charcoal: '#4a4a4a',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans:  ['"Poppins"', 'sans-serif'],
      },
      // ← Add this
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
    },
  },
  plugins: [],
}