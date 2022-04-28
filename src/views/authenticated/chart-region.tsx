import { useContext } from "react";
import { ArisanMemberTypes } from "types/core/member";
import { Card, Typography } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import { ArisanContext } from "context/context";
import ReactApexChart from "react-apexcharts";
import { LANGUAGE, PHONE } from "constants/language";

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    flexDirection: "row !important",
    justifyContent: "center !important",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

const ChartRegion = () => {
  const theme = useTheme();
  const { state } = useContext(ArisanContext);

  const findIDTelp = state?.arisan?.members?.filter(
    (member: ArisanMemberTypes) => member.telp.includes(PHONE.ID)
  )?.length;
  const findENTelp = state?.arisan?.members?.filter(
    (member: ArisanMemberTypes) => member.telp.includes(PHONE.EN)
  )?.length;

  const chartOptions: any = {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
    labels: LANGUAGE.map((lang) => lang.region),
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: "center" },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName: any) => seriesName,
        title: {
          formatter: (seriesName: any) => `#${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  };

  return (
    <Card>
      <Typography p="1rem" fontSize="1.2rem">
        Negara Asal
      </Typography>
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart
          type="pie"
          height={280}
          options={chartOptions}
          series={[findIDTelp, findENTelp]}
        />
      </ChartWrapperStyle>
    </Card>
  );
};

export default ChartRegion;
