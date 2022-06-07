import { useState } from "react";
import { Box, Slide } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DropzoneArea } from "react-mui-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useSlide } from "hooks/useSlide";
import ArisanLayout from "layouts";
import HeaderBack from "layouts/header-back";
import StatsImpor from "./stats-impor";

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
  const classes = useDropzoneStyle();

  const [dataImpor, setDataImpor] = useState<any>(null);

  const handleReaderFile = (files: any) => {
    const fileData = files[0];

    const fileReader = new FileReader();

    fileReader.readAsText(fileData, "UTF-8");

    fileReader.onload = (event: any) => {
      const jsonData = JSON.parse(event.target.result);

      setDataImpor(jsonData);
    };
  };

  if (dataImpor) {
    return <StatsImpor arisanImpor={dataImpor?.arisan} />;
  }

  return (
    <ArisanLayout isScreen>
      <Slide in={isSlide} direction="left">
        <Box>
          <HeaderBack />

          <DropzoneArea
            filesLimit={1}
            Icon={UploadFileIcon}
            acceptedFiles={[".json"]}
            showPreviewsInDropzone={false}
            dropzoneClass={classes.dropzoneContainer}
            dropzoneParagraphClass={classes.dropzoneTitle}
            dropzoneText="Seret dan jatuhkan file yang telah diekspor disini"
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
