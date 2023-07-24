/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#4A55A2", // Ganti dengan warna utama baru
        primary_dark: "#7895CB", // biasanya di gunakan untuk background button atau text agak gelap
        secondary: "#F69447", // orange
        white: "#fcfcfc",
        black: "#4E4E4E",
      },
      boxShadow: {
        custom: "4px 0px 12px 8px rgba(74, 85, 162, 0.10)",
        customdua: "4px 4px 4px 0px rgba(120, 149, 203, 0.25)",
      },
      fontSize: {
        "heading-1": "48px",
        "heading-2": "40px",
        "heading-3": "32px",
        "heading-4": "24px",
        "heading-5": "16px",
        "heading-6": "8px",
        paragaph: "16px",
        small: "10px",
      },
      fontWeight: {
        "heading-1": "bold",
        "heading-2": "bold",
        "heading-3": "normal",
        "heading-4": "bold",
        "heading-5": "normal",
        "heading-6": "normal",
        paragaph: "normal",
        small: "normal",
      },
    },
  },
  variants: {},
  plugins: [],
};
