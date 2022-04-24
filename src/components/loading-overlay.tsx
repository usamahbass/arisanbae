import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";

type LoadingOverlayProps = {
  isOpen: boolean;
  handleClose?: Function | any;
};

const LoadingOverlay = ({ isOpen, handleClose }: LoadingOverlayProps) => {
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
        <Typography variant="body2">mencari pemenang...</Typography>
      </Stack>
    </Backdrop>
  );
};

export default LoadingOverlay;
