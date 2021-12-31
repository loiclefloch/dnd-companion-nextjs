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
  plugins: [],
  safelist: [
    'bg-red-400',
  ]
}
