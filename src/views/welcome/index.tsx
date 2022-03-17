import { Typography, Box, Stack, Button, Link } from "@mui/material";
import { useWelcomeStyles } from "./_styles";
import ArisanLayout from "layouts";
import LogoArisan from "assets/png/icon.png";
import IlustrationWelcome from "assets/svg/welcome.svg";

const WelcomePages = () => {
  const classes = useWelcomeStyles();
  return (
    <ArisanLayout>
      <Box height="100vh">
        <Box className={classes.header}>
          <img className={classes.logo} src={LogoArisan} alt="logoarisan" />
          <Typography className={classes.logoName}>Arisan</Typography>
        </Box>

        <Box mt="5rem" component="main">
          <img
            className={classes.imageIlustration}
            src={IlustrationWelcome}
            alt="ilustration"
          />

          <Stack mt="2rem" spacing={2}>
            <Stack spacing={1}>
              <Typography>Selamat datang di Arisan!</Typography>
              <Typography variant="body2" fontSize=".75rem !important">
                Aplikasi untuk bantuin kamu yang ribet catat catat mengenai
                arisan. Buat member dan lakukan undian kapan pun dan dimana pun.
              </Typography>
            </Stack>

            <Button
              className={classes.btnImpor}
              color="primary"
              variant="contained"
            >
              Impor File
            </Button>

            <Button
              className={classes.btnManual}
              color="primary"
              variant="outlined"
            >
              Ga punya file? Buat manual
            </Button>
          </Stack>

          <Box mt="5rem">
            <Typography className={classes.captionFooter} variant="body2">
              Insya Allah aplikasi arisan ini sudah mengikuti kaidah yang
              dibolehkan, selengkapnya silakan baca{" "}
              <Link
                href="https://almanhaj.or.id/3818-arisan-dalam-pandangan-islam.html"
                target="_blank"
              >
                disini
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ArisanLayout>
  );
};

export default WelcomePages;
