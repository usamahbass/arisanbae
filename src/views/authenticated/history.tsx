import { useContext, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Stack, Typography, FormControl, TextField } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  TimelineConnector,
} from "@mui/lab";
import format from "date-fns/format";
import { ArisanContext } from "context/context";
import type { ArisanHistoryType } from "types/core/history";
import EmptyState from "components/empty-state";
import EmptyImage from "assets/svg/empty.svg";

const History = () => {
  const { state } = useContext(ArisanContext);

  const [filterValue, setFilterValue] = useState<any>(new Date());

  const historyData = [...(state?.arisan?.history ?? "")]
    ?.reverse()
    ?.filter(
      (isHistory: ArisanHistoryType) =>
        format(new Date(isHistory.date), "P") ===
        format(new Date(filterValue), "P")
    );

  return (
    <Stack mt={5} spacing={5}>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography fontSize="1.2rem">Histori</Typography>
          <Typography color="#333" fontWeight={400} fontSize=".85rem">
            Berikut histori aktifitas di aplikasi.
          </Typography>
        </Stack>

        <FormControl sx={{ width: "40%" }}>
          <DatePicker
            views={["day"]}
            label="Urutkan"
            value={filterValue}
            onChange={(newValue) => setFilterValue(newValue)}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </FormControl>
      </Stack>

      <Timeline position="alternate">
        {historyData?.length > 0 ? (
          historyData?.map((isHistory: ArisanHistoryType, idx: number) => (
            <TimelineItem key={`${isHistory.name}-${idx + 1}`}>
              <TimelineOppositeContent color="text.secondary">
                {format(new Date(isHistory?.date), "Pp")}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>{isHistory.name}</TimelineContent>
            </TimelineItem>
          ))
        ) : (
          <EmptyState image={EmptyImage} text="histori kosong." />
        )}
      </Timeline>
    </Stack>
  );
};

export default History;
