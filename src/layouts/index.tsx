import { ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import { useLayoutStyles } from "./_styles";

type ArisanLayoutProps = {
  children: ReactNode;
  isScreen?: boolean;
};

const ArisanLayout = ({ children, isScreen }: ArisanLayoutProps) => {
  const theme = useTheme();
  const classes = useLayoutStyles();
  return (
    <>
      <Box
        minHeight="100%"
        style={{
          backgroundColor: theme.palette.mode === "dark" ? "#1d1f20" : "",
        }}
      >
        <Box className={classes.container}>
          <Box
            p="1rem"
            pb="2rem"
            height={isScreen ? "100vh" : "100%"}
            bgcolor={theme.palette.mode === "dark" ? "#121212" : "white"}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ArisanLayout;
