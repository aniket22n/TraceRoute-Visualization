import Head from "next/head";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Fade,
  Stack,
  TextField,
  Slide,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MagnifyingGlass } from "phosphor-react";

export default function Landing() {
  const theme = useTheme();

  return (
    <Box>
      <Head>
        <title>Visualize traceroute</title>
        <meta name="description" content="Traceroute visualizer App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

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
            <AnimatedText />
            <AnimatedTextField />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

const AnimatedText = () => {
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

const AnimatedTextField = () => {
  const theme = useTheme();
  const [input, setInput] = useState("");

  const handleClick = () => {
    console.log(input);
    setInput("");
  };

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={2}>
      <Slide in={true} direction="up" timeout={2500}>
        <TextField
          variant={"standard"}
          autoComplete="off"
          value={input}
          placeholder="Domain or IPv4"
          InputProps={{
            inputProps: {
              style: { textAlign: "center", fontSize: "24px" },
            },
            endAdornment: input && (
              <InputAdornment position="end">
                <IconButton onClick={handleClick}>
                  <MagnifyingGlass
                    size={32}
                    color={theme.palette.primary.main}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setInput(e.target.value)}
        />
      </Slide>
    </Stack>
  );
};
