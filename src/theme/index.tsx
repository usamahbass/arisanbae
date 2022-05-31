import { FC } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { bgBG } from "@mui/x-data-grid";
import { bgBG as coreBgBG } from "@mui/material/locale";
import { pallete, overrides } from "./foundations";

export const Theme: FC = ({ children }) => {
  const theme = createTheme(
    {
      palette: pallete,
      components: overrides,
      typography: {
        button: {
          textTransform: "none",
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
      },
    },
    bgBG,
    coreBgBG
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
