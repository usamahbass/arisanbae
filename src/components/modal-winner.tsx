import { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ArisanContext } from "context/context";
import type { ArisanMemberTypes } from "types/core/member";
import TransitionSlide from "./slide-transition";

type ModalWinnerProps = {
  isOpen: boolean;
  onClose: Function | any;
  winners: ArisanMemberTypes[];
};

const ModalWinner = ({ isOpen, onClose, winners }: ModalWinnerProps) => {
  const { t } = useTranslation();
  const { state } = useContext(ArisanContext);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      TransitionComponent={TransitionSlide}
      hideBackdrop
    >
      <DialogTitle
        sx={{ bgcolor: "info.main", color: "white", fontSize: "1rem" }}
      >
        {t("home.table.dialog.winner.title")} <b>{state?.arisan?.name}</b>,{" "}
        {t("home.table.dialog.winner.arisan_ke")} {state?.arisan?.arisan_ke}
      </DialogTitle>

      <DialogContent>
        <List sx={{ marginTop: "1rem" }}>
          {winners?.map((winner, idx) => (
            <ListItem alignItems="flex-start" key={`key-${idx}`}>
              <ListItemText
                primary={`${idx + 1}. ${winner.name} (${winner.telp})`}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button color="info" onClick={onClose}>
          {t("home.table.dialog.winner.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWinner;
