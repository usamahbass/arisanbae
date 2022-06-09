import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Breakpoint,
} from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import TransitionSlide from "./slide-transition";

type ConfirmDialogType = {
  isOpen: boolean;
  handleClose: Function | any;
  title: string;
  description?: string | ReactNode;
  handleConfirm?: Function | any;
  customActions?: boolean;
  children?: ReactNode;
  size?: false | Breakpoint | undefined;
};

const ConfirmDialog = ({
  isOpen,
  handleClose,
  title,
  description,
  handleConfirm,
  customActions,
  children,
  size,
}: ConfirmDialogType) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={TransitionSlide}
      maxWidth={size}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ bgcolor: "info.main", color: "white", fontSize: "1rem" }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ marginTop: "1rem !important" }}>
        <DialogContentText id="alert-dialog-description">
          {description}{" "}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {customActions ? (
          children
        ) : (
          <>
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
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
