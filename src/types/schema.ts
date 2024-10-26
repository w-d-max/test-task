type TObject = {
  type: "object";
  properties: {
    [key: string]: TSchema;
  };
  required?: string[];
};

export type TArray = {
  type: "array";
  minItems?: number;
  maxItems?: number;
  items: TSchema;
};

type TString = {
  type: "string";
  minLength?: number;
  maxLength?: number;
};

type TInteger = {
  type: "integer";
  minimum?: number;
  maximum?: number;
};

type TBoolean = {
  type: "boolean";
};

type TEnum = {
  type: undefined;
  enum: string[];
};

export type TSchema = TObject | TArray | TString | TInteger | TBoolean | TEnum;
