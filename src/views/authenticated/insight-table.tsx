import { useContext, useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { ArisanContext } from "context/context";

const InsightTable = () => {
  const { state } = useContext(ArisanContext);

  const rows: GridRowsProp = state?.arisan?.members;

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
      field: "winner_ke",
      headerName: "Pemenang Ke",
      width: 150,
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
