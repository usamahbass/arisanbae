import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Icon,
} from "@mui/material";
import { NAVS } from "constants/nav";

type BottomNavProps = {
  onChangeNav: any;
  navValue: number;
};

const BottomNav = ({ onChangeNav, navValue }: BottomNavProps) => {
  return (
    // <Paper
    //   elevation={3}
    //   sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
    // >
    //   <BottomNavigation showLabels value={navValue} onChange={onChangeNav}>
    //     <BottomNavigationAction label="Dasbor" icon={<DashboardIcon />} />
    //     <BottomNavigationAction label="Tabel" icon={<TableViewIcon />} />
    //   </BottomNavigation>
    // </Paper>

    <div className="custom-bottom-navigation">
      <ul>
        {NAVS.map((nav) => (
          <li
            onClick={() => onChangeNav(null, nav.value)}
            className={`custom-bottom-navigation-list ${
              navValue === nav.value ? "custom-bottom-navigation-active" : ""
            } `}
          >
            <a href="#">
              <span className="custom-bottom-navigation-icon">
                <Icon component={nav.icon} />
              </span>
              <span className="custom-bottom-navigation-text">{nav.label}</span>
            </a>
          </li>
        ))}

        <div className="custom-bottom-navigation-indicator" />
      </ul>
    </div>
  );
};

export default BottomNav;
