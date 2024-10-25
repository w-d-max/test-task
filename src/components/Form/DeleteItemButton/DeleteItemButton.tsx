import { FC } from "react";
import { IconButton } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

type Props = {
  onClick: () => void;
};

const DeleteItemButton: FC<Props> = ({ onClick }) => {
  return (
    <IconButton sx={{ flexShrink: 0 }} color="error" onClick={onClick}>
      <RemoveCircleIcon />
    </IconButton>
  );
};

export default DeleteItemButton;
