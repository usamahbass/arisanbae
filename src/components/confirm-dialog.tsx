import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import TransitionSlide from "./slide-transition";

type ConfirmDialogType = {
  isOpen: boolean;
  handleClose: Function | any;
  title: string;
  description?: string;
  handleConfirm: Function | any;
};

const ConfirmDialog = ({
  isOpen,
  handleClose,
  title,
  description,
  handleConfirm,
}: ConfirmDialogType) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={TransitionSlide}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ bgcolor: "info.main", color: "white", fontSize: "1rem" }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}{" "}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleClose}>
          {t("home.table.dialog.confirm.cancel")}
        </Button>
        <Button
          color="info"
          variant="contained"
          onClick={handleConfirm}
          autoFocus
        >
          {t("home.table.dialog.confirm.ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
