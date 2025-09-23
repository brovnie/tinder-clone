/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    // add all paths where you're using className
  ],
  // This is critical:
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
