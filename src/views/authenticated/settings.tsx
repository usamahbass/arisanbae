import { useContext } from "react";
import { useTranslation } from "react-i18next";
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
import fileDownload from "js-file-download";
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
import { replaceAll } from "helper/replaceAll";
import type { ArisanHistoryType } from "types/core/history";
import TransitionSlide from "components/slide-transition";

type SettingViewProps = {
  isOpen: boolean;
  handleClose: Function | any;
};

const SettingViews = ({ isOpen, handleClose }: SettingViewProps) => {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useContext(ArisanContext);

  const handleExportData = () => {
    const localData = JSON.stringify(state);
    const bytes = new TextEncoder().encode(localData);
    const blob = new Blob([bytes], {
      type: "application/json;charset=utf-8",
    });

    fileDownload(
      blob,
      `${replaceAll(state?.arisan?.name?.toLowerCase(), " ", "_")}.json`
    );

    const isHistory: ArisanHistoryType = {
      name: t("home.history.has_exported"),
      date: new Date(),
    };

    dispatch(setArisanHistory(isHistory));
  };

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
            {t("home.setting.title")}
          </Typography>
        </Toolbar>
      </AppBar>

      <List>
        <ListItem>
          <ListItemText
            primary={t("home.setting.language")}
            secondary={
              LANGUAGE.find((lang) => lang.alias === state.language)?.name
            }
          />

          <NativeSelect
            defaultValue={state?.language?.toLowerCase()}
            inputProps={{
              name: "language",
              id: "setting-language",
            }}
            onChange={(event) => {
              i18n.changeLanguage(event.target.value);
              dispatch(changeLanguage(event.target.value));

              const payloadHistory: ArisanHistoryType = {
                name: `${t("home.history.language_change_text")} ${
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

        <ListItem button onClick={handleExportData}>
          <ListItemText
            primary={t("home.setting.export")}
            secondary={t("home.setting.export_text")}
          />
        </ListItem>

        <Divider />

        <ListItem button onClick={handleLogout}>
          <ListItemText
            primary={t("home.setting.logout")}
            secondary={t("home.setting.logout_text")}
          />
        </ListItem>

        <Divider />
      </List>
    </Dialog>
  );
};

export default SettingViews;
