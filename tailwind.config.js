// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: ["./src/**/*.{html,js,vue}"], // Make sure to include '.vue'
  theme: {
    extend: {
      colors: {
        customBlue: '#1E3A8A', // Example custom color
      },
    },
  },
  plugins: [],
}
