import type { FontStyleOptions } from "@mui/material/styles/createTypography";

export type FONTS = {
  poppins: FontStyleOptions & {
    src: string;
    fontDisplay: string;
    fontStyle: string;
    fontWeight: number;
    unicodeRange: string;
  };
  playfair: FontStyleOptions & {
    src: string;
    fontDisplay: string;
    fontStyle: string;
    fontWeight: number;
    unicodeRange: string;
  };
};
