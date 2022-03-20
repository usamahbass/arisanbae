import { FC } from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const defaultMaskOptions = {
  prefix: "Rp ",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ",",
  allowDecimal: true,
  decimalSymbol: ".",
  decimalLimit: 5, // how many digits allowed after the decimal
  integerLimit: 20, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

const PriceInput: FC = ({ ...inputProps }) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
  });

  return <MaskedInput mask={currencyMask} {...inputProps} />;
};

export default PriceInput;
