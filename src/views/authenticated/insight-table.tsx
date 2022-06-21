import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { ArisanContext } from "context/context";
import { ArisanMemberTypes } from "types/core/member";

const InsightTable = () => {
  const { t } = useTranslation();
  const { state } = useContext(ArisanContext);

  const rows: GridRowsProp = state?.arisan?.members;

  const [isLoading, setIsLoading] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: t("home.dashboard.table.no"),
      width: 150,
      valueGetter: (params: GridValueGetterParams) => `${params.row.id}.`,
    },
    {
      field: "name",
      headerName: t("home.dashboard.table.name"),
      width: 150,
      editable: true,
      groupable: true,
    },
    {
      field: "telp",
      headerName: t("home.dashboard.table.telephone"),
      width: 150,
    },
    {
      field: "",
      headerName: t("home.dashboard.table.winners_ke"),
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        state.arisan?.winners?.findIndex(
          (winner: ArisanMemberTypes) => winner.name === params.row.name
        ) + 1 ?? "-",
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
        <Typography fontSize="1.2rem">
          {t("home.dashboard.table.title")}
        </Typography>
      </Stack>

      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={isLoading}
          hideFooterSelectedRowCount
        />
      </div>
    </Stack>
  );
};

export default InsightTable;
