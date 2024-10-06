/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Ensure this line is present
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-100": "var(--color-primary-100)",
        "primary-200": "var(--color-primary-200)",
        "primary-300": "var(--color-primary-300)",
        "primary-400": "var(--color-primary-400)",
        "primary-500": "var(--color-primary-500)",
        "primary-600": "var(--color-primary-600)",
        "secondary-100": "var(--color-secondary-100)",
        "secondary-200": "var(--color-secondary-200)",
        "secondary-300": "var(--color-secondary-300)",
        "secondary-400": "var(--color-secondary-400)",
        "secondary-500": "var(--color-secondary-500)",
        "secondary-600": "var(--color-secondary-600)",
      },
    },
  },
  plugins: [],
}
