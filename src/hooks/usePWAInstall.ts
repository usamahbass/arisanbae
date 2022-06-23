import { useRef, useState, useEffect } from "react";
import { platforms, getPlatform } from "helper/getDevicePlatform";

type ContextValueType = {
  supported: any;
  isInstalled: any;
  pwaInstall: any;
};

const platform = getPlatform();

export const usePWAInstall = (enableLogging: boolean) => {
  const awaitingPromiseRef = useRef<any>();
  const deferredprompt = useRef<any>(null);
  const [dialogState, setDialogState] = useState(false);
  const [contextValue, setContextValue] = useState<ContextValueType>({
    supported: supported,
    isInstalled: isInstalled,
    pwaInstall: openDialog,
  });

  useEffect(() => {
    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPromptEvent
    );
    return function cleanup() {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPromptEvent
      );
    };
  }, []);

  function logger(message: any) {
    if (enableLogging) {
      //   console.log(message);
    }
  }

  let standaloneNavigator: any;

  standaloneNavigator = window.navigator;

  function isInstalled() {
    if (
      (standaloneNavigator && standaloneNavigator.standalone === true) ||
      window.matchMedia("(display-mode: standalone)").matches
    ) {
      logger("isInstalled: true. Already in standalone mode");
      return true;
    }
    logger("isInstalled: false.");
    return false;
  }

  function supported() {
    if (deferredprompt.current != null && platform === platforms.NATIVE) {
      logger("supported: true - native platform");
      return true;
    }
    if (platform !== platforms.NATIVE && platform !== platforms.OTHER) {
      logger("supported: true - manual support");
      return true;
    }
    logger("supported: false");
    return false;
  }

  function handleBeforeInstallPromptEvent(event: any) {
    event.preventDefault();
    deferredprompt.current = event;
    logger("beforeinstallprompt event fired and captured");
    setContextValue({
      supported: supported,
      isInstalled: isInstalled,
      pwaInstall: openDialog,
    });
  }

  function openDialog(options: any) {
    setDialogState(true);
    return new Promise((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  }

  function handleClose() {
    setDialogState(false);
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject();
    }
  }

  function handleInstall() {
    logger("handleInstall called");
    setDialogState(false);
    if (deferredprompt.current != null) {
      return deferredprompt.current
        .prompt()
        .then((event: any) => deferredprompt.current.userChoice)
        .then((choiceResult: any) => {
          if (choiceResult.outcome === "accepted") {
            logger("PWA native installation succesful");
            if (awaitingPromiseRef.current) {
              awaitingPromiseRef.current.resolve();
            }
          } else {
            logger("User opted out by cancelling native installation");
            if (awaitingPromiseRef.current) {
              awaitingPromiseRef.current.reject();
            }
          }
        })
        .catch((err: any) => {
          if (awaitingPromiseRef.current) {
            awaitingPromiseRef.current.resolve();
          }
          logger("Error occurred in the installing process: ");
        });
    } else {
      if (awaitingPromiseRef.current) {
        awaitingPromiseRef.current.resolve();
      }
    }
  }

  return { handleInstall, dialogState, ...contextValue };
};
