/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-dark)",
        foreground: "var(--text-main)",
        card: "var(--card-bg)",
        orange: {
          primary: "var(--orange-primary)",
          glow: "var(--orange-glow)",
        },
        cyan: {
          primary: "var(--cyan-primary)",
          glow: "var(--cyan-glow)",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
}
