export type TPath = Array<string | number>;

export type TFormStateValue = string | number | boolean | Array<string | number | boolean> | TFormState | TFormState[];

export type TFormState = {
  [key: string]: TFormStateValue;
};

export type TErrors = string[];
