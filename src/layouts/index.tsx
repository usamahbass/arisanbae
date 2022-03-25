import { ReactNode } from "react";
import { Box } from "@mui/material";
import { useLayoutStyles } from "./_styles";

type ArisanLayoutProps = {
  children: ReactNode;
  isScreen?: boolean;
};

const ArisanLayout = ({ children, isScreen }: ArisanLayoutProps) => {
  const classes = useLayoutStyles();
  return (
    <>
      <Box minHeight="100%">
        <Box className={classes.container}>
          <Box bgcolor="white" p="1rem" height={isScreen ? "100vh" : "100%"}>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ArisanLayout;
