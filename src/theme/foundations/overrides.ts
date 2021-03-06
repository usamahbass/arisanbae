import { Components } from "@mui/material";

export const overrides: Components = {
  MuiButton: {
    defaultProps: {
      style: {
        boxShadow: "none",
        fontFamily: `"Poppins", serif`,
      },
    },
  },
  MuiTypography: {
    defaultProps: {
      style: {
        fontFamily: `"Poppins", serif`,
      },
    },
  },
};
