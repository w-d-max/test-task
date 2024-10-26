import { FC } from "react";
import { TErrors } from "../../../types/form";
import { Alert, List, ListItem } from "@mui/material";

type Props = {
  errors: TErrors;
};

const Errors: FC<Props> = ({ errors }) => {
  if (!errors.length) {
    return null;
  }

  return (
    <Alert severity="error" sx={{ width: "100%" }}>
      <List dense sx={{ padding: 0 }}>
        {errors.map((error) => (
          <ListItem key={error} sx={{ padding: 0 }}>
            • {error}
          </ListItem>
        ))}
      </List>
    </Alert>
  );
};

export default Errors;
