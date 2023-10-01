// tailwind.config.js
module.exports = {
  content:[
    './src/*'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans'],
      },
      colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
        // Add custom colors here
      },
      textColor: {
        red: '#e74c3c',    // Custom red color
        green: '#27ae60', 
        purple:'#702963' // Custom green color
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

