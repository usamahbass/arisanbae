import { FC, useContext, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { enUS } from "@mui/x-data-grid";
import { idID as coreIdID, enUS as coreUsUS } from "@mui/material/locale";
import { GRID_DEFAULT_LOCALE_TEXT as idID } from "constants/idID";
import { pallete, overrides } from "./foundations";
import { ArisanContext } from "context/context";

export const Theme: FC = ({ children }) => {
  const { state } = useContext(ArisanContext);

  const isLanguage = state?.language?.toLowerCase() === "id" ? idID : enUS;
  const coreLanguage =
    state?.language?.toLowerCase() === "id" ? coreIdID : coreUsUS;

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode: state.theme,
            ...pallete,
          },
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
        isLanguage,
        coreLanguage
      ),
    [isLanguage, coreLanguage, state.theme]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
