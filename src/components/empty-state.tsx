import { Stack, Typography, StackProps } from "@mui/material";
import EmptyImage from "assets/svg/done.svg";

type EmptyStateProps = {
  text?: string;
} & StackProps;

const EmptyState = ({ text, ...rest }: EmptyStateProps) => (
  <Stack spacing={3} {...rest}>
    <img
      width="30%"
      src={EmptyImage}
      alt="emptydata"
      style={{ display: "block", margin: "0 auto" }}
    />

    <Typography align="center" variant="body2">
      {text}
    </Typography>
  </Stack>
);

export default EmptyState;
