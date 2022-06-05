import { useContext } from "react";
import {
  Slide,
  Box,
  Stack,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import Helmet from "react-helmet";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSlide } from "hooks/useSlide";
import { ArisanContext } from "context/context";
import {
  setArisanMembers,
  changeCurrentRoutes,
  changePreviousRoutes,
  setArisanSchedule,
} from "context/action";
import { ROUTES_NAME } from "constants/routes";
import { createArisanKeByCount } from "helper/createArisanKeByCount";
import type { ArisanMemberTypes } from "types/core/member";
import ArisanLayout from "layouts";
import Ribbon from "components/ribbon";
import HeaderBack from "layouts/header-back";
import PhoneInput from "components/phone-input";

type ValuesType = {
  member: Array<ArisanMemberTypes>;
};

const EntryMemberPages = () => {
  const isSlide = useSlide();

  const { t } = useTranslation();
  const { state, dispatch } = useContext(ArisanContext);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const handleEntryMember = (values: ValuesType | any) => {
    const members = values.member.map(
      (isMember: ArisanMemberTypes, idx: number) => ({
        ...isMember,
        id: idx + 1,
        winner: false,
      })
    );

    const arisanSchedule = createArisanKeByCount(
      parseInt(state?.arisan?.member_count) /
        parseInt(state?.arisan?.winners_count),
      members
    );

    dispatch(setArisanMembers(members));
    dispatch(setArisanSchedule(arisanSchedule));
    dispatch(changePreviousRoutes(state?.currentRoutes));
    dispatch(changeCurrentRoutes(ROUTES_NAME.GIFT_RESULT));
  };

  return (
    <ArisanLayout isScreen>
      <Helmet title={t("entry_member.title")} />

      <Slide in={isSlide} direction="left">
        <Box>
          <HeaderBack />

          <Stack ml=".75rem" spacing={4}>
            <Stack spacing={1} mt="1rem">
              <Typography fontSize="1.5rem">
                {t("entry_member.title")}
              </Typography>
              <Typography variant="body2">
                {t("entry_member.description")}
              </Typography>
            </Stack>

            <form autoComplete="off" onSubmit={handleSubmit(handleEntryMember)}>
              <Stack
                height="calc(100vh - 300px)"
                padding=".5rem"
                overflow="auto"
                spacing={3}
              >
                {Array.from(
                  new Array(parseInt(state?.arisan?.member_count))
                ).map((el, idx) => (
                  <Box
                    border="1px solid"
                    position="relative"
                    overflow="initial"
                  >
                    <Ribbon>{idx + 1}</Ribbon>
                    <Box px="1rem" py="5rem">
                      <Stack spacing={5}>
                        <Controller
                          defaultValue=""
                          name={`member[${idx}].name`}
                          rules={{ required: true }}
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <TextField
                              fullWidth
                              value={value}
                              variant="standard"
                              label={t("entry_member.input_name")}
                              onChange={(e) => onChange(e.target.value)}
                            />
                          )}
                        />

                        <PhoneInput
                          required
                          name={`member[${idx}].telp`}
                          control={control}
                          setValue={setValue}
                          label={t("entry_member.input_phone")}
                        />
                      </Stack>
                    </Box>
                  </Box>
                ))}
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
                {t("entry_member.next_button")}
              </Button>
            </form>
          </Stack>
        </Box>
      </Slide>
    </ArisanLayout>
  );
};

export default EntryMemberPages;
