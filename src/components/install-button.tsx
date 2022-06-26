import { useSnackbar } from "notistack";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { isAndroid } from "mobile-device-detect";
import { useReactPWAInstall } from "react-pwa-install";
import InstallMobileIcon from "@mui/icons-material/InstallMobile";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";

type InstallButtonProps = {
  isHome?: boolean;
};

const InstallButton = ({ isHome }: InstallButtonProps) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { isInstalled, pwaInstall, supported }: any = useReactPWAInstall();

  const handleInstallApp = () => {
    pwaInstall({
      description: t("snackbar_install.install_description"),
      installTitle: t("snackbar_install.install_button"),
      closeTitle: t("with_import.stats_close"),
    })
      .then(() =>
        enqueueSnackbar(t("snackbar_install.success_install"), {
          variant: "success",
          anchorOrigin: { vertical: "bottom", horizontal: "center" },
        })
      )
      .catch(() =>
        enqueueSnackbar(t("snackbar_install.failed_install"), {
          variant: "error",
          anchorOrigin: { vertical: "bottom", horizontal: "center" },
        })
      );
  };

  return (
    <Tooltip title={t("snackbar_install.install_button")}>
      <IconButton
        aria-label="install-app"
        onClick={handleInstallApp}
        disabled={!supported() && isInstalled()}
        sx={{ ml: 1, position: "relative", right: isHome ? "40px" : "0" }}
      >
        {isAndroid ? <InstallMobileIcon /> : <InstallDesktopIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default InstallButton;
