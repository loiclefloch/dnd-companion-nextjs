module.exports = {
  darkMode: 'class',
  // TODO: mode jit?
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // https://codesandbox.io/s/tailwind-jit-animation-bug-forked-r79tw?file=/tailwind.config.js
      animation: {
        shake: "shake 0.5s infinite ease-in-out"
      },
      keyframes: {
        shake: {
          "0%": {
            transform: "rotate(-1deg)"
          },
          "50%": {
            transform: "rotate(1deg)"
          },
          "100%": {
            transform: "rotate(-1deg)"
          }
        }
      }
    },
  },
  plugins: [
    // add prose className arround markdown / vanilla html
    require('@tailwindcss/typography'),
    // A plugin that provides a basic reset for form styles that makes form elements easy to override with utilities.
    require('@tailwindcss/forms'),
    require('./tailwind/tailwind-plugin-ios-full-height'),
  ],
  safelist: [
    'bg-red-400',
  ]
}
