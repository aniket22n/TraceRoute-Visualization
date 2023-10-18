import Head from "next/head";
import React from "react";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { AnimatedText } from "./AnimatedText";
import { AnimatedTextField } from "./AnimatedTextField";

export default function Landing() {
  const theme = useTheme();

  return (
    <Box>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          height: "calc(100svh - 80px )",
          width: "100vw",
          bgcolor: theme.palette.background.default,
        }}
      >
        <Box height={"200px"}>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            spacing={10}
            mt={"-100px"}
          >
            {/* import */}
            <AnimatedText />
            <AnimatedTextField />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
