import { useContext, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
  Link,
  Avatar,
  IconButton,
  Slide,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useWelcomeStyles } from "./_styles";
import { getCurrentLanguage } from "helper/getCurrentLanguage";
import { ArisanContext } from "context/context";
import { changeCurrentRoutes, changePreviousRoutes } from "context/action";
import { ROUTES_NAME } from "constants/routes";
import { useSlide } from "hooks/useSlide";
import ArisanLayout from "layouts";
import PageTitle from "components/page-title";
import LogoArisan from "assets/png/icon.png";
import IlustrationWelcome from "assets/svg/welcome.svg";
import ChooseLanguage from "components/choose-language";

const WelcomePages = () => {
  const classes = useWelcomeStyles();
  const currentLanguage = getCurrentLanguage();
  const { t } = useTranslation();

  const { dispatch } = useContext(ArisanContext);

  const isSlide = useSlide();
  const [openChooseLanguage, setOpenChooseLanguage] = useState(false);

  return (
    <ArisanLayout>
      <PageTitle title={t("welcome.title")} />
      <Slide direction="left" in={isSlide}>
        <Box height="100vh">
          <Box className={classes.header}>
            <Box display="flex" alignItems="center">
              <img className={classes.logo} src={LogoArisan} alt="logoarisan" />
              <Typography className={classes.logoName}>ArisanBae</Typography>
            </Box>

            <Box>
              <IconButton
                aria-label="choose-language"
                onClick={() => setOpenChooseLanguage(true)}
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    bgcolor: "#5DC3B2",
                    fontSize: "1rem",
                    fontFamily: `'Poppins', serif`,
                  }}
                >
                  {currentLanguage?.toUpperCase()}
                </Avatar>
              </IconButton>
            </Box>
          </Box>

          <Box mt="5rem" component="main">
            <img
              className={classes.imageIlustration}
              src={IlustrationWelcome}
              alt="ilustration"
            />

            <Stack mt="2rem" spacing={2}>
              <Stack spacing={1}>
                <Typography>{t("welcome.title")}</Typography>
                <Typography variant="body2" fontSize=".75rem !important">
                  {t("welcome.description")}
                </Typography>
              </Stack>

              <Button
                className={classes.btnImpor}
                color="primary"
                variant="contained"
                onClick={() => {
                  dispatch(changeCurrentRoutes(ROUTES_NAME.CREATE_WITH_IMPORT));
                  dispatch(changePreviousRoutes(ROUTES_NAME.WELCOME));
                }}
              >
                {t("welcome.impor_button")}
              </Button>

              <Button
                className={classes.btnManual}
                color="primary"
                variant="outlined"
                onClick={() => {
                  dispatch(
                    changeCurrentRoutes(ROUTES_NAME.CREATE_PROFILE_ADMIN)
                  );
                  dispatch(changePreviousRoutes(ROUTES_NAME.WELCOME));
                }}
              >
                {t("welcome.manual_button")}
              </Button>
            </Stack>

            <Box mt="5rem">
              <Typography className={classes.captionFooter} variant="body2">
                {t("welcome.footer_caption")}&nbsp;
                <Link
                  href="https://almanhaj.or.id/3818-arisan-dalam-pandangan-islam.html"
                  target="_blank"
                >
                  {t("welcome.footer_caption_link")}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Slide>

      <ChooseLanguage
        isOpen={openChooseLanguage}
        onClose={() => setOpenChooseLanguage(false)}
      />
    </ArisanLayout>
  );
};

export default WelcomePages;
