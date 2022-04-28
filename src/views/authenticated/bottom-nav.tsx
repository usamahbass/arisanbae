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
