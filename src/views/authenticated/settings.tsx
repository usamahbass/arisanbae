import { useContext } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  NativeSelect,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ArisanContext } from "context/context";
import {
  changeCurrentRoutes,
  changeLanguage,
  changePreviousRoutes,
  removeArisanData,
  setArisanHistory,
  setAuthentication,
} from "context/action";
import { LANGUAGE } from "constants/language";
import type { ArisanHistoryType } from "types/core/history";
import TransitionSlide from "components/slide-transition";

type SettingViewProps = {
  isOpen: boolean;
  handleClose: Function | any;
};

const SettingViews = ({ isOpen, handleClose }: SettingViewProps) => {
  const { state, dispatch } = useContext(ArisanContext);

  const handleLogout = () => {
    dispatch(removeArisanData());
    dispatch(setAuthentication(false));
    dispatch(changeCurrentRoutes(null));
    dispatch(changePreviousRoutes(null));
  };

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={TransitionSlide}
    >
      <AppBar
        sx={{
          position: "relative",
          bgcolor: "white",
          boxShadow: 0,
          borderBottom: "1px solid #ccc",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} fontSize="1.1rem">
            Pengaturan
          </Typography>
        </Toolbar>
      </AppBar>

      <List>
        <ListItem>
          <ListItemText
            primary="Bahasa"
            secondary={
              LANGUAGE.find((lang) => lang.alias === state.language)?.name
            }
          />

          <NativeSelect
            defaultValue={state?.language}
            inputProps={{
              name: "language",
              id: "setting-language",
            }}
            onChange={(event) => {
              dispatch(changeLanguage(event.target.value));

              const payloadHistory: ArisanHistoryType = {
                name: `Bahasa telah diubah ke ${
                  LANGUAGE.find((lang) => lang.alias === event.target.value)
                    ?.name
                }`,
                date: new Date(),
              };

              dispatch(setArisanHistory(payloadHistory));
            }}
          >
            {LANGUAGE.map((lang) => (
              <option key={lang.alias} value={lang.alias}>
                {lang.name}
              </option>
            ))}
          </NativeSelect>
        </ListItem>
        <Divider />

        <ListItem button onClick={handleLogout}>
          <ListItemText
            primary="Keluar"
            secondary="Aksi ini akan menghapus semua data arisan, silakan export data sebelum keluar."
          />
        </ListItem>

        <Divider />
      </List>
    </Dialog>
  );
};

export default SettingViews;
