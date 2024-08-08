import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: 'black',
          950: '#050505',
          900: '#111',
          800: '#151515',
          700: '#222',
          600: '#323232',
          500: '#444',
        },
        white: {
          DEFAULT: 'white',
          950: '#e5e5e5',
          900: '#eeeeee',
          850: '#d5d5d5',
          800: '#dddddd',
          750: '#c5c5c5',
          700: '#cccccc',
          650: '#b5b5b5',
          600: '#bbbbbb',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite'
      }

    },
  },
  plugins: [],
};
export default config;
