import { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Slide, Stack, TextField, Typography, Fab } from "@mui/material";
import {
  setArisanName,
  changeCurrentRoutes,
  changePreviousRoutes,
  setAdministratorData,
} from "context/action";
import { useSlide } from "hooks/useSlide";
import { ArisanContext } from "context/context";
import { ROUTES_NAME } from "constants/routes";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { AdministratorTypes } from "types/core/administrator";
import { convertPriceToInt } from "helper/convertPriceToInt";
import ArisanLayout from "layouts";
import PriceInput from "components/price-input";
import HeaderBack from "layouts/header-back";

const CreateProfile = () => {
  const { dispatch, state } = useContext(ArisanContext);
  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const isSlide = useSlide();

  const handleCreateProfile = (values: any) => {
    const administratorProfile: AdministratorTypes = {
      manager: values?.manager,
      wages: convertPriceToInt(values?.wages),
    };

    dispatch(setArisanName(values?.arisan_name));
    dispatch(setAdministratorData(administratorProfile));
    dispatch(changeCurrentRoutes(ROUTES_NAME.CREATE_PIN_ADMIN));
    dispatch(changePreviousRoutes(state?.currentRoutes));
  };

  useEffect(() => {
    if (state?.arisan) {
      setTimeout(() => {
        setValue("arisan_name", state?.arisan?.name);
        setValue("manager", state?.arisan?.administrator?.manager);
        setValue("wages", state?.arisan?.administrator?.wages);
      }, 300);
    }
  }, [state?.arisan]);

  return (
    <ArisanLayout>
      <Slide in={isSlide} direction="left">
        <Box height="100vh">
          <HeaderBack />

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
                      variant="standard"
                      value={value}
                      sx={{ fontWeight: 400, color: "#333" }}
                      defaultValue={state?.arisan?.name}
                      onChange={({ target: { value: valueInput } }) =>
                        onChange(valueInput)
                      }
                    />
                  )}
                />

                <Controller
                  name="manager"
                  control={control}
                  defaultValue={null}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="medium"
                      label="Pengelola"
                      variant="standard"
                      value={value}
                      sx={{ fontWeight: 400 }}
                      defaultValue={state?.arisan?.administrator?.manager}
                      onChange={({ target: { value: valueInput } }) =>
                        onChange(valueInput)
                      }
                    />
                  )}
                />

                <Controller
                  name="wages"
                  control={control}
                  defaultValue={0}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="medium"
                      label="Upah Pengelola"
                      variant="standard"
                      value={value}
                      sx={{ fontWeight: 400 }}
                      defaultValue={state?.arisan?.administrator?.wages}
                      onChange={({ target: { value: valueInput } }) =>
                        onChange(valueInput)
                      }
                      InputProps={{
                        inputComponent: PriceInput,
                      }}
                      helperText="upah setiap dilakukan pengundingan."
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
