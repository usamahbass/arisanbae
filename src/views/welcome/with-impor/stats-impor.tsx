import { useState } from "react";
import { Box, Slide, Typography, Stack, Button } from "@mui/material";
import StackResult from "components/stack-result";
import { toRupiah } from "helper/toRupiah";
import { useSlide } from "hooks/useSlide";
import ArisanLayout from "layouts";
import HeaderBack from "layouts/header-back";
import type { ArisanTypes } from "types/core/arisan";
import ConfirmDialog from "components/confirm-dialog";

type StatsImporProps = {
  arisanImpor: ArisanTypes;
};

const StatsImpor = ({ arisanImpor }: StatsImporProps) => {
  const isSlide = useSlide();

  const [dialogMember, setDialogMember] = useState(false);

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
            title={`Member Arisan ${arisanImpor?.name}`}
            isOpen={dialogMember}
            handleClose={() => setDialogMember(false)}
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
