import { useContext } from "react";
import { Box, IconButton } from "@mui/material";
import { ArisanContext } from "context/context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { changeCurrentRoutes, changeNextRoutes } from "context/action";

const HeaderBack = () => {
  const { dispatch, state } = useContext(ArisanContext);
  return (
    <Box mb="1rem">
      <IconButton
        onClick={() => {
          dispatch(changeCurrentRoutes(state?.previousRoutes));
          dispatch(changeNextRoutes(state?.currentRoutes));
        }}
      >
        <ArrowBackIcon />
      </IconButton>
    </Box>
  );
};

export default HeaderBack;
