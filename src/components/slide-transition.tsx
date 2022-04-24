import { forwardRef, ReactElement, Ref } from "react";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const TransitionSlide = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default TransitionSlide;
