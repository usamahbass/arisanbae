import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
  GridSelectionModel,
  GridCellEditStopReasons,
  GridCellEditStopParams,
  MuiEvent,
} from "@mui/x-data-grid";
import {
  Chip,
  Fab,
  NativeSelect,
  InputLabel,
  FormControl,
  Typography,
  Stack,
  Tooltip,
} from "@mui/material";
import DaduIcon from "@mui/icons-material/Casino";
import { ArisanContext } from "context/context";
import { setAlreadyPaid, setArisanHistory, setArisanKe } from "context/action";
import EmptyState from "components/empty-state";
import type { Schedule } from "types/core/schedule";
import type { ArisanHistoryType } from "types/core/history";
import type { ArisanMemberTypes } from "types/core/member";
import EmptyImage from "assets/svg/done.svg";

type TableProps = {
  handleVoteWinner: Function | any;
};

const Table = ({ handleVoteWinner }: TableProps) => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(ArisanContext);

  const [isLoading, setIsLoading] = useState(false);

  const isSchedule = state.arisan?.schedule?.[state?.arisan?.arisan_ke ?? 1];

  const rows: GridRowsProp = isSchedule;

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("home.table.column.no"),
      width: 150,
      valueGetter: (params: GridValueGetterParams) => `${params.row.id}.`,
    },
    {
      field: "name",
      headerName: t("home.table.column.name"),
      width: 150,
      editable: true,
      groupable: true,
    },
    {
      field: "telp",
      headerName: t("home.table.column.telephone"),
      width: 150,
    },
    {
      field: "status",
      headerName: t("home.table.column.status"),
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const isWinner = state.arisan.members.find(
          (member: ArisanMemberTypes) => member.name === params.row.name
        ).winner;
        return (
          <Chip
            sx={{ color: "white" }}
            color={isWinner ? "primary" : "error"}
            label={isWinner ? t("home.table.win") : t("home.table.not_win")}
          />
        );
      },
    },
  ];

  const isPaidMember = isSchedule
    ?.filter((member: Schedule) => member.paid)
    .map((member: Schedule) => member.id);

  const hideCheckboxTable = state?.arisan?.arisanKeHasBeenVote?.some(
    (elem: number) => elem === state?.arisan?.arisan_ke
  );

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const isHasBeenVote: boolean = state?.arisan?.arisanKeHasBeenVote?.includes(
    state?.arisan?.arisan_ke
  );

  const disabledKoclokButton = state.arisan.schedule?.[
    state?.arisan?.arisan_ke
  ]?.some((elem: Schedule) => !elem.paid);

  return (
    <Stack mt={5} spacing={5}>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography fontSize="1.2rem">{t("home.table.title")}</Typography>
          <Typography color="#333" fontWeight={400} fontSize=".85rem">
            {t("home.table.description")} {state?.arisan?.name}.
          </Typography>
        </Stack>

        <FormControl sx={{ width: "30%" }}>
          <InputLabel variant="standard" htmlFor="arisan-ke">
            {t("home.table.select")}
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
              new Array(
                parseInt(state?.arisan?.member_count) /
                  parseInt(state?.arisan?.winners_count)
              )
            ).map((el, i) => {
              const isValue = i + 1;

              return <option value={isValue}>{isValue}</option>;
            })}
          </NativeSelect>
        </FormControl>
      </Stack>

      {/* TABLE VIEW */}

      <div style={{ height: 300, width: "100%" }}>
        {isHasBeenVote ? (
          <EmptyState
            sx={{ marginTop: "1rem" }}
            image={EmptyImage}
            text={`arisan ${state?.arisan?.arisan_ke} ${t(
              "home.table.has_been_vote"
            )}.`}
          />
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            loading={isLoading}
            selectionModel={isPaidMember}
            onSelectionModelChange={(selected: GridSelectionModel) => {
              let historyPayload: ArisanHistoryType[] = [];

              const filterWinnersMembers = isSchedule?.map(
                (member: Schedule) => {
                  if (selected.includes(member.id)) {
                    historyPayload = [
                      ...historyPayload,
                      {
                        name: `${member.name} ${t(
                          "home.history.have_paid"
                        )} ${t("home.table.select")} ${
                          state?.arisan?.arisan_ke
                        }`,
                        date: new Date(),
                      },
                    ];

                    return {
                      ...member,
                      paid: true,
                    };
                  }

                  return {
                    ...member,
                    paid: false,
                  };
                }
              );

              dispatch(setAlreadyPaid(filterWinnersMembers));
              historyPayload.map((history) =>
                dispatch(setArisanHistory(history))
              );
            }}
            checkboxSelection={!hideCheckboxTable}
            onCellEditStop={(
              params: GridCellEditStopParams,
              event: MuiEvent | any
            ) => {
              if (typeof event.target.value !== "undefined") {
                const editArisanMembersName = isSchedule?.map(
                  (member: Schedule) => {
                    if (params?.id === member?.id) {
                      return {
                        ...member,
                        [params.field]: event.target.value,
                      };
                    }

                    return member;
                  }
                );

                dispatch(setAlreadyPaid(editArisanMembersName));
              }

              if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                event.defaultMuiPrevented = true;
              }
            }}
          />
        )}
      </div>

      <Tooltip title={t("home.table.vote_button")} onClick={handleVoteWinner}>
        <Fab
          color="primary"
          sx={{ color: "white" }}
          className="custom-vote-button"
          disabled={disabledKoclokButton || isHasBeenVote}
        >
          <DaduIcon />
        </Fab>
      </Tooltip>
    </Stack>
  );
};

export default Table;
