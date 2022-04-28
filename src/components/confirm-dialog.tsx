import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
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
          Tidak
        </Button>
        <Button
          color="info"
          variant="contained"
          onClick={handleConfirm}
          autoFocus
        >
          Ya
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
