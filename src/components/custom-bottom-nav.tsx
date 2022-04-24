import DashboardIcon from "@mui/icons-material/Dashboard";
import TableViewIcon from "@mui/icons-material/TableView";

const CustomBottomNav = () => {
  return (
    <div className="custom-bottom-navigation">
      <ul>
        <li className="custom-bottom-navigation-list custom-bottom-navigation-active">
          <a href="#">
            <span className="custom-bottom-navigation-icon">
              <DashboardIcon />
            </span>
            <span className="custom-bottom-navigation-text">Dasbor</span>
          </a>
        </li>

        <li className="custom-bottom-navigation-list">
          <a href="#">
            <span className="custom-bottom-navigation-icon">
              <TableViewIcon />
            </span>
            <span className="custom-bottom-navigation-text">Tabel</span>
          </a>
        </li>

        <div className="custom-bottom-navigation-indicator" />
      </ul>
    </div>
  );
};

export default CustomBottomNav;
