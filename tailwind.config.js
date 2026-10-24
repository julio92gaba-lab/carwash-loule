export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#2EFF6B',
          dark: '#0A0A0A',
          dark2: '#141414',
          dark3: '#1E1E1E',
        },
      },
      fontFamily: {
        script: ['"Pacifico"', 'cursive'],
        sans: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 8px rgba(46,255,107,0.8), 0 0 24px rgba(46,255,107,0.4)',
      },
    },
  },
  plugins: [],
}
