import { Stack, Typography, StackProps } from "@mui/material";

type EmptyStateProps = {
  text?: string;
  image: string;
} & StackProps;

const EmptyState = ({ image, text, ...rest }: EmptyStateProps) => (
  <Stack spacing={3} {...rest}>
    <img
      width="60%"
      src={image}
      alt="emptydata"
      style={{ display: "block", margin: "0 auto" }}
    />

    <Typography align="center" variant="body2">
      {text}
    </Typography>
  </Stack>
);

export default EmptyState;
