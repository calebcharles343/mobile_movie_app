/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#030014",
        accent: "#D0A106",
        text_muted: "#838383",
        secondary: "#D0A106",
      },
      fontFamily: {
        // Add Poppins font families
        sans: ["Poppins-Regular", "system-ui", "sans-serif"],
        "poppins-regular": ["Poppins-Regular", "sans-serif"],
        "poppins-medium": ["Poppins-Medium", "sans-serif"],
        "poppins-semibold": ["Poppins-SemiBold", "sans-serif"],
        "poppins-bold": ["Poppins-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
