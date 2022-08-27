module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkgray: "#0d0d0e",
      },
      transitionDuration: {
        5000: "5000ms",
      },
      maxWidth: {
        "1/2": "50%",
      },
      fontSize: {
        mini: ".65rem",
      },
      scale: {
        25: "0.25",
        30: "0.30",
        33: "0.33",
        35: "0.35",
        38: "0.38",
        40: "0.40",
        45: "0.45",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
}
