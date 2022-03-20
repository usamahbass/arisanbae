import { Box, Fab, Slide, Stack, Typography } from "@mui/material";
import ReactCodeInput from "react-code-input";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSlide } from "hooks/useSlide";
import ArisanLayout from "layouts";
import HeaderBack from "layouts/header-back";

const CreatePinPages = () => {
  const isSlide = useSlide();
  return (
    <ArisanLayout>
      <Slide direction="left" in={isSlide}>
        <Box height="100vh">
          <HeaderBack />

          <Stack ml=".75rem" spacing={4}>
            <Stack spacing={1} mt="1rem">
              <Typography>Buat Pin</Typography>
              <Typography variant="body2">
                Buat pin untuk masuk ke dalam aplikasi nantinya.
              </Typography>
            </Stack>

            <Box display="flex" justifyContent="center" alignItems="center">
              <ReactCodeInput type="number" fields={5} />
            </Box>
            <Fab
              type="submit"
              color="primary"
              sx={{
                color: "white",
                boxShadow: "none",
                position: "fixed",
                bottom: 30,
              }}
            >
              <ArrowForwardIcon />
            </Fab>
          </Stack>
        </Box>
      </Slide>
    </ArisanLayout>
  );
};

export default CreatePinPages;
