import { useState, useContext, useEffect } from "react";
import {
  IconButton,
  Typography,
  Box,
  Grid,
  Stack,
  Fab,
  Tooltip,
  NativeSelect,
  InputLabel,
  FormControl,
} from "@mui/material";
import Helmet from "react-helmet";
import SettingIcon from "@mui/icons-material/Settings";
import { ArisanContext } from "context/context";
import { CardWinner, CardMembers } from "components/card-stats";
import DaduIcon from "@mui/icons-material/Casino";
import { setArisanKe } from "context/action";
import { greetingFunc } from "helper/greetingFunc";
import ArisanLayout from "layouts";
import SettingViews from "./settings";
import BottomNav from "./bottom-nav";
import ChartRegion from "./chart-region";
import TableView from "./table";

const AuthenticatedPages = () => {
  const { state, dispatch } = useContext(ArisanContext);

  const [valueNav, setValueNav] = useState(0);
  const [openSetting, setOpenSetting] = useState(false);

  useEffect(() => {
    dispatch(setArisanKe(1));
  }, []);

  return (
    <ArisanLayout>
      <Helmet title={state.arisan?.name} />

      <Box paddingBottom="4rem !important">
        <Box display="flex" py="1rem" justifyContent="space-between">
          <Typography fontSize="1.2rem">
            <Typography variant="h6" fontSize="1.2rem">
              Halo, {greetingFunc()}
            </Typography>
            {state?.arisan?.administrator?.manager}
          </Typography>

          <Tooltip title="Pengaturan">
            <IconButton
              sx={{ position: "absolute", right: 10 }}
              onClick={() => setOpenSetting(true)}
            >
              <SettingIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {valueNav === 0 ? (
          <Stack spacing={5}>
            <Grid container mt={3} spacing={3}>
              <Grid item xs={6} sm={6}>
                <CardWinner />
              </Grid>

              <Grid item xs={6} sm={6}>
                <CardMembers />
              </Grid>
            </Grid>

            <ChartRegion />
          </Stack>
        ) : (
          <Stack mt={5} spacing={5}>
            <Stack direction="row" justifyContent="space-between">
              <Stack>
                <Typography fontSize="1.2rem">Tabel Arisan</Typography>
                <Typography color="#333" fontWeight={400} fontSize="1rem">
                  Berikut tabel arisan {state?.arisan?.name}.
                </Typography>
              </Stack>

              <FormControl sx={{ width: "30%" }}>
                <InputLabel variant="standard" htmlFor="arisan-ke">
                  Arisan Ke
                </InputLabel>

                <NativeSelect
                  value={state?.arisan?.arisan_ke ?? 1}
                  onChange={(event) =>
                    dispatch(setArisanKe(parseInt(event?.target.value)))
                  }
                  inputProps={{
                    name: "arisan-ke",
                    id: "arisan-ke",
                  }}
                >
                  {Array.from(
                    new Array(parseInt(state?.arisan?.member_count))
                  ).map((el, i) => {
                    const isValue = i + 1;

                    return <option value={isValue}>{isValue}</option>;
                  })}
                </NativeSelect>
              </FormControl>
            </Stack>

            <TableView />

            <Tooltip title="Koclok">
              <Fab
                color="primary"
                sx={{
                  left: "60%",
                  bottom: "15%",
                  color: "white",
                  position: "fixed",
                }}
              >
                <DaduIcon />
              </Fab>
            </Tooltip>
          </Stack>
        )}
      </Box>

      <SettingViews
        isOpen={openSetting}
        handleClose={() => setOpenSetting(false)}
      />

      <BottomNav
        navValue={valueNav}
        onChangeNav={(event: any, newValue: number) => {
          setValueNav(newValue);
        }}
      />
    </ArisanLayout>
  );
};

export default AuthenticatedPages;
