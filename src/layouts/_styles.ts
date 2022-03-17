import { makeStyles } from "@mui/styles";

export const useLayoutStyles = makeStyles(() => ({
  container: {
    maxWidth: "380px",
    width: "100%",
    position: "relative",
    margin: "0 auto",
    // padding: "0px 16px 80px",
    minHeight: "calc(100vh - 60px)",
  },
}));
