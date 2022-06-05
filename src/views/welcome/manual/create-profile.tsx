import { useContext, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
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
import { useTranslation } from "react-i18next";
import Helmet from "react-helmet";
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
import { createPaymentTermCount } from "helper/createPaymentTermCount";
import type { AdministratorTypes } from "types/core/administrator";
import type { ArisanTypes } from "types/core/arisan";
import { convertPriceToInt } from "helper/convertPriceToInt";
import ArisanLayout from "layouts";
import PriceInput from "components/price-input";
import HeaderBack from "layouts/header-back";
import { isOdd } from "helper/isOdd";

const CreateProfile = () => {
  const { dispatch, state } = useContext(ArisanContext);
  const {
    watch,
    control,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { t } = useTranslation();

  const isSlide = useSlide();
  const watchPaymentTermType = watch("payment_term.type", null);
  const termName =
    watchPaymentTermType === "day"
      ? t("create_profile_admin.day")
      : t("create_profile_admin.month");

  const watchMemberCount = useWatch({ name: "member_count", control });
  const watchWinnerCount = useWatch({ name: "winners_count", control });
  // const watchMemberCount = watch("member_count", null);
  // const watchWinnerCount = watch("winners_count", null);

  const handleCreateProfile = (values: any) => {
    const administratorProfile: AdministratorTypes = {
      manager: values?.manager,
      wages: convertPriceToInt(values?.wages),
    };

    const arisanData: ArisanTypes | any = {
      name: values?.arisan_name,
      dues: convertPriceToInt(values?.dues),
      winners_count: values?.winners_count,
      payment_term: values?.payment_term,
      member_count: values?.member_count,
    };

    dispatch(setArisanData(arisanData));
    dispatch(setAdministratorData(administratorProfile));
    dispatch(changeCurrentRoutes(ROUTES_NAME.ENTRY_MEMBER));
    dispatch(changePreviousRoutes(state?.currentRoutes));
  };

  useEffect(() => {
    setValue("payment_term.type", "month");
    setValue("payment_term.content", "1");
  }, []);

  useEffect(() => {
    const isNotValidWinner =
      parseInt(watchMemberCount) < parseInt(watchWinnerCount);

    // check isOdd members_count

    const isOddMemberCount = isOdd(parseInt(watchMemberCount));

    if (isNotValidWinner) {
      setError("winners_count", {
        message: t("create_profile_admin.error_input_six"),
      });
    }

    if (isOddMemberCount && !isOdd(watchWinnerCount)) {
      setError("winners_count", {
        message: t("create_profile_admin.error_input_six"),
      });
    }

    return () => clearErrors("winners_count");
  }, [watchMemberCount, watchWinnerCount]);

  useEffect(() => {
    if (state?.arisan) {
      setTimeout(() => {
        setValue("arisan_name", state?.arisan?.name);
        setValue("manager", state?.arisan?.administrator?.manager);
        setValue("wages", state?.arisan?.administrator?.wages);
        setValue("dues", state?.arisan?.dues);
        setValue("member_count", state?.arisan?.member_count);
        setValue("payment_term.type", state?.arisan?.payment_term?.type);
        setValue("payment_term.content", state?.arisan?.payment_term?.content);
        setValue("winners_count", state?.arisan?.winners_count);
      }, 300);
    }
  }, [state?.arisan]);

  return (
    <ArisanLayout isScreen>
      <Helmet title={t("create_profile_admin.title")} />
      <Slide in={isSlide} direction="left">
        <Box>
          <HeaderBack />

          <Stack ml=".75rem" spacing={4}>
            <Stack spacing={1} mt="1rem">
              <Typography fontSize="1.5rem">
                {t("create_profile_admin.title")}
              </Typography>
              <Typography variant="body2">
                {t("create_profile_admin.description")}
              </Typography>
            </Stack>

            <form
              autoComplete="off"
              onSubmit={handleSubmit(handleCreateProfile)}
            >
              <Stack height="calc(100vh - 280px)" overflow="auto" spacing={3}>
                <Controller
                  name="arisan_name"
                  control={control}
                  defaultValue={null}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="medium"
                      label={t("create_profile_admin.input_one")}
                      variant="standard"
                      value={value}
                      sx={{ fontWeight: 400, color: "#333" }}
                      error={errors?.arisan_name}
                      helperText={
                        errors?.arisan_name &&
                        t("create_profile_admin.error_input_one")
                      }
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
                      label={t("create_profile_admin.input_two")}
                      variant="standard"
                      value={value}
                      sx={{ fontWeight: 400 }}
                      error={errors?.manager}
                      helperText={
                        errors?.manager &&
                        t("create_profile_admin.error_input_two")
                      }
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
                      label={t("create_profile_admin.input_three")}
                      variant="standard"
                      value={value}
                      sx={{ fontWeight: 400 }}
                      error={errors?.wages}
                      onChange={({ target: { value: valueInput } }) =>
                        onChange(valueInput)
                      }
                      InputProps={{
                        inputComponent: PriceInput,
                      }}
                      helperText={
                        errors?.wages
                          ? t("create_profile_admin.error_input_three")
                          : t("create_profile_admin.helper_input_three")
                      }
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
                      label={t("create_profile_admin.input_four")}
                      variant="standard"
                      value={value}
                      sx={{ fontWeight: 400 }}
                      error={errors?.dues}
                      onChange={({ target: { value: valueInput } }) =>
                        onChange(valueInput)
                      }
                      InputProps={{
                        inputComponent: PriceInput,
                      }}
                      helperText={
                        errors?.dues &&
                        t("create_profile_admin.error_input_four")
                      }
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
                      label={t("create_profile_admin.input_five")}
                      variant="standard"
                      value={value}
                      sx={{
                        fontWeight: 400,
                        color: "#333",
                      }}
                      error={errors?.member_count}
                      helperText={
                        errors?.member_count &&
                        t("create_profile_admin.error_input_five")
                      }
                      defaultValue={state?.arisan?.member_count}
                      onChange={({ target: { value: valueInput } }) =>
                        onChange(valueInput)
                      }
                    />
                  )}
                />

                {/* {watchMemberCount && ( */}
                <Controller
                  name="winners_count"
                  control={control}
                  defaultValue={null}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="medium"
                      type="number"
                      error={errors?.winners_count}
                      label={t("create_profile_admin.input_six")}
                      variant="standard"
                      value={value}
                      helperText={
                        errors?.winners_count?.message ??
                        t("create_profile_admin.error_input_six")
                      }
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
                {/* )} */}

                <FormControl>
                  <InputLabel variant="standard" htmlFor="payment_term_type">
                    {t("create_profile_admin.input_seven")}
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
                        <option value="day">
                          {t("create_profile_admin.day")}
                        </option>
                        <option value="month">
                          {t("create_profile_admin.month")}
                        </option>
                      </NativeSelect>
                    )}
                  />
                </FormControl>

                <FormControl>
                  <InputLabel variant="standard" htmlFor="payment_term_content">
                    {t("create_profile_admin.input_eight")} {`(${termName})`}
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
              </Stack>

              <Button
                fullWidth
                size="large"
                type="submit"
                color="primary"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  color: "white",
                  position: "absolute",
                  bottom: "30px",
                  width: "88%",
                }}
              >
                {t("create_profile_admin.next_button")}
              </Button>
            </form>
          </Stack>
        </Box>
      </Slide>
    </ArisanLayout>
  );
};

export default CreateProfile;
