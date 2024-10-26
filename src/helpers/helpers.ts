import { TSchema } from "../types/schema";
import { TErrors, TPath, TFormState, TFormStateValue } from "../types/form";

export const getValueByPath = (keys: TPath, formState: TFormState): TFormStateValue => {
  return keys.reduce((acc: any, key: string | number) => {
    if (acc && acc.hasOwnProperty(key)) {
      return acc[key];
    }
    return null;
  }, formState);
};

export const getUpdatedFormState = (
  prevState: TFormState,
  path: TPath,
  value: TFormStateValue
): TFormState => {
  const newState = { ...prevState };

  let current = newState;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!current[key]) {
      if (typeof path[i + 1] === "number") {
        current[key] = [];
      } else {
        current[key] = {};
      }
    }
    current = current[key] as TFormState;
  }

  current[path[path.length - 1]] = value;

  return newState;
};

export const getFormErrors = (schema: TSchema, data: any, path: string = ""): TErrors => {
  const errors: TErrors = [];

  switch (schema.type) {
    case "string":
      if (
        schema.minLength !== undefined &&
        schema.maxLength !== undefined &&
        ((data || "").length < schema.minLength || (data || "").length > schema.maxLength)
      ) {
        errors.push(`${path} length must be between ${schema.minLength} and ${schema.maxLength}`);
      }
      break;

    case "integer":
      if (
        schema.minimum !== undefined &&
        schema.maximum !== undefined &&
        ((data || 0) < schema.minimum || (data || 0) > schema.maximum)
      ) {
        errors.push(`${path} must be between ${schema.minimum} and ${schema.maximum}`);
      }
      break;

    case "array":
      if (Array.isArray(data)) {
        if (
          (schema.minItems !== undefined && data.length < schema.minItems) ||
          (schema.maxItems !== undefined && data.length > schema.maxItems)
        ) {
          errors.push(
            `${path} Array length must be between ${schema.minItems || 0} ${
              schema.maxItems ? "and " + schema.maxItems : ""
            }`
          );
        }

        data.forEach((item, index) => {
          errors.push(...getFormErrors(schema.items!, item, `${path}/[${index + 1}]`));
        });
      } else {
        if (schema.minItems !== 0) {
          errors.push(
            `${path} Array length must be between ${schema.minItems || 0} ${
              schema.maxItems ? "and " + schema.maxItems : ""
            }`
          );
        }
      }
      break;

    case "object":
      schema.required &&
        schema.required.forEach((key) => {
          if (!data || !data[key]) {
            errors.push(`${path}/${key} is required`);
          }
        });

      schema.properties &&
        Object.keys(schema.properties).forEach((key) => {
          errors.push(
            ...getFormErrors(schema.properties![key], data && data[key], `${path}/${key}`)
          );
        });
      break;
  }

  return errors;
};
