import DashboardIcon from "@mui/icons-material/Dashboard";
import TableViewIcon from "@mui/icons-material/TableView";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";

type NavProps = {
  label: string;
  value: number;
  icon: any;
};

export const NAVS: NavProps[] = [
  {
    label: "Dasbor",
    value: 0,
    icon: DashboardIcon,
  },
  {
    label: "Tabel",
    value: 1,
    icon: TableViewIcon,
  },
  {
    label: "Histori",
    value: 2,
    icon: HistoryIcon,
  },
  {
    label: "Pengaturan",
    value: 3,
    icon: SettingsIcon,
  },
];
