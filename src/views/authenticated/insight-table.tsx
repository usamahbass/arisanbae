import { useContext, useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { ArisanContext } from "context/context";
import type { Schedule } from "types/core/schedule";
import type { ArisanMemberTypes } from "types/core/member";

const InsightTable = () => {
  const { state } = useContext(ArisanContext);

  const rows: GridRowsProp = state?.arisan?.members?.map(
    (member: ArisanMemberTypes, idx: number) => {
      const customID = idx + 1;

      if (
        state?.arisan?.schedule?.[customID]?.some(
          (elem: Schedule) => elem.winner
        )
      ) {
        return { ...member, winner: true, winner_count: customID };
      }

      return member;
    }
  );

  const [isLoading, setIsLoading] = useState(false);

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
      field: "",
      headerName: "Pemenang Ke",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        params?.row?.winner ? `${params?.row?.winner_count ?? "-"}` : `-`,
    },
  ];

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Stack mt={5} spacing={5}>
      <Stack>
        <Typography fontSize="1.2rem">Tabel Member</Typography>
      </Stack>

      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={isLoading}
          hideFooterSelectedRowCount
          componentsProps={{
            pagination: {
              labelRowsPerPage: "Baris per halaman",
            },
          }}
        />
      </div>
    </Stack>
  );
};

export default InsightTable;
