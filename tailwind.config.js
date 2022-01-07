module.exports = {
  darkMode: 'class',
  // TODO: mode jit?
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // add prose className arround markdown / vanilla html
    require('@tailwindcss/typography'),
  ],
  safelist: [
    'bg-red-400',
  ]
}
