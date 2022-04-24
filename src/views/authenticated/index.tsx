import { useState, useContext, useEffect } from "react";
import {
  IconButton,
  Typography,
  Box,
  Grid,
  Stack,
  Tooltip,
  Slide,
} from "@mui/material";
import Helmet from "react-helmet";
import SettingIcon from "@mui/icons-material/Settings";
import { ArisanContext } from "context/context";
import { CardWinner, CardMembers } from "components/card-stats";
import type { Schedule } from "types/core/schedule";
import type { ArisanMemberTypes } from "types/core/member";
import {
  setArisanKe,
  setArisanMembers,
  setArisanSchedule,
  setArisanKeHasBeenVote,
} from "context/action";
import { greetingFunc } from "helper/greetingFunc";
import { pickRandomWinner } from "helper/pickRandomWinner";
import ArisanLayout from "layouts";
import SettingViews from "./settings";
import BottomNav from "./bottom-nav";
import TableView from "./table";
import ModalWinner from "components/modal-winner";
import ConfirmDialog from "components/confirm-dialog";
import LoadingOverlay from "components/loading-overlay";
import History from "./history";

const AuthenticatedPages = () => {
  const { state, dispatch } = useContext(ArisanContext);

  const [winners, setWinners] = useState([]);
  const [valueNav, setValueNav] = useState(0);
  const [openSetting, setOpenSetting] = useState(false);
  const [openModalWinner, setOpenModalWinner] = useState(false);
  const [loadingFindWinner, setLoadingFindWinner] = useState(false);
  const [openModalConfirmVote, setOpenModalConfirmVote] = useState(false);

  const handleVoteArisan = () => {
    // set loading state, close confirmation dialog
    setLoadingFindWinner(true);
    setOpenModalConfirmVote(false);

    const isNameMapper = state?.arisan?.members
      ?.filter((member: ArisanMemberTypes) => !member.winner)
      .map((member: ArisanMemberTypes) => member.name);

    const isRandomWinner = pickRandomWinner(
      isNameMapper,
      parseInt(state?.arisan?.winners_count)
    );

    const isWinners = state.arisan.members.filter((member: ArisanMemberTypes) =>
      isRandomWinner.includes(member.name)
    );

    const newArisanMemberField = state.arisan.members.map(
      (member: ArisanMemberTypes) => {
        // if winner
        if (isRandomWinner.includes(member.name)) {
          // change winner field to true

          const memberWinner: ArisanMemberTypes = {
            ...member,
            winner: true,
          };

          return memberWinner;
        }

        return member;
      }
    );

    const newArisanScheduleField = state.arisan.schedule[
      state.arisan.arisan_ke
    ].map((schedule: Schedule) => {
      if (isRandomWinner.includes(schedule.name)) {
        // change winner field to true

        const scheduleWinner: ArisanMemberTypes = {
          ...schedule,
          winner: true,
        };

        return scheduleWinner;
      }

      return schedule;
    });

    setTimeout(() => {
      setLoadingFindWinner(false);
      setOpenModalWinner(true);
      setWinners(isWinners);

      dispatch(setArisanKeHasBeenVote(state.arisan.arisan_ke));
      dispatch(setArisanMembers(newArisanMemberField));
      dispatch(
        setArisanSchedule({
          ...state.arisan.schedule,
          [state.arisan.arisan_ke]: newArisanScheduleField,
        })
      );
    }, 1000);
  };

  useEffect(() => {
    dispatch(setArisanKe(1));
  }, []);

  useEffect(() => {
    if (valueNav === 3) {
      setOpenSetting(true);
    }
  }, [valueNav]);

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

        <Slide direction="left" in={valueNav === 0}>
          <Box display={valueNav === 0 ? "block" : "none"}>
            <Stack spacing={5}>
              <Grid container mt={3} spacing={3}>
                <Grid item xs={6} sm={6}>
                  <CardWinner />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <CardMembers />
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Slide>

        <Slide direction="left" in={valueNav === 1}>
          <Box display={valueNav === 1 ? "block " : "none"}>
            <TableView handleVoteWinner={() => setOpenModalConfirmVote(true)} />
          </Box>
        </Slide>

        <Slide direction="left" in={valueNav === 2}>
          <Box display={valueNav === 2 ? "block " : "none"}>
            <History />
          </Box>
        </Slide>
      </Box>

      <SettingViews
        isOpen={openSetting}
        handleClose={() => {
          setOpenSetting(false);
          setValueNav(0);
        }}
      />

      <ModalWinner
        winners={winners}
        isOpen={openModalWinner}
        onClose={() => setOpenModalWinner(false)}
      />

      <ConfirmDialog
        description=""
        isOpen={openModalConfirmVote}
        handleConfirm={handleVoteArisan}
        title="Apakah anda ingin mengundi pemenang arisan ini?"
        handleClose={() => setOpenModalConfirmVote(false)}
      />

      <LoadingOverlay isOpen={loadingFindWinner} />

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
