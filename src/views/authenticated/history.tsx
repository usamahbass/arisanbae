import { useContext } from "react";
import { Stack, Typography } from "@mui/material";
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

const History = () => {
  const { state } = useContext(ArisanContext);

  const historyData = state?.arisan?.history?.reverse();

  return (
    <Stack mt={5} spacing={5}>
      <Stack>
        <Typography fontSize="1.2rem">Histori</Typography>
        <Typography color="#333" fontWeight={400} fontSize=".85rem">
          Berikut histori aktifitas di aplikasi.
        </Typography>
      </Stack>

      <Timeline position="alternate">
        {historyData?.map((isHistory: ArisanHistoryType, idx: number) => (
          <TimelineItem key={`${isHistory.name}-${idx + 1}`}>
            <TimelineOppositeContent color="text.secondary">
              {format(isHistory.date, "Pp")}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{isHistory.name}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Stack>
  );
};

export default History;
