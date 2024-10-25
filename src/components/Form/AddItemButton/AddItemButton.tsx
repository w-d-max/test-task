import { FC } from "react";
import { Box, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type Props = {
  onClick: () => void;
};

const AddItemButton: FC<Props> = ({ onClick }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <IconButton color="success" onClick={onClick}>
        <AddCircleIcon />
      </IconButton>
    </Box>
  );
};

export default AddItemButton;
