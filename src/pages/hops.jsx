import Head from "next/head";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Slide, Typography, Stack, Fade } from "@mui/material";
import { useRecoilValue } from "recoil";
import { Desktop, Path } from "phosphor-react";

import { hopState } from "@/store/atoms/hopsState";

const Hops = () => {
  const theme = useTheme();
  const hops = useRecoilValue(hopState);

  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      <Head>
        <title>Hops</title>
        <meta name="description" content="Traceroute visualizer App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Box sx={{ height: "calc(100vh - 80px)", width: "100vw" }}>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          spacing={6}
          sx={{
            height: "100%",
            width: "100%",
            textAlign: "center",
          }}
        >
          {hops.destination === "" && <AnimatedText text={"Fetching Hops"} />}
          {hops.destination !== "" && <AnimatedText text={hops.destination} />}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            overflow={"hidden"}
          >
            {hops.hops.map((hop, index) => (
              <DelayedSlide key={index} index={index} hop={hop} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
const DelayedSlide = ({ index, hop }) => {
  const theme = useTheme();
  const [isEntered, setIsEntered] = React.useState(false);

  React.useEffect(() => {
    const delay = 500 * index;
    const exitDelay = 1500;

    const entryTimer = setTimeout(() => {
      setIsEntered(true);

      // After a delay, set isEntyered to false
      const exitTimer = setTimeout(() => {
        setIsEntered(false);
      }, exitDelay);

      return () => {
        clearTimeout(exitTimer);
      };
    }, delay);

    return () => {
      clearTimeout(entryTimer);
    };
  }, [index]);

  return (
    <Slide
      direction="left"
      in={isEntered}
      timeout={500}
      display={isEntered ? "block" : "none"}
    >
      <Box sx={{ color: theme.palette.text.secondary }}>
        <Hop hop={hop} />
      </Box>
    </Slide>
  );
};

function Hop({ hop }) {
  const theme = useTheme();

  return (
    <Stack alignItems={"center"} width={"200px"}>
      <Typography>HOP: {hop.hop}</Typography>
      <Desktop size={100} weight="bold" />
      <Typography
        color={
          hop.ip !== "*" ? theme.palette.success.main : theme.palette.error.main
        }
      >
        IP: {hop.ip === "*" ? "failure" : hop.ip}
      </Typography>
    </Stack>
  );
}

const AnimatedText = ({ text }) => {
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

export default Hops;
