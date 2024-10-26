export type TPath = Array<string | number>;

export type TFormStateValue =
  | string
  | number
  | boolean
  | null
  | Array<string | number | boolean | null>
  | TFormState
  | TFormState[];

export type TFormState = {
  [key: string]: TFormStateValue;
};

export type TErrors = string[];
