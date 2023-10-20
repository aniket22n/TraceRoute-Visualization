import Head from "next/head";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Stack } from "@mui/material";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

import { DelayedSlide } from "@/components/hops/DelayedSlide";
import { AnimatedText } from "@/components/hops/AnimatedText";
import { hopState } from "@/store/atoms/hopsState";

const Hops = () => {
  const redirect = useRouter();
  const theme = useTheme();
  const hops = useRecoilValue(hopState);

  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      <Head>
        <title>Hops</title>
        <meta name="description" content="Traceroute visualizer App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        spacing={6}
        sx={{
          height: "calc(100vh - 80px)",
          width: "100vw",
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
          {hops.hops.map((hop, index) => {
            return <DelayedSlide key={index} index={index} hop={hop} />;
          })}
        </Stack>
        <Button onClick={() => redirect.push("/map")}>Visualize map</Button>
      </Stack>
    </Box>
  );
};

export default Hops;
