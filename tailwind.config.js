/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
            "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens:{
      "xl": "1440px",
      "md": "1024px",
    },
    extend: {
      colors:{
        "almost-black": "hsl(0%, 0%, 98%)",
        "border-black": "#2e2e2e",
      }
    },
  },
  plugins: [],
}

