import { useContext } from "react";
import { Slide, Box, Stack, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSlide } from "hooks/useSlide";
import { ArisanContext } from "context/context";
import { changeCurrentRoutes, changePreviousRoutes } from "context/action";
import { changePaymentTerm } from "helper/changePaymentTerm";
import { ROUTES_NAME } from "constants/routes";
import { toRupiah } from "helper/toRupiah";
import ArisanLayout from "layouts";

type StackResultProps = {
  title: string | any;
  result: string | any;
};

const StackResult = ({ title, result }: StackResultProps) => (
  <Stack direction="row" alignItems="center" spacing={3}>
    <Typography variant="body2" width="150px">
      {title}
    </Typography>

    <Typography variant="body2">:</Typography>
    <Typography fontWeight="bold" variant="body2" width="150px">
      {result}
    </Typography>
  </Stack>
);

const GiftResult = () => {
  const isSlide = useSlide();

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
    dispatch(changeCurrentRoutes(ROUTES_NAME.CREATE_PIN_ADMIN));
    dispatch(changePreviousRoutes(state?.currentRoutes));
  };

  const arisanGiftResult = arisanGiftFunction();

  return (
    <ArisanLayout isScreen>
      <Slide direction="left" in={isSlide}>
        <Box>
          <Stack spacing={1} mt="1rem">
            <Typography fontSize="1.5rem">Kalkulasi Hadiah</Typography>
            <Typography variant="body2">
              Berikut kalkulasi arisan {state.arisan?.name}.
            </Typography>
          </Stack>

          <Box marginTop="4rem" display="flex" justifyContent="start">
            <Stack spacing={3}>
              <StackResult
                title="Jumlah Pemenang"
                result={state?.arisan?.winners_count}
              />
              <StackResult
                title="Jumlah Member"
                result={state?.arisan?.members?.length}
              />
              <StackResult
                title="Jangka Pembayaran"
                result={changePaymentTerm(state?.arisan?.payment_term)}
              />
              <StackResult title="Iuran Arisan" result={state?.arisan?.dues} />
              <StackResult
                title="Biaya Pengelola"
                result={toRupiah(state?.arisan?.administrator?.wages)}
              />

              <StackResult title="Hadiah Pemenang" result={arisanGiftResult} />
            </Stack>
          </Box>

          <Button
            fullWidth
            size="large"
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={handleNextPage}
            sx={{
              color: "white",
              position: "absolute",
              bottom: "30px",
              width: "88%",
            }}
          >
            Selanjutnya
          </Button>
        </Box>
      </Slide>
    </ArisanLayout>
  );
};

export default GiftResult;
