import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableViewIcon from "@mui/icons-material/TableView";

type BottomNavProps = {
  onChangeNav: any;
  navValue: number;
};

const BottomNav = ({ onChangeNav, navValue }: BottomNavProps) => {
  return (
    <Paper
      elevation={1}
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
    >
      <BottomNavigation showLabels value={navValue} onChange={onChangeNav}>
        <BottomNavigationAction label="Dasbor" icon={<DashboardIcon />} />
        <BottomNavigationAction label="Tabel" icon={<TableViewIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
