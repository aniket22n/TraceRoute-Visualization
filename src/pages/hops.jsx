import Head from "next/head";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Slide, Typography, Stack, Fade } from "@mui/material";
import { useRecoilValue } from "recoil";

import { hopState } from "@/store/atoms/hopsState";
import { GlobeSimple } from "phosphor-react";

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
          direction={window.innerWidth > 600 ? "row" : "column"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={3}
          sx={{ height: "100%" }}
        >
          {hops.hops.map((hop, index) => (
            <DelayedSlide
              key={index}
              direction="left"
              index={index}
              theme={theme}
              hop={hop}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
const DelayedSlide = ({ index, theme, hop }) => {
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
    <Fade in={isEntered} timeout={500} display={isEntered ? "block" : "none"}>
      <Box sx={{ color: theme.palette.text.primary }}>
        <Hop hop={hop} />
      </Box>
    </Fade>
  );
};

function Hop({ hop }) {
  const theme = useTheme();

  return (
    <Stack alignItems={"center"} width={"200px"}>
      <Typography>HOP: {hop.hop}</Typography>
      <GlobeSimple size={100} weight="bold" />
      <Typography>IP: {hop.ip}</Typography>
    </Stack>
  );
}
export default Hops;
