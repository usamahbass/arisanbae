import { FC } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { pallete, typography, overrides } from "./foundations";

export const Theme: FC = ({ children }) => {
  const theme = createTheme({
    palette: pallete,
    typography,
    components: overrides,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
