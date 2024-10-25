import { ChangeEvent, FC, HTMLInputTypeAttribute } from "react";
import { TextField as MuiField } from "@mui/material";
import { TPath, TFormStateValue } from "../../../types/form";

type Props = {
  path: TPath;
  label: string;
  value: TFormStateValue;
  type: HTMLInputTypeAttribute;
  onChange: (path: TPath, value: TFormStateValue) => void;
};

const TextField: FC<Props> = ({ path, label, onChange, value, type }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(path, e.target.type === "number" ? parseInt(e.target.value) : e.target.value);
  };

  return <MuiField onChange={handleChange} fullWidth label={label} value={value ?? ""} type={type} />;
};

export default TextField;
