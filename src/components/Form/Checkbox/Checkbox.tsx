import { FC, SyntheticEvent } from "react";
import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";
import { TPath, TFormStateValue } from "../../../types/form";

type Props = {
  path: TPath;
  label: string;
  checked: boolean;
  onChange: (path: TPath, value: TFormStateValue) => void;
};

const TextField: FC<Props> = ({ path, label, onChange, checked }) => {
  const handleChange = (_: SyntheticEvent<Element, Event>, checked: boolean) => {
      onChange(path, checked);
    };

  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={checked}
          onChange={handleChange}
        />
      }
      label={label}
    />
  );
};

export default TextField;
