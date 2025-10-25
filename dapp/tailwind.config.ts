// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['Space-Grotesk', 'sans-serif'],
        sharetech: ['Share-Tech-Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
