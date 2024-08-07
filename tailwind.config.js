/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // primary: "#6332a9", // passes APCA // used for actions
        darkest: "#1e1e1e", // heading text
        dark: "#808080", // secondary text
        medium: "#bababa", // non-decorative borders
        light: "#d7d7d7", // decorative borders
        lightest: "#efe9f2", // app background

        // used for both light and dark
        error: "#f44336",
        alert: "#ff9800",
        link: "#2196f3",

        // primary: {
        //   50: "hsl(0, 0%, 96%)",
        //   100: "hsl(0, 0%, 91%)",
        //   200: "hsl(0, 0%, 82%)",
        //   300: "hsl(0, 0%, 69%)",
        //   400: "hsl(0, 0%, 53%)",
        //   500: "hsl(0, 0%, 39%)",
        //   600: "hsl(0, 0%, 34%)",
        //   700: "hsl(0, 0%, 28%)",
        //   800: "hsl(0, 0%, 21%)",
        //   900: "hsl(0, 0%, 17%)",
        //   950: "hsl(0, 0%, 9%)",
        // },
        // primary: {
        //   50: "hsl(264, 100%, 98%)",
        //   100: "hsl(265, 100%, 95%)",
        //   200: "hsl(265, 100%, 91%)",
        //   300: "hsl(264, 100%, 85%)",
        //   400: "hsl(265, 100%, 75%)",
        //   500: "hsl(265, 100%, 61%)",
        //   600: "hsl(266, 89%, 56%)",
        //   700: "hsl(266, 78%, 47%)",
        //   800: "hsl(267, 74%, 39%)", // primary color in light mode
        //   900: "hsl(268, 72%, 32%)",
        //   950: "hsl(268, 96%, 21%)",
        // },
        primary: {
          50: "hsl(238, 100%, 95%)",
          100: "hsl(241, 100%, 91%)",
          200: "hsl(243, 100%, 83%)",
          300: "hsl(245, 100%, 73%)",
          400: "hsl(252, 100%, 62%)",
          500: "hsl(257, 100%, 54%)",
          600: "hsl(259, 100%, 50%)",
          700: "hsl(259, 100%, 50%)",
          800: "hsl(259, 100%, 45%)",
          900: "hsl(261, 100%, 35%)",
          950: "hsl(262, 100%, 10%)",
        },

        neutral: {
          50: "hsl(0, 0%, 96%)",
          100: "hsl(0, 0%, 91%)",
          200: "hsl(0, 0%, 82%)",
          300: "hsl(0, 0%, 69%)",
          400: "hsl(0, 0%, 53%)",
          500: "hsl(0, 0%, 39%)",
          600: "hsl(0, 0%, 34%)",
          700: "hsl(0, 0%, 28%)",
          800: "hsl(0, 0%, 21%)",
          900: "hsl(0, 0%, 17%)",
          950: "hsl(0, 0%, 9%)",
        },

        // lightest: "#f0f0f5", // app background // fondo anterior
        // white should be used as elements background

        // dark
        primary_d: "#a05eff", // passes APCA
        lightest_d: "#e6e6e6", // secondary text
        light_d: "#d7d7d7", // non-decorative borders
        medium_d: "#4f4f4f", // decorative borders
        dark_d: "#333333", // elements background
        darkest_d: "#1c1c1c", // app background
        // white should be used as heading text color
      },
      fontFamily: {
        opensans: ["opensans", "sans-serif"],
      },
      fontSize: {
        base: "16px",
      },
      spacing: {
        xxs: "4pt",
        xs: "8pt",
        s: "16pt",
        m: "24pt",
        l: "32pt",
        xl: "48pt",
        xxl: "80pt",
        "my-4": "4px",
        "my-8": "8px",
        "my-12": "12px",
        "my-16": "16px",
        "my-20": "20px",
        "my-24": "24px",
        "my-32": "32px",
        "my-48": "48px",
        "my-64": "64px",
        "my-96": "96px",
        "my-128": "128px",
        "my-192": "192px",
        "my-256": "256px",
        "my-320": "320px",
        "my-384": "384px",
        "my-512": "512px",
        "my-640": "640px",
        "my-768": "768px",
      },
      borderRadius: {
        "my-4": "4px",
        "my-8": "8px",
        "my-12": "12px",
        "my-16": "16px",
        "my-20": "20px",
        "my-24": "24px",
        "my-32": "32px",
        "my-48": "48px",
        "my-64": "64px",
      },
      boxShadow: {
        card: "0px 4px 16px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 56px rgba(17,17,26,0.1)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
