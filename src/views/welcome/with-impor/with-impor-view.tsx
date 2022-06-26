import { useEffect, useState } from "react";
import { Box, Slide } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { DropzoneArea } from "react-mui-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useSlide } from "hooks/useSlide";
import { arisanField } from "constants/field";
import ArisanLayout from "layouts";
import HeaderBack from "layouts/header-back";
import StatsImpor from "./stats-impor";
import PageTitle from "components/page-title";

const useDropzoneStyle = makeStyles(() => ({
  dropzoneContainer: {
    position: "relative",
    top: "70px",
    height: "400px",
    padding: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dropzoneTitle: {
    fontSize: "1.2rem !important",
    marginBottom: "1rem !important",
  },
}));

const WithImporView = () => {
  const isSlide = useSlide();
  const { t } = useTranslation();
  const classes = useDropzoneStyle();
  const { enqueueSnackbar } = useSnackbar();

  const [dataImpor, setDataImpor] = useState<any>(null);
  const [fieldInDataImporExists, setFieldInDataImporExists] = useState(false);

  const handleReaderFile = (files: any) => {
    const fileData = files[0];

    const fileReader = new FileReader();

    fileReader.readAsText(fileData, "UTF-8");

    fileReader.onload = (event: any) => {
      const jsonData = JSON.parse(event.target.result);

      setDataImpor(jsonData);
    };
  };

  const handleCheckDataImpor = (isDataImpor: any) => {
    const isFieldInDataImporExists = isDataImpor
      ? Object.entries(
          isDataImpor?.arisan ? isDataImpor?.arisan : isDataImpor
        ).filter(([key]) => arisanField.includes(key)).length > 0
      : false;

    if (isFieldInDataImporExists) {
      setFieldInDataImporExists(isFieldInDataImporExists);
    } else {
      enqueueSnackbar("Data tidak cocok !", { variant: "error", autoHideDuration: 4000 });
    }
  };

  useEffect(() => {
    if (dataImpor) {
      handleCheckDataImpor(dataImpor);
    }
  }, [dataImpor]);

  if (fieldInDataImporExists) {
    return <StatsImpor arisanImpor={dataImpor?.arisan} />;
  }

  return (
    <ArisanLayout isScreen>
      <PageTitle title={t("with_import.title")} />

      <Slide in={isSlide} direction="left">
        <Box>
          <HeaderBack />

          <DropzoneArea
            filesLimit={1}
            Icon={UploadFileIcon}
            showAlerts={false}
            acceptedFiles={[".json"]}
            showPreviewsInDropzone={false}
            dropzoneClass={classes.dropzoneContainer}
            dropzoneParagraphClass={classes.dropzoneTitle}
            dropzoneText={t("with_import.box_import_text")}
            onChange={(file) => {
              if (file?.length > 0) {
                handleReaderFile(file);
              }
            }}
          />

          <Box
            textAlign="center"
            position="absolute"
            left="190px"
            bottom="20px"
          >
            &copy; arisanbae
          </Box>
        </Box>
      </Slide>
    </ArisanLayout>
  );
};

export default WithImporView;
