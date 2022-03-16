import { FONTS } from "types/theme/fonts";
const PoppinsRegular = require("assets/fonts/poppins-v15-latin-regular.woff");
const PlayfairDisplayRegular = require("assets/fonts/playfair-display-v22-latin-regular.woff");

export const fonts: FONTS = {
  poppins: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `url(${PoppinsRegular}) format('woff2')`,
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
  },
  playfair: {
    fontFamily: "Playfair Display",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `
        local('Playfair Display'),
        local('Poppins-Regular'),
        url(${PlayfairDisplayRegular}) format('woff2')
      `,
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
  },
};
