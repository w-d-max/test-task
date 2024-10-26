import { FormEvent, useState, FC, useMemo, useCallback } from "react";
import { Grid2, Button } from "@mui/material";
import { TSchema } from "../../types/schema";
import { TErrors, TPath, TFormState, TFormStateValue } from "../../types/form";
import { getFormErrors, getUpdatedFormState } from "../../helpers/helpers";
import Errors from "./Errors/Errors";
import FormNode from "./FormNode/FormNode";
import { FormContext } from "../../context/FormContext";

type Props = {
  schema: TSchema;
  onSubmit?: (state: TFormState) => void;
  onChange?: (state: TFormState) => void;
  onError?: (errors: TErrors) => void;
};

const Form: FC<Props> = ({ schema, onChange, onError, onSubmit }) => {
  const [formState, setFormState] = useState<TFormState>({});
  const [errors, setErrors] = useState<TErrors>([]);

  const setValue = useCallback((path: TPath, value: TFormStateValue): void => {
    setFormState((prev) => {
      const newState = getUpdatedFormState(prev, path, value);

      if (typeof onChange === "function") {
        onChange(newState);
      }

      return newState;
    });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = getFormErrors(schema, formState);

    if (errors.length && typeof onError === "function") {
      onError(errors);
    }

    if (!errors.length && typeof onSubmit === "function") {
      onSubmit(formState);
    }

    setErrors(errors);
  };

  const path = useMemo(() => [], []);

  return (
    <form onSubmit={handleSubmit}>
      <FormContext.Provider value={formState}>
        <FormNode schema={schema} path={path} label="" onChange={setValue} />
      </FormContext.Provider>
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
