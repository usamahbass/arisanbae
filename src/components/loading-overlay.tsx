import { useTranslation } from "react-i18next";
import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";

type LoadingOverlayProps = {
  isOpen: boolean;
  handleClose?: Function | any;
};

const LoadingOverlay = ({ isOpen, handleClose }: LoadingOverlayProps) => {
  const { t } = useTranslation();

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme: any) => theme?.zIndex?.drawer + 1,
      }}
      open={isOpen}
      onClick={handleClose}
    >
      <Stack alignItems="center" direction="row" spacing={3}>
        <CircularProgress color="inherit" />
        <Typography variant="body2">{`${t("home.table.dialog.loading_search")}...`}</Typography>
      </Stack>
    </Backdrop>
  );
};

export default LoadingOverlay;
