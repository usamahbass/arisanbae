import { Stack, Typography } from "@mui/material";

type StackResultProps = {
  title: string | any;
  result: string | any;
};

const StackResult = ({ title, result }: StackResultProps) => (
  <Stack direction="row" alignItems="center" spacing={3}>
    <Typography variant="body2" width="150px">
      {title}
    </Typography>

    <Typography variant="body2">:</Typography>
    <Typography fontWeight="bold" variant="body2" width="150px">
      {result}
    </Typography>
  </Stack>
);

export default StackResult;
