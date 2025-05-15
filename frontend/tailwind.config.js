/** @type {import('tailwindcss').Config} */
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
      animation: {
        "slide-down": "slideDown 0.3s ease-out forwards",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      colors: {
        blue_main: "#6F85DF",
      },
    },
  },
  plugins: [],
};
