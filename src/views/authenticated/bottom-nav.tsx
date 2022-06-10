import { Icon, useTheme } from "@mui/material";
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

  const theme = useTheme();

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
    <div
      className="custom-bottom-navigation"
      style={{
        backgroundColor: theme.palette.mode === "dark" ? "rgb(24, 26, 27)" : "",
        boxShadow:
          theme.palette.mode === "dark"
            ? "rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px"
            : "",
      }}
    >
      <ul>
        {NAVS.map((nav) => (
          <li
            onClick={() => onChangeNav(null, nav.value)}
            className={`custom-bottom-navigation-list ${
              navValue === nav.value ? "custom-bottom-navigation-active" : ""
            } `}
          >
            <a href="#">
              <span
                className="custom-bottom-navigation-icon"
                style={{
                  color:
                    theme.palette.mode === "dark" ? "rgb(209, 205, 199)" : "",
                }}
              >
                <Icon component={nav.icon} />
              </span>
              <span className="custom-bottom-navigation-text">{nav.label}</span>
            </a>
          </li>
        ))}

        <div
          className="custom-bottom-navigation-indicator"
          style={{
            backgroundColor:
              theme.palette.mode === "dark" ? "rgb(50, 134, 124)" : "",
            borderColor: theme.palette.mode === "dark" ? "rgb(48, 52, 54)" : "",
          }}
        />
      </ul>
    </div>
  );
};

export default BottomNav;
