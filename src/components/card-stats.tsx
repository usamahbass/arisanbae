import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Card, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import WinnersIcon from "@mui/icons-material/EmojiEvents";
import MembersIcon from "@mui/icons-material/People";
import { ArisanContext } from "context/context";
import type { ArisanMemberTypes } from "types/core/member";

const RootStyleWinner = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.success.dark,
  backgroundColor: theme.palette.success.light,
}));

const RootStyleMember = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.info.dark,
  backgroundColor: theme.palette.info.light,
}));

const IconWrapperStyleWinner = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.success.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.success.dark,
    0
  )} 0%, ${alpha(theme.palette.success.dark, 0.24)} 100%)`,
}));

const IconWrapperStyleMember = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.info.dark,
    0
  )} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`,
}));

const CardWinner = () => {
  const { t } = useTranslation();
  const { state } = useContext(ArisanContext);

  const isWinnersCount = state?.arisan?.members?.filter(
    (member: ArisanMemberTypes) => member.winner
  )?.length;

  return (
    <RootStyleWinner>
      <IconWrapperStyleWinner>
        <WinnersIcon />
      </IconWrapperStyleWinner>
      <Typography variant="h3">{isWinnersCount}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {t("home.dashboard.winners")}
      </Typography>
    </RootStyleWinner>
  );
};

const CardMembers = () => {
  const { t } = useTranslation();
  const { state } = useContext(ArisanContext);

  return (
    <RootStyleMember>
      <IconWrapperStyleMember>
        <MembersIcon />
      </IconWrapperStyleMember>
      <Typography variant="h3">
        {parseInt(state?.arisan?.member_count)}
      </Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {t("home.dashboard.member_count")}
      </Typography>
    </RootStyleMember>
  );
};

export { CardWinner, CardMembers };
