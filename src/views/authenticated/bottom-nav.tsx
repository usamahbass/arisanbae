import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableViewIcon from "@mui/icons-material/TableView";

const BottomNav = () => {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Dasbor" icon={<DashboardIcon />} />
        <BottomNavigationAction label="Tabel" icon={<TableViewIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
