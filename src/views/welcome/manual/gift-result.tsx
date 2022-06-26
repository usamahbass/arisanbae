import { useContext } from "react";
import { Slide, Box, Stack, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import Helmet from "react-helmet";
import { useSlide } from "hooks/useSlide";
import { ArisanContext } from "context/context";
import { changeCurrentRoutes, changePreviousRoutes, setAuthentication } from "context/action";
import { changePaymentTerm } from "helper/changePaymentTerm";
import { ROUTES_NAME } from "constants/routes";
import { toRupiah } from "helper/toRupiah";
import ArisanLayout from "layouts";
import StackResult from "components/stack-result";

const GiftResult = () => {
  const isSlide = useSlide();

  const { t } = useTranslation();
  const { state, dispatch } = useContext(ArisanContext);

  const arisanGiftFunction = () => {
    if (state) {
      const calculateIuran =
        state?.arisan.dues * parseInt(state.arisan?.member_count) -
        state.arisan?.administrator.wages;

      const giftResult = calculateIuran / parseInt(state.arisan?.winners_count);

      return toRupiah(giftResult);
    }

    return toRupiah(0);
  };

  const handleNextPage = () => {
    dispatch(setAuthentication(true));
    dispatch(changeCurrentRoutes(ROUTES_NAME.HOME));
    dispatch(changePreviousRoutes(state?.currentRoutes));
  };

  const arisanGiftResult = arisanGiftFunction();

  return (
    <ArisanLayout isScreen>
      <Helmet title={t("gift_result.title")} />

      <Slide direction="left" in={isSlide}>
        <Box>
          <Stack spacing={1} mt="1rem">
            <Typography fontSize="1.5rem">{t("gift_result.title")}</Typography>
            <Typography variant="body2">
              {t("gift_result.description")} {state.arisan?.name}.
            </Typography>
          </Stack>

          <Box marginTop="4rem" display="flex" justifyContent="start">
            <Stack spacing={3}>
              <StackResult
                title={t("gift_result.winner_count")}
                result={state?.arisan?.winners_count}
              />
              <StackResult
                title={t("gift_result.member_count")}
                result={state?.arisan?.members?.length}
              />
              <StackResult
                title={t("gift_result.payment_term")}
                result={changePaymentTerm(state?.arisan?.payment_term)}
              />
              <StackResult
                title={t("gift_result.dues")}
                result={toRupiah(state?.arisan?.dues)}
              />
              <StackResult
                title={t("gift_result.management_fee")}
                result={toRupiah(state?.arisan?.administrator?.wages)}
              />

              <StackResult
                title={t("gift_result.prize_winner")}
                result={arisanGiftResult}
              />
            </Stack>
          </Box>

          <Button
            fullWidth
            size="large"
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleNextPage}
            sx={{
              color: "white",
              position: "absolute",
              bottom: "30px",
              width: "92%",
            }}
          >
            {t("with_import.stats_start")}
          </Button>
        </Box>
      </Slide>
    </ArisanLayout>
  );
};

export default GiftResult;
