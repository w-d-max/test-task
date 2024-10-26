import { FC, memo, SyntheticEvent } from "react";
import { TPath, TFormStateValue } from "../../../types/form";
import withFormValue from "../../../hoc/withFormValue";
import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material";

type Props = {
  path: TPath;
  label: string;
  value?: TFormStateValue;
  onChange: (path: TPath, value: TFormStateValue) => void;
};

const Checkbox: FC<Props> = memo(({ path, label, onChange, value }) => {
  const handleChange = (_: SyntheticEvent<Element, Event>, checked: boolean) => {
    onChange(path, checked);
  };

  return (
    <FormControlLabel
      control={<MuiCheckbox checked={!!value} onChange={handleChange} />}
      label={label}
    />
  );
});

export default withFormValue(Checkbox);
