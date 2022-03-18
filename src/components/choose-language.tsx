import { useContext } from "react";
import {
  SwipeableDrawer,
  Stack,
  Typography,
  Box,
  Avatar,
  Radio,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { LANGUAGE } from "constants/language";
import { ArisanContext } from "context/context";
import { changeLanguage } from "context/action";

type ChooseLanguageProps = {
  isOpen?: boolean | any;
  onClose?: Function | any;
  onOpen?: Function | any;
};

const ChooseLanguage = ({ isOpen, onClose, onOpen }: ChooseLanguageProps) => {
  const { i18n } = useTranslation();
  const { state, dispatch } = useContext(ArisanContext);

  return (
    <>
      <SwipeableDrawer
        open={isOpen}
        anchor="bottom"
        onClose={onClose}
        onOpen={onOpen}
      >
        <IconButton sx={{ position: "absolute", right: 0 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Stack padding="1rem" spacing={3}>
          <Stack spacing={1}>
            <Typography variant="body1">Pilihan bahasa</Typography>
            <Typography variant="body2">Mau pakai bahasa apa?</Typography>
          </Stack>

          {LANGUAGE.map((language, idx) => (
            <Box
              key={`${language.alias}-${idx + 1}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  sx={{
                    bgcolor: language.color,
                    width: 30,
                    height: 30,
                    fontSize: "1rem",
                    display: "flex",
                    margin: "0 auto",
                    fontFamily: `'Poppins', serif`,
                  }}
                >
                  {language.alias.toUpperCase()}
                </Avatar>

                <Typography variant="body2">{language.name}</Typography>
              </Stack>

              <Radio
                value={language.alias}
                checked={state.language === language.alias}
                defaultChecked={state.language === language.alias}
                onChange={(e: any) => {
                  i18n.changeLanguage(e.target.value);
                  dispatch(changeLanguage(e.target.value));
                }}
              />
            </Box>
          ))}
        </Stack>
      </SwipeableDrawer>
    </>
  );
};

export default ChooseLanguage;
