import { Icon } from "@mui/material";
import { useTranslation } from "react-i18next";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableViewIcon from "@mui/icons-material/TableView";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";

type BottomNavProps = {
  onChangeNav: any;
  navValue: number;
};

type NavProps = {
  label: string;
  value: number;
  icon: any;
};

const BottomNav = ({ onChangeNav, navValue }: BottomNavProps) => {
  const { t } = useTranslation();

  const NAVS: NavProps[] = [
    {
      label: t("home.dashboard.title"),
      value: 0,
      icon: DashboardIcon,
    },
    {
      label: t("home.table.title"),
      value: 1,
      icon: TableViewIcon,
    },
    {
      label: t("home.history.title"),
      value: 2,
      icon: HistoryIcon,
    },
    {
      label: "Pengaturan",
      value: 3,
      icon: SettingsIcon,
    },
  ];

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
