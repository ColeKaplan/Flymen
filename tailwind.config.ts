import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './components/ChessComponents/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'textDark': '#5E8994', /* Dark gray text */
        'textDarkish': '#5E8994', /* Gray text */
        'textLight': '#5E8994', /* White text */
        'bg1': '#8f7c5d', /* Light background */
        'bg2': '#e5d5ba', /* Lighter background */
        'bg3': '#cdb996', /* Hover bg color */

        'background': '#DBCFB0',
        'primary': '#F25C54',
        'secondary': '#5D737E',
        'accent2': '#667761',
        'accent1': '#744253',
        'accent1.5': '#754958',

      },
      
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config