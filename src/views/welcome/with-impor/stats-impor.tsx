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
} from "@mui/material";
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

type StatsImporProps = {
  arisanImpor: ArisanTypes;
};

const StatsImpor = ({ arisanImpor }: StatsImporProps) => {
  const isSlide = useSlide();
  const { dispatch } = useContext(ArisanContext);

  const [dialogMember, setDialogMember] = useState(false);

  const handleStartArisan = () => {
    const arisanData = {
      arisan: arisanImpor,
      auth: true,
      nextRoutes: null,
      previousRoutes: null,
      currentRoutes: ROUTES_NAME.HOME,
      language: getCurrentLanguage(),
    };

    dispatch(setAppData(arisanData));
  };

  return (
    <ArisanLayout isScreen>
      <Slide in={isSlide} direction="left">
        <Box>
          <HeaderBack />

          <Stack ml=".75rem" spacing={5}>
            <Stack spacing={1} mt="1rem">
              <Typography fontSize="1.5rem">Statistik Impor</Typography>
              <Typography variant="body2">
                Berikut statistik impor data.
              </Typography>
            </Stack>

            <Stack spacing={3}>
              <StackResult title="Nama" result={arisanImpor?.name} />
              <StackResult
                title="Pengelola"
                result={arisanImpor?.administrator?.manager}
              />
              <StackResult
                title="Upah Pengelola"
                result={toRupiah(arisanImpor?.administrator?.wages)}
              />
              <StackResult
                title="PIN"
                result={arisanImpor?.administrator?.pin}
              />
              <StackResult title="Iuran" result={toRupiah(arisanImpor?.dues)} />
              <StackResult
                title="Jangka Pembayaran"
                result={`${arisanImpor?.payment_term?.content} ${
                  arisanImpor?.payment_term?.type === "month" ? "Bulan" : "Hari"
                }`}
              />
              <StackResult
                title="Jumlah Member"
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
                Lihat Member
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
                Mulai
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
              Tutup
            </Button>
          </ConfirmDialog>
        </Box>
      </Slide>
    </ArisanLayout>
  );
};

export default StatsImpor;
