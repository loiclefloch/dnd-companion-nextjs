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
    // A plugin that provides a basic reset for form styles that makes form elements easy to override with utilities.
    require('@tailwindcss/forms'),
  ],
  safelist: [
    'bg-red-400',
  ]
}
