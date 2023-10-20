import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";

import { DelayedSlide } from "@/components/hops/DelayedSlide";
import { AnimatedText } from "@/components/hops/AnimatedText";
import { hopState } from "@/store/atoms/hopsState";
import { MapPin } from "phosphor-react";
import { searchState } from "@/store/atoms/searchState";

const Hops = () => {
  const redirect = useRouter();
  const theme = useTheme();
  const hops = useRecoilValue(hopState);
  const [map, setMap] = useState(false);
  const setSearch = useSetRecoilState(searchState);

  useEffect(() => {
    setSearch((pre) => ({ input: pre.input, show: false }));
    setTimeout(() => {
      setMap(true);
    }, 5000);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
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
        {!map && hops.destination === "" && (
          <AnimatedText text={"Fetching Hops"} />
        )}
        {!map && hops.destination !== "" && (
          <AnimatedText text={hops.destination} />
        )}
        {map && (
          <Stack alignItems={"center"} spacing={2}>
            <IconButton
              onClick={() => redirect.push("/map")}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.error.dark,
                },
              }}
            >
              <MapPin size={48} />
            </IconButton>{" "}
            <Typography sx={{ fontSize: 30 }}>Traceroute Map</Typography>{" "}
          </Stack>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          overflow={"hidden"}
        >
          {hops.hops.map((hop, index) => {
            return <DelayedSlide key={index} index={index} hop={hop} />;
          })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Hops;
