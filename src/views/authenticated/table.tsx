import { useContext, useState, useEffect } from "react";
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
import { setAlreadyPaid, setArisanKe } from "context/action";
import type { ArisanMemberTypes } from "types/core/member";
import type { Schedule } from "types/core/schedule";
import EmptyState from "components/empty-state";

type TableProps = {
  handleVoteWinner: Function | any;
};

const Table = ({ handleVoteWinner }: TableProps) => {
  const { state, dispatch } = useContext(ArisanContext);

  const [isLoading, setIsLoading] = useState(false);

  const isSchedule = state.arisan?.schedule?.[state?.arisan?.arisan_ke ?? 1];

  const rows: GridRowsProp = isSchedule;

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No",
      width: 150,
      valueGetter: (params: GridValueGetterParams) => `${params.row.id}.`,
    },
    {
      field: "name",
      headerName: "Nama",
      width: 150,
      editable: true,
      groupable: true,
    },
    {
      field: "telp",
      headerName: "Telepon",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const isWinner = state.arisan.members.find(
          (member: ArisanMemberTypes) => member.name === params.row.name
        ).winner;
        return (
          <Chip
            sx={{ color: "white" }}
            color={isWinner ? "primary" : "error"}
            label={isWinner ? "Menang" : "Belum Menang"}
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

  // useEffect(() => {
  //   const memberCount = parseInt(state?.arisan?.member_count);
  //   const currentSchedule = state?.arisan?.schedule?.[state?.arisan?.arisan_ke];

  //   const isPaidInCurrentSchedule = currentSchedule?.filter(
  //     (schedule: Schedule) => !schedule.paid
  //   );

  //   if (isPaidInCurrentSchedule <= 0 && memberCount > 1) {
  //     dispatch(setArisanKe(state?.arisan?.arisan_ke + 1));
  //   }
  // }, [state?.arisan?.schedule]);

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
          <Typography fontSize="1.2rem">Tabel Arisan</Typography>
          <Typography color="#333" fontWeight={400} fontSize=".85rem">
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
            {Array.from(new Array(parseInt(state?.arisan?.member_count))).map(
              (el, i) => {
                const isValue = i + 1;

                return <option value={isValue}>{isValue}</option>;
              }
            )}
          </NativeSelect>
        </FormControl>
      </Stack>

      {/* TABLE VIEW */}

      <div style={{ height: 300, width: "100%" }}>
        {isHasBeenVote ? (
          <EmptyState
            sx={{ marginTop: "1rem" }}
            text={`arisan ${state?.arisan?.arisan_ke} telah diundi.`}
          />
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            loading={isLoading}
            hideFooterSelectedRowCount
            selectionModel={isPaidMember}
            onSelectionModelChange={(selected: GridSelectionModel) => {
              const filterWinnersMembers = isSchedule?.map(
                (member: Schedule) => {
                  if (selected.includes(member.id)) {
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

      <Tooltip title="Undi Pemenang" onClick={handleVoteWinner}>
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
