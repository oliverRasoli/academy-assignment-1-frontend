/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-brand': '#202124',
        'brand-grey': '#34363c',
        'brand-light-grey': '#EAEAEA',
        // Tailwind custom palette
        'custom-palette-black': '#231F20',
        'custom-palette-vanilla-yellow': '#F3DFA2',
        'custom-palette-red': '#BB4430',
        'custom-palette-baby-blue': '#7EBDC2',
        'custom-palette-egg-shell': '#EFE6DD',
      },
      gridColumn: {
        'span-16': 'span 16 / span 16',
      },
    },
  },
  plugins: [],
};
