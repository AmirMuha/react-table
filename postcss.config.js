module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    plugins: [
      "@fullhuman/postcss-purgecss",
      {
        content: ["./**/*.html", "./src/**/*.jsx"],
        defaultExtractor: (content) => {
          // Extract all CSS classes from the content.
          return content.match(/[A-Za-z0-9-]+/g) || [];
        },
      },
    ],
  },
};
