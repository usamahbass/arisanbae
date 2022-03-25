import { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Slide,
  Stack,
  TextField,
  Typography,
  Button,
  NativeSelect,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  changeCurrentRoutes,
  changePreviousRoutes,
  setAdministratorData,
  setArisanData,
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
import { ArisanTypes } from "types/core/arisan";
import { createPaymentTermCount } from "helper/createPaymentTermCount";

const CreateProfile = () => {
  const { dispatch, state } = useContext(ArisanContext);
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const isSlide = useSlide();
  const watchPaymentTermType = watch("payment_term.type", null);
  const termName = watchPaymentTermType === "day" ? "Hari" : "Bulan";

  const handleCreateProfile = (values: any) => {
    const administratorProfile: AdministratorTypes = {
      manager: values?.manager,
      wages: convertPriceToInt(values?.wages),
    };

    const arisanData: ArisanTypes | any = {
      name: values?.arisan_name,
      dues: values?.dues,
      winners_count: values?.winners_count,
      payment_term: values?.payment_term,
      member_count: values?.member_count,
    };

    dispatch(setArisanData(arisanData));
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
    <ArisanLayout isScreen>
      <Slide in={isSlide} direction="left">
        <Box>
          <HeaderBack />

          <Stack ml=".75rem" spacing={4}>
            <Stack spacing={1} mt="1rem">
              <Typography fontSize="1.5rem">Daftar</Typography>
              <Typography variant="body2">
                Lengkapi data arisan kamu di bawah ini, ya
              </Typography>
            </Stack>

            <form
              autoComplete="off"
              onSubmit={handleSubmit(handleCreateProfile)}
            >
              <Stack height="380px" overflow="auto" spacing={3}>
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

                <Controller
                  name="dues"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="medium"
                      label="Iuran Arisan"
                      variant="standard"
                      value={value}
                      sx={{ fontWeight: 400 }}
                      defaultValue={state?.arisan?.dues}
                      onChange={({ target: { value: valueInput } }) =>
                        onChange(valueInput)
                      }
                      InputProps={{
                        inputComponent: PriceInput,
                      }}
                    />
                  )}
                />

                <Controller
                  name="member_count"
                  control={control}
                  defaultValue={null}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="medium"
                      type="number"
                      label="Jumlah orang yang ikut"
                      variant="standard"
                      value={value}
                      sx={{ fontWeight: 400, color: "#333" }}
                      defaultValue={state?.arisan?.member_count}
                      onChange={({ target: { value: valueInput } }) =>
                        onChange(valueInput)
                      }
                    />
                  )}
                />

                <FormControl>
                  <InputLabel variant="standard" htmlFor="payment_term_type">
                    Tipe jangka iuran
                  </InputLabel>

                  <Controller
                    name="payment_term.type"
                    control={control}
                    defaultValue={null}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <NativeSelect
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        inputProps={{
                          id: "payment_term_type",
                        }}
                      >
                        <option value="day">Hari</option>
                        <option value="month">Bulan</option>
                      </NativeSelect>
                    )}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel variant="standard" htmlFor="payment_term_content">
                    Jangka iuran ({termName})
                  </InputLabel>

                  <Controller
                    name="payment_term.content"
                    control={control}
                    defaultValue={null}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <NativeSelect
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        inputProps={{
                          id: "payment_term_content",
                        }}
                      >
                        {createPaymentTermCount(watchPaymentTermType)?.map(
                          (el) => (
                            <option key={el} value={el}>
                              {el} {termName}
                            </option>
                          )
                        )}
                      </NativeSelect>
                    )}
                  />
                </FormControl>

                <Controller
                  name="winners_count"
                  control={control}
                  defaultValue={null}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="medium"
                      type="number"
                      label="Jumlah orang yang dapat"
                      variant="standard"
                      value={value}
                      sx={{
                        fontWeight: 400,
                        color: "#333",
                        appearance: "none",
                      }}
                      defaultValue={state?.arisan?.winners_count}
                      onChange={({ target: { value: valueInput } }) =>
                        onChange(valueInput)
                      }
                    />
                  )}
                />
              </Stack>

              <Button
                fullWidth
                size="large"
                type="submit"
                color="primary"
                variant="contained"
                disabled={!isValid}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  color: "white",
                  position: "absolute",
                  bottom: "30px",
                  width: "88%",
                }}
              >
                Selanjutnya
              </Button>
            </form>
          </Stack>
        </Box>
      </Slide>
    </ArisanLayout>
  );
};

export default CreateProfile;
