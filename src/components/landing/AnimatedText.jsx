import React from "react";
import { Typography, Fade, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const AnimatedText = () => {
  const theme = useTheme();

  return (
    <Stack direction="row">
      {[..."TraceRoute"].map((char, index) => (
        <Fade key={index} in={true} timeout={1000 * index}>
          <Typography
            variant="h1"
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            {char}
          </Typography>
        </Fade>
      ))}
    </Stack>
  );
};
