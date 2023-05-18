/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        tan: "#efdecd",
        light_green: "#56903a",
      },
      blur: {
        xs: "1px",
      },
      screens: {
        mobileL: "480px",
      },
    },
  },
  plugins: [],
};
