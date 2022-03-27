import { Slide } from "@mui/material";
import { useSlide } from "hooks/useSlide";
import ArisanLayout from "layouts";

const GiftResult = () => {
  const isSlide = useSlide();
  return (
    <ArisanLayout isScreen>
      <Slide in={isSlide}>
        <div>gift results</div>
      </Slide>
    </ArisanLayout>
  );
};

export default GiftResult;
