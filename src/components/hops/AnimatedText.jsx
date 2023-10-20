import React from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Stack, Fade } from "@mui/material";

import { Path } from "phosphor-react";

export const AnimatedText = ({ text }) => {
  const theme = useTheme();
  return (
    <Fade timeout={2000} in={true}>
      <Stack
        sx={{ color: theme.palette.text.primary }}
        alignItems={"center"}
        spacing={2}
      >
        <Typography variant="h4" fontWeight={600}>
          Destination
        </Typography>
        <Path size={48} />
        <Typography variant="h4" fontWeight={500}>
          {text}
        </Typography>
      </Stack>
    </Fade>
  );
};
