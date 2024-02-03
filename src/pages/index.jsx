import Head from "next/head";
import React from "react";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { AnimatedText } from "@/components/landing/AnimatedText";
import { AnimatedTextField } from "@/components/landing/AnimatedTextField";

const Index = () => {
  const theme = useTheme();
  return (
    <Box>
      <Head>
        <title>Traceroute</title>
        <meta name="description" content="Traceroute visualizer App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* from components */}

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
};

export default Index;
