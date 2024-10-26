import { memo, useEffect } from "react";
import { Box } from "@mui/material";
import { TPath, TFormStateValue } from "../../../types/form";
import withFormValue from "../../../hoc/withFormValue";
import GroupCard from "../GroupCard/GroupCard";
import { TArray } from "../../../types/schema";
import AddItemButton from "../AddItemButton/AddItemButton";
import DeleteItemButton from "../DeleteItemButton/DeleteItemButton";
import FormNode from "../FormNode/FormNode";

type Props = {
  schema: TArray;
  path: TPath;
  label: string;
  value?: TFormStateValue;
  onChange: (path: TPath, value: TFormStateValue) => void;
};

const NodesArray = memo(({ path, label, onChange, value, schema }: Props) => {
  const itemsLength = Array.isArray(value) ? value.length : 0;

  const handleAddItem = () => {
    onChange(path, (Array.isArray(value) ? [...value, null] : [null]) as TFormStateValue);
  };

  const handleDeleteItem = (path: TPath, index: number) => () => {
    if (Array.isArray(value)) {
      onChange(path, [...value].filter((_, i) => i !== index) as TFormStateValue);
    }
  };

  return (
    <GroupCard title={label} withBorder>
      {Array.isArray(value) &&
        value.map((_, index) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "5px",
              width: "100%",
            }}
          >
            <FormNode
              schema={schema.items}
              key={label + ` (№${index + 1})`}
              label={label + ` (№${index + 1})`}
              onChange={onChange}
              path={[...path, index]}
            />
            <DeleteItemButton onClick={handleDeleteItem(path, index)} />
          </Box>
        ))}
      {itemsLength < (schema.maxItems || Infinity) && <AddItemButton onClick={handleAddItem} />}
    </GroupCard>
  );
});

export default withFormValue(NodesArray);
