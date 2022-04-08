import { useState, useContext } from "react";
import { IconButton, Typography, Box } from "@mui/material";
import Helmet from "react-helmet";
import SettingIcon from "@mui/icons-material/Settings";
import { ArisanContext } from "context/context";
import ArisanLayout from "layouts";
import SettingViews from "./settings";
import BottomNav from "./bottom-nav";

const AuthenticatedPages = () => {
  const { state } = useContext(ArisanContext);

  const [openSetting, setOpenSetting] = useState(false);

  return (
    <ArisanLayout>
      <Helmet title={state.arisan?.name} />

      <Box display="flex" py="1rem" justifyContent="space-between">
        <Typography fontSize="1.2rem">
          <Typography variant="h6" fontSize="1.2rem">
            Halo,
          </Typography>
          {state?.arisan?.administrator?.manager}
        </Typography>

        <IconButton
          sx={{ position: "absolute", right: 10 }}
          onClick={() => setOpenSetting(true)}
        >
          <SettingIcon />
        </IconButton>
      </Box>

      <SettingViews
        isOpen={openSetting}
        handleClose={() => setOpenSetting(false)}
      />

      <BottomNav />
    </ArisanLayout>
  );
};

export default AuthenticatedPages;
