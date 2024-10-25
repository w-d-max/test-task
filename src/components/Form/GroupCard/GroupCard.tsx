import { FC, ReactNode } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

type Props = {
  title: string;
  children: ReactNode;
  withBorder?: boolean;
};

const GroupCard: FC<Props> = ({ children, title, withBorder = false }) => {
  return (
    <Box
      sx={{
        width: "100%",
        border: withBorder ? `1px solid ${grey[200]}` : "none",
        borderRadius: "4px",
        padding: withBorder ? 1.5 : 0,
      }}
    >
      <Typography
        sx={{ marginBottom: 1.5 }}
        color="textSecondary"
      >
        {title}
      </Typography>
      <Grid2 container spacing={2}>
        {children}
      </Grid2>
    </Box>
  );
};

export default GroupCard;
