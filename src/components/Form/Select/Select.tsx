import { memo, useId } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from "@mui/material";
import { TPath, TFormStateValue } from "../../../types/form";
import withFormValue from "../../../hoc/withFormValue";

type Props = {
  path: TPath;
  label: string;
  options: string[];
  value?: string;
  onChange: (path: TPath, value: TFormStateValue) => void;
};

const Select = memo(({ path, label, onChange, options, value }: Props) => {
  const id = useId();

  const handleChange = (e: SelectChangeEvent<string>) => {
    onChange(path, e.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <MuiSelect labelId={id} id={id} value={value ?? ""} label={label} onChange={handleChange}>
        {options.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
});

export default withFormValue(Select);
