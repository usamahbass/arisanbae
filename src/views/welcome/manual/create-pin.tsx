import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Slide, Stack, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Helmet from "react-helmet";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReactCodeInput from "react-code-input";
import { ArisanContext } from "context/context";
import { useSlide } from "hooks/useSlide";
import {
  setAdministratorData,
  changePreviousRoutes,
  setAuthentication,
} from "context/action";
import ArisanLayout from "layouts";

const CreatePinPages = () => {
  const isSlide = useSlide();

  const { t } = useTranslation();

  const { state, dispatch } = useContext(ArisanContext);
  const { watch, control, handleSubmit } = useForm({
    mode: "onChange",
  });

  const watchPin = watch("pin", null);

  const handleCreatePin = (values: any) => {
    dispatch(setAuthentication(true));
    dispatch(setAdministratorData(values));
    dispatch(changePreviousRoutes(state?.currentRoutes));
  };

  return (
    <ArisanLayout isScreen>
      <Helmet title={t("create_pin_admin.title")} />
      <Slide direction="left" in={isSlide}>
        <Box>
          <Stack ml=".75rem" spacing={4}>
            <Stack spacing={1} mt="1rem">
              <Typography fontSize="1.5rem">
                {t("create_pin_admin.title")}
              </Typography>
              <Typography variant="body2">
                {t("create_pin_admin.description")}
              </Typography>
            </Stack>

            <form onSubmit={handleSubmit(handleCreatePin)}>
              <Box
                display="flex"
                paddingTop="5rem"
                justifyContent="center"
                alignItems="center"
              >
                <Controller
                  name="pin"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <ReactCodeInput
                      type="number"
                      fields={5}
                      value={value}
                      defaultValue={null}
                      onChange={(val: any) => onChange(val)}
                      inputStyle={{
                        fontFamily: "monospace",
                        borderRadius: "6px",
                        apperance: "none",
                        border: "1px solid lightgrey",
                        boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px 0px",
                        margin: "4px",
                        paddingLeft: "8px",
                        width: "56px",
                        height: "62px",
                        fontSize: "32px",
                        boxSizing: "border-box",
                        color: "black",
                        backgroundColor: "white",
                        textAlign: "center",
                      }}
                    />
                  )}
                />
              </Box>

              <Button
                fullWidth
                size="large"
                type="submit"
                color="primary"
                variant="contained"
                disabled={watchPin?.length !== 5}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  color: "white",
                  position: "absolute",
                  bottom: "30px",
                  width: "88%",
                }}
              >
                {t("create_pin_admin.next_button")}
              </Button>
            </form>
          </Stack>
        </Box>
      </Slide>
    </ArisanLayout>
  );
};

export default CreatePinPages;
