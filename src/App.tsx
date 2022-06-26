import { useContext, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useReactPWAInstall } from "react-pwa-install";
import { ArisanContext } from "context/context";
import AuthenticatedPages from "views/authenticated";
import WelcomePages from "views/welcome";

const App = () => {
  const { state } = useContext(ArisanContext);
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

  useEffect(() => {
    if (supported() && !isInstalled()) {
      handleInstallApp();
    }
  }, [supported, isInstalled]);

  if (state?.auth) {
    return <AuthenticatedPages />;
  }

  return <WelcomePages />;
};

export default App;
