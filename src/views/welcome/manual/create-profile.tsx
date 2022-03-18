import { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  IconButton,
  Slide,
  Stack,
  TextField,
  Typography,
  Fab,
} from "@mui/material";
import { changeCurrentRoutes, changeNextRoutes } from "context/action";
import { useSlide } from "hooks/useSlide";
import { ArisanContext } from "context/context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArisanLayout from "layouts";

const CreateProfile = () => {
  const { dispatch, state } = useContext(ArisanContext);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const isSlide = useSlide();

  const handleCreateProfile = (values: any) => {
    console.log(values, "HERE");
  };

  return (
    <ArisanLayout>
      <Slide in={isSlide} direction="left">
        <Box height="100vh">
          <Box mb="1rem">
            <IconButton
              onClick={() => {
                dispatch(changeCurrentRoutes(state?.previousRoutes));
                dispatch(changeNextRoutes(state?.currentRoutes));
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>

          <Stack ml=".75rem" spacing={4}>
            <Stack spacing={1} mt="1rem">
              <Typography>Daftar</Typography>
              <Typography variant="body2">
                Lengkapi data arisan kamu di bawah ini, ya
              </Typography>
            </Stack>

            <form
              autoComplete="off"
              onSubmit={handleSubmit(handleCreateProfile)}
            >
              <Stack spacing={3}>
                <Controller
                  name="arisan_name"
                  control={control}
                  defaultValue={null}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="medium"
                      label="Nama Arisan"
                      variant="outlined"
                      value={value}
                      sx={{ fontWeight: 400 }}
                      onChange={({ target: { value: valueInput } }) =>
                        onChange(valueInput)
                      }
                    />
                  )}
                />

                <Controller
                  name="pengelola"
                  control={control}
                  defaultValue={null}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="medium"
                      label="Pengelola"
                      variant="outlined"
                      value={value}
                      sx={{ fontWeight: 400 }}
                      onChange={({ target: { value: valueInput } }) =>
                        onChange(valueInput)
                      }
                    />
                  )}
                />
              </Stack>

              <Fab
                type="submit"
                color="primary"
                disabled={!isValid}
                sx={{
                  color: "white",
                  boxShadow: "none",
                  position: "fixed",
                  bottom: 30,
                  right: 10,
                }}
              >
                <ArrowForwardIcon />
              </Fab>
            </form>
          </Stack>
        </Box>
      </Slide>
    </ArisanLayout>
  );
};

export default CreateProfile;
