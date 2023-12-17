/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        mono: ['Monomaniac One', 'monospace'],
      },
      colors: {
        "formfield": '#1E2228', 
        "dark-blue": "#1E2228",
        "neutral-blue": "#21252C",
        "light-blue": "#252B35",
        "rose-pink": "#E25376",
        "gray":"#1E1E1E",
        "black":"#131313",
        "ash":"#7B7B7B",
        "fade":'#CCC'
        
      
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

