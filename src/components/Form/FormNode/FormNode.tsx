import { FC, memo } from "react";
import { TPath, TFormStateValue } from "../../../types/form";
import { TSchema } from "../../../types/schema";
import GroupCard from "../GroupCard/GroupCard";
import NodesArray from "../NodesArray/NodesArray";
import TextField from "../TextField/TextField";
import Checkbox from "../Checkbox/Checkbox";
import Select from "../Select/Select";

type Props = {
  schema: TSchema;
  path?: TPath;
  label?: string;
  onChange: (path: TPath, value: TFormStateValue) => void;
};

const FormNode: FC<Props> = memo(({ schema, onChange, path = [], label = "" }) => {
  switch (schema.type) {
    case "string":
      return (
        <TextField
          onChange={onChange}
          label={label}
          path={path}
          type="text"
          key={path.join("/")}
        />
      );
    case "integer":
      return (
        <TextField
          onChange={onChange}
          label={label}
          path={path}
          type="number"
          key={path.join("/")}
        />
      );
    case "boolean":
      return <Checkbox onChange={onChange} label={label} path={path} />;
    case "array":
      return (
        <NodesArray
          schema={schema}
          label={label}
          key={path.join("/")}
          path={path}
          onChange={onChange}
        />
      );
    case "object":
      return (
        <GroupCard title={label} withBorder={!!label}>
          {Object.keys(schema.properties).map((key) => (
            <FormNode
              schema={schema.properties[key]}
              key={[...path, key].join("/")}
              label={key}
              onChange={onChange}
              path={[...path, key]}
            />
          ))}
        </GroupCard>
      );
    default:
      if ("enum" in schema) {
        return (
          <Select path={path} label={label} onChange={onChange} options={schema.enum} />
        );
      }
      return null;
  }
});

export default FormNode;
