export const typography = {
  button: {
    textTransform: "none",
    fontFamily: ["Poppins", "serif"].join(","),
  },
  subtitle1: {
    fontFamily: ["Poppins", "serif"].join(","),
    fontWeight: 400,
  },
  body1: {
    fontFamily: ["Poppins", "serif"].join(","),
    fontWeight: 600,
    "@media (max-width: 678px)": {
      fontFamily: 500,
    },
  },
  body2: {
    fontFamily: ["Poppins", "serif"].join(","),
    fontWeight: 400,
    "@media (max-width: 678px)": {
      fontFamily: 400,
    },
  },
  p: {
    fontFamily: ["Poppins", "serif"].join(","),
    fontWeight: 400,
    "@media (max-width: 678px)": {
      fontFamily: 400,
    },
  },
};
