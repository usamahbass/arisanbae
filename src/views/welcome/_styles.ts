import { makeStyles } from "@mui/styles";

export const useWelcomeStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 20,
    height: 20,
  },
  logoName: {
    marginLeft: ".25rem !important",
    fontSize: "1rem !important",
  },
  imageIlustration: {
    width: "75%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
  },
  btnImpor: {
    color: "white !important",
    borderRadius: "20px !important",
    fontWeight: "bold !important",
    fontSize: ".75rem !important",
  },
  btnManual: {
    borderRadius: "20px !important",
    fontWeight: "bold !important",
    fontSize: ".75rem !important",
  },
  captionFooter: {
    textAlign: 'center',
    fontSize: "1rem !important",
  },
});
