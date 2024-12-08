module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "!./src/tests/**/*", // Exclude tests from Tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  optimizeDeps: {
    exclude: ["./src/tests/**/*"], // Ensure test files are not bundled
  },
};
