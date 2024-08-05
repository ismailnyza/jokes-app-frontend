// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "spotify-green": "#1DB954",
        "spotify-black": "#191414",
        "light-gray": "#F7F7F7",
      },
    },
  },
  plugins: [],
};
