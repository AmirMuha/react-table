/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./src/**/*.{js,ts,tsx,jsx}", "./dist/**/*.{js,ts,tsx,jsx}"],
  prefix: "am__",
  theme: {
    screens: {
      xs: "360px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        error: "#5C2100",
        primary: "#040D2D",
        success: "#007753",
        secondary: "#CDD8FF",
      },
    },
  },
  plugins: [
    require("cssnano"),
    require("autoprefixer"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
};
