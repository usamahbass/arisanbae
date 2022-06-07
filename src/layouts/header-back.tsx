import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Box, IconButton, Tooltip } from "@mui/material";
import { ArisanContext } from "context/context";
import { changeCurrentRoutes, changeNextRoutes } from "context/action";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const HeaderBack = () => {
  const { t } = useTranslation();
  const { dispatch, state } = useContext(ArisanContext);

  return (
    <Box mb="1rem">
      <Tooltip title={t("words.back")}>
        <IconButton
          onClick={() => {
            dispatch(changeCurrentRoutes(state?.previousRoutes));
            dispatch(changeNextRoutes(state?.currentRoutes));
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default HeaderBack;
