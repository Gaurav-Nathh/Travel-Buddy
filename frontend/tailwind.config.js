/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        cloud: "url('/Cloud.jpg')",
        cloud_planes: "url('/Cloud-Planes.jpg')",
        // 'planes': "url('/Paper-Planes.svg')"
      },
      fontFamily: {
        inter: ["Inter", "serif"],
        playfair: ["Playfair Display", "serif"],
      },
      colors: {
        blue_main: "#6F85DF",
      },
    },
  },
  plugins: [daisyui],
};
