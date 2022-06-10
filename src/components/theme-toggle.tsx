import { useContext } from "react";
import { Tooltip, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { setTheme } from "context/action";
import { ArisanContext } from "context/context";

type ThemeToggleProps = {
  isHome?: boolean;
};

const ThemeToggle = ({ isHome }: ThemeToggleProps) => {
  const { t } = useTranslation();
  const { dispatch, state } = useContext(ArisanContext);

  const handleSwitchMode = () => {
    if (state.theme === "dark") {
      dispatch(setTheme("light"));
    } else {
      dispatch(setTheme("dark"));
    }
  };

  return (
    <Tooltip title={t(`words.theme_${state.theme}`)}>
      <IconButton
        color="inherit"
        onClick={handleSwitchMode}
        sx={{ ml: 1, position: "relative", right: isHome ? "40px" : "0" }}
      >
        {state.theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
