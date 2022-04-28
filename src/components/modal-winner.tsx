import { useContext } from "react";
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
  const { state } = useContext(ArisanContext);

  return (
    <Dialog open={isOpen} onClose={onClose} TransitionComponent={TransitionSlide} hideBackdrop>
      <DialogTitle
        sx={{ bgcolor: "info.main", color: "white", fontSize: "1rem" }}
      >
        Pemenang Arisan {state?.arisan?.name}, Arisan Ke{" "}
        {state?.arisan?.arisan_ke}
      </DialogTitle>

      <DialogContent>
        <List sx={{ marginTop: "1rem" }}>
          <ListItem alignItems="flex-start">
            {winners?.map((winner, idx) => (
              <ListItemText
                primary={`${idx + 1}. ${winner.name} (${winner.telp})`}
              />
            ))}
          </ListItem>
        </List>
      </DialogContent>

      <DialogActions>
        <Button color="info" onClick={onClose}>
          Tutup
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWinner;
