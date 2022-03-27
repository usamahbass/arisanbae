import { FC } from "react";
import { Box } from "@mui/material";

const Ribbon: FC = ({ children }) => {
  return <Box className="ribbon-wrap">{children}</Box>;
};

export default Ribbon;
