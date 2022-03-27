import { useState } from "react";
import { Controller } from "react-hook-form";
import { TextField, NativeSelect } from "@mui/material";
import { LANGUAGE } from "constants/language";

type PhoneInputProps = {
  name: string | any;
  control: Function | any;
  label: string;
  setValue: Function | any;
  required?: boolean;
};

const PhoneInput = ({
  name,
  control,
  label,
  setValue,
  required,
}: PhoneInputProps) => {
  const [isNationality, setNationality] = useState("+62");

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: required }}
      render={({ field: { onChange, value } }) => {
        const isValueInput = value?.includes(isNationality)
          ? value ?? ""
          : `${isNationality} ${value ?? ""}`;

        return (
          <TextField
            fullWidth
            type="text"
            variant="standard"
            label={label}
            value={isValueInput}
            onChange={(e) => onChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <NativeSelect
                  value={isNationality}
                  onChange={(val: any) => {
                    setValue(name, `${val.target.value} `);
                    setNationality(val.target.value);
                  }}
                  classes={{
                    select: "adortment-select",
                  }}
                >
                  {LANGUAGE.map((lang) => (
                    <option key={lang.alias} value={lang.phone}>
                      {lang.alias.toUpperCase()}
                    </option>
                  ))}
                </NativeSelect>
              ),
            }}
          />
        );
      }}
    />
  );
};

export default PhoneInput;
