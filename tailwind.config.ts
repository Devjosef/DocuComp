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
        primary: '#87CEEB', // Sky Blue - Brand color
        accent: '#FF7F50', // Coral - Accent color
        error: '#FF4C4C', // Red - Error messages, critical warnings
        success: '#4CAF50', // Green - Success messages, safe status indicators
        warning: '#FFC107', // Yellow - Alerts, caution messages, warnings
        info: '#2196F3', // Blue - Informational messages, hints, guidance
        black: '#000000', // Black - Primary text, titles, important information
        grey: '#9E9E9E', // Grey - Secondary text, disabled states, neutral backgrounds
        lightGrey: '#E0E0E0', // Light Grey - Containers, borders, light backgrounds
        offWhite: '#F5F5F5', // Off-white - General background color, soft neutral look
        
        // Data Visualization Colors
        blue: '#2196F3',
        lightBlue: '#87CEEB',
        orange: '#FF9800',
        lightOrange: '#FFCC80',
        green: '#4CAF50',
        lightGreen: '#81C784',
        red: '#F44336',
        lightRed: '#E57373',
        purple: '#9C27B0',
        lightPurple: '#BA68C8',
        brown: '#795548',
        lightBrown: '#A1887F',
        pink: '#E91E63',
        lightPink: '#F06292',
        olive: '#808000',
        lightOlive: '#BDB76B',
        teal: '#008080',
        lightTeal: '#40E0D0'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '40': '10rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
      },
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
        'mono': ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;