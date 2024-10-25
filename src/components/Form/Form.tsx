import { FormEvent, useState, FC } from "react";
import { Grid2, Box, Button } from "@mui/material";
import { TSchema } from "../../types/schema";
import { TErrors, TPath, TFormState, TFormStateValue } from "../../types/form";
import TextField from "./TextField/TextField";
import Select from "./Select/Select";
import { getFormErrors, getUpdatedFormState, getValueByPath } from "../../helpers/helpers";
import Checkbox from "./Checkbox/Checkbox";
import Errors from "./Errors/Errors";
import GroupCard from "./GroupCard/GroupCard";
import DeleteItemButton from "./DeleteItemButton/DeleteItemButton";
import AddItemButton from "./AddItemButton/AddItemButton";

type Props = {
  schema: TSchema;
  onSubmit?: (state: TFormState) => void;
  onChange?: (state: TFormState) => void;
  onError?: (errors: TErrors) => void;
};

const Form: FC<Props> = ({ schema, onChange, onError, onSubmit }) => {
  const [formState, setFormState] = useState<TFormState>({});
  const [errors, setErrors] = useState<TErrors>([]);

  const getValue = (keys: TPath): TFormStateValue => getValueByPath(keys, formState);

  const setValue = (path: TPath, value: TFormStateValue): void => {
    setFormState((prev) => {
      const newState = getUpdatedFormState(prev, path, value);

      if (typeof onChange === 'function') {
        onChange(newState);
      }

      return newState;
    });
  };

  const handleAddItem = (path: TPath) => () => {
    const value = getValue(path);
    setValue(path, (Array.isArray(value) ? [...value, null] : [null]) as TFormStateValue);
  };

  const handleDeleteItem = (path: TPath, index: number) => () => {
    const value = getValue(path);

    if (Array.isArray(value)) {
      setValue(path, [...value].filter((_, i) => i !== index) as TFormStateValue);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = getFormErrors(schema, formState);

    if (errors.length && typeof onError === 'function') {
      onError(errors);
    }

    if (!errors.length && typeof onSubmit === 'function') {
      onSubmit(formState);
    }

    setErrors(errors);
  };

  const renderSchemaItems = (schema: TSchema, key: string = "", path: TPath = []) => {
    switch (schema.type) {
      case "string":
        return (
          <TextField
            onChange={setValue}
            label={key}
            path={path}
            type="text"
            value={getValue(path)}
          />
        );
      case "integer":
        return (
          <TextField
            onChange={setValue}
            label={key}
            path={path}
            type="number"
            value={getValue(path)}
          />
        );
      case "boolean":
        return <Checkbox checked={!!getValue(path)} onChange={setValue} label={key} path={path} />;
      case "array":
        const currentItems = getValue(path);
        const currentItemsLength = Array.isArray(currentItems) ? currentItems.length : 0;

        return (
          <GroupCard title={key} withBorder>
            {Array.isArray(currentItems) &&
              currentItems.map((_, index) => (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "5px",
                    width: "100%",
                  }}
                >
                  {renderSchemaItems(schema.items, key + ` (№${index + 1})`, [...path, index])}
                  <DeleteItemButton onClick={handleDeleteItem(path, index)}/>
                </Box>
              ))}
            {currentItemsLength < (schema.maxItems || Infinity) && (
              <AddItemButton onClick={handleAddItem(path)}/>
            )}
          </GroupCard>
        );
      case "object":
        return (
          <GroupCard title={key} withBorder={!!key}>
            {Object.keys(schema.properties).map((key) =>
              renderSchemaItems(schema.properties[key], key, [...path, key])
            )}
          </GroupCard>
        );
      default:
        if (schema.enum) {
          const value = getValue(path);

          return (
            <Select
              path={path}
              label={key}
              onChange={setValue}
              options={schema.enum}
              value={typeof value === "string" ? value : ""}
            />
          );
        }
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderSchemaItems(schema)}
      <Grid2 container spacing={2} sx={{ marginTop: 3 }}>
        <Errors errors={errors} />
        <Button variant="contained" size="large" fullWidth type="submit">
          Submit
        </Button>
      </Grid2>
    </form>
  );
};

export default Form;
