import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
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
        'border': '#B0B0B0', // Light Gray
        'input': '#1A2526', // Dark Blue-Black
        'ring': '#007BFF', // Standard Blue
        'background': '#1A2526', // Dark Blue-Black
        'foreground': '#FFFFFF', // White
        'primary': {
          DEFAULT: '#007BFF', // Standard Blue
          foreground: '#FFFFFF', // White
        },
        'secondary': {
          DEFAULT: '#1A2526', // Dark Blue-Black
          foreground: '#FFFFFF', // White
        },
        'destructive': {
          DEFAULT: '#FF0000', // Red (default destructive color, adjust if needed)
          foreground: '#FFFFFF', // White
        },
        'muted': {
          DEFAULT: '#1A2526', // Dark Blue-Black
          foreground: '#B0B0B0', // Light Gray
        },
        'accent': {
          DEFAULT: '#1A2526', // Dark Blue-Black
          foreground: '#FFFFFF', // White
        },
        'popover': {
          DEFAULT: '#1A2526', // Dark Blue-Black
          foreground: '#FFFFFF', // White
        },
        'card': {
          DEFAULT: '#1A2526', // Dark Blue-Black
          foreground: '#FFFFFF', // White
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "scrolling-banner": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - var(--gap)/2))" },
        },
        "scrolling-banner-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-50% - var(--gap)/2))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scrolling-banner": "scrolling-banner var(--duration) linear infinite",
        "scrolling-banner-vertical": "scrolling-banner-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
} satisfies Config;

export default config;
