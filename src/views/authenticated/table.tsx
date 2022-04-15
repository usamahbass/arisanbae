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
import { Chip } from "@mui/material";
import { ArisanContext } from "context/context";
import { setAlreadyPaid, setArisanKe } from "context/action";
import type { Schedule } from "types/core/schedule";

const Table = () => {
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
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          color={params.row.winner ? "primary" : "error"}
          label={params.row.winner ? "Menang" : "Belum Menang"}
        />
      ),
    },
  ];

  const isPaidMember = isSchedule
    ?.filter((member: Schedule) => member.paid)
    .map((member: Schedule) => member.id);

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

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={isLoading}
        hideFooterSelectedRowCount
        selectionModel={isPaidMember}
        onSelectionModelChange={(selected: GridSelectionModel) => {
          const filterWinnersMembers = isSchedule?.map((member: Schedule) => {
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
          });

          dispatch(setAlreadyPaid(filterWinnersMembers));
        }}
        checkboxSelection
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
    </div>
  );
};

export default Table;
