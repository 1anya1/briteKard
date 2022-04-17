module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },

    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
      12: "12px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#f7fafb",
      blue: {
        50: "#f7fafb",
        100: "#e6f2fc",
        200: "#c9dcf9",
        300: "#9fb9f0",
        400: "#7790e3",
        500: "#5e6bd8",
        600: "#4c4fc5",
        700: "#3a3ba1",
        800: "#282773",
        900: "#161846",
      },
      gray: {
        50: "#f9faf9",
        100: "#eef2f5",
        200: "#d9dfe9",
        300: "#b2bccd",
        400: "#8494a9",
        500: "#667186",
        600: "#515667",
        700: "#3e404d",
        800: "#2a2b35",
        900: "#191921",
      },
    },
    // fill: ({ theme }) => ({
    //   teal: theme("colors.blue.500"),
    //   hover: theme("colors.blue.400"),
    //   gray: theme("colors.gray.500"),
    // }),
    extend: {
      insert: {
        "half-down": "-88px",
      },
      height: {
        "fourty-two": "42%",
      },
      width: {
        "fourty-tw0": "42%",
      },
      translate: {
        "negative-half": "-50%",
      },
      padding: {
        104: "104px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
