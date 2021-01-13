const { trueGray } = require("tailwindcss/colors")

module.exports = {
  purge: ["./public/*.html"],
  theme: {
    extend: {
      colors: {
        gray: trueGray,
      },
      fontFamily: {
        sans: "Inter",
      },
    },
  },
}
