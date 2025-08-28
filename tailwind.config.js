/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#05000C",        // main background
        purpleBorder: "#3201F4",  // button border
        lightText: "#E0E0FF",     // button text
        hoverBg: "#1A0AFF",       // button hover
        activeBg: "#2900D9",      // button active
      },
    },
  },
  plugins: [],
}
