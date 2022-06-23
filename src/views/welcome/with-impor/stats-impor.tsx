import { useContext, useState } from "react";
import {
  Box,
  Slide,
  Typography,
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { toRupiah } from "helper/toRupiah";
import { stringAvatar } from "helper/stringAvatar";
import { useSlide } from "hooks/useSlide";
import { setAppData } from "context/action";
import { ROUTES_NAME } from "constants/routes";
import { getCurrentLanguage } from "helper/getCurrentLanguage";
import { ArisanContext } from "context/context";
import type { ArisanTypes } from "types/core/arisan";
import StackResult from "components/stack-result";
import ArisanLayout from "layouts";
import HeaderBack from "layouts/header-back";
import ConfirmDialog from "components/confirm-dialog";
import PageTitle from "components/page-title";

type StatsImporProps = {
  arisanImpor: ArisanTypes | undefined;
};

const StatsImpor = ({ arisanImpor }: StatsImporProps) => {
  const theme = useTheme();
  const isSlide = useSlide();
  const { t } = useTranslation();
  const { dispatch } = useContext(ArisanContext);

  const [dialogMember, setDialogMember] = useState(false);

  const handleStartArisan = () => {
    const arisanData = {
      arisan: arisanImpor,
      auth: true,
      theme: theme.palette.mode,
      nextRoutes: null,
      previousRoutes: null,
      currentRoutes: ROUTES_NAME.HOME,
      language: getCurrentLanguage(),
    };

    dispatch(setAppData(arisanData));
  };

  return (
    <ArisanLayout isScreen>
      <PageTitle title={`${arisanImpor?.name} - ArisanBae`} />
      <Slide in={isSlide} direction="left">
        <Box>
          <HeaderBack />

          <Stack ml=".75rem" spacing={5}>
            <Stack spacing={1} mt="1rem">
              <Typography fontSize="1.5rem">
                {t("with_import.stats_title")}
              </Typography>
              <Typography variant="body2">
                {t("with_import.stats_title")}.
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <StackResult
                title={t("with_import.stats_name")}
                result={arisanImpor?.name}
              />
              <StackResult
                title={t("with_import.stats_manager")}
                result={arisanImpor?.administrator?.manager}
              />
              <StackResult
                title={t("with_import.stats_manager_wages")}
                result={toRupiah(arisanImpor?.administrator?.wages)}
              />
              <StackResult
                title={t("with_import.stats_dues")}
                result={toRupiah(arisanImpor?.dues)}
              />
              <StackResult
                title={t("with_import.stats_payment_term")}
                result={`${arisanImpor?.payment_term?.content} ${
                  arisanImpor?.payment_term?.type === "month" ? "Bulan" : "Hari"
                }`}
              />
              <StackResult
                title={t("with_import.stats_member_count")}
                result={arisanImpor?.member_count}
              />
            </Stack>

            <Stack>
              <Button
                fullWidth
                size="large"
                type="button"
                color="info"
                variant="contained"
                onClick={() => setDialogMember(true)}
                sx={{
                  color: "white",
                  position: "absolute",
                  bottom: "70px",
                  width: "89%",
                }}
              >
                {t("with_import.stats_see_member")}
              </Button>

              <Button
                fullWidth
                size="large"
                type="button"
                color="primary"
                variant="contained"
                onClick={handleStartArisan}
                sx={{
                  color: "white",
                  position: "absolute",
                  bottom: "10px",
                  width: "89%",
                }}
              >
                {t("with_import.stats_start")}
              </Button>
            </Stack>
          </Stack>

          <ConfirmDialog
            customActions
            isOpen={dialogMember}
            description={
              <List>
                {arisanImpor?.members?.map((member) => (
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar {...stringAvatar(member.name)} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={member.name}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {member.winner}
                          </Typography>
                          {`${member.telp}`}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            }
            handleClose={() => setDialogMember(false)}
            title={`Member Arisan ${arisanImpor?.name}`}
          >
            <Button color="error" onClick={() => setDialogMember(false)}>
              {t("with_import.stats_close")}
            </Button>
          </ConfirmDialog>
        </Box>
      </Slide>
    </ArisanLayout>
  );
};

export default StatsImpor;
