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
        'gradient': 'linear-gradient(45deg, #9945FF 10.43%, #8752F3 30.84%, #5497D5 49.4%, #43B4CA 58.68%, #28E0B9 69.81%, #19FB9B 93.01%)',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      variants: {
        extend: {
          backgroundImage: ['hover'],
          opacity: ['hover']
        }
      }    
    },
  },
  plugins: [],
}

