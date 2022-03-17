import { FC } from "react";
import { Box } from "@mui/material";
import { useLayoutStyles } from "./_styles";

const ArisanLayout: FC = ({ children }) => {
  const classes = useLayoutStyles();
  return (
    <>
      <Box minHeight="100%">
        <Box className={classes.container}>
          <Box bgcolor="white" p="1rem">
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ArisanLayout;
