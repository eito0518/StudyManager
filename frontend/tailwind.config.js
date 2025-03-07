/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"], // Tailwind を適用するファイルを指定
  theme: {
    extend: {
      primary: "#FF5722",
      secondary: "#3F51B5",
    },
  },
  plugins: [require("daisyui")], // daisyUI を追加
};
