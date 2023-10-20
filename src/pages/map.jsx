import Head from "next/head";
import React, { useMemo, useState } from "react";
import { Stack, CircularProgress, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  PolylineF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { hopState } from "@/store/atoms/hopsState";
import { themeState } from "@/store/atoms/themeState";
import { darkStyles } from "@/styles/darkModeMap";
import { searchState } from "@/store/atoms/searchState";

export default function Map() {
  const setSearch = useSetRecoilState(searchState);
  setSearch((pre) => ({ input: pre.input, show: true }));
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <CircularProgress />;
  return <DisplayMap />;
}

function DisplayMap({}) {
  const hops = useRecoilValue(hopState);
  const locations = hops.locations.map((location) => location);
  const toggle = useRecoilValue(themeState);
  const [selectedElement, setSelectedElement] = useState(null);
  const theme = useTheme();
  const center = useMemo(() => ({ lat: 21, lng: 79 }), []);
  const mapContainerStyle = {
    width: "100svw",
    height: "calc(100svh - 80px)",
  };

  return (
    <>
      <Head>
        <title>traceroute map</title>
        <meta name="description" content="Traceroute visualizer App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Stack
        sx={{
          height: "calc(100svh - 80px)",
          width: "100vw",
          bgcolor: theme.palette.background.default,
        }}
        alignItems={"center"}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={5}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            styles: toggle === "dark" ? darkStyles : false,
            minZoom: 2.5,
          }}
        >
          {locations.map((location, index) => {
            return (
              <MarkerF
                key={index}
                position={location.points}
                onClick={() => {
                  setSelectedElement(location);
                }}
              />
            );
          })}
          {selectedElement ? (
            <InfoWindowF
              position={selectedElement.points}
              onCloseClick={() => {
                setSelectedElement(null);
              }}
            >
              <Card sx={{ p: 2 }}>
                <Stack
                  alignContent={"center"}
                  sx={{ height: "100%", width: "100%" }}
                  textAlign={"center"}
                  spacing={"8px"}
                >
                  <Typography>Hops</Typography>
                  <Stack>
                    {selectedElement.hop.map((hop) => {
                      const ip = hops.hops.find(
                        (hopInfo) => hopInfo.hop == hop
                      );
                      if (ip) {
                        return (
                          <Stack direction={"row"} spacing={2}>
                            <Typography>Hop {hop}</Typography>
                            <Typography>IP {ip.ip}</Typography>
                          </Stack>
                        );
                      }
                      if (hop == 32) {
                        return (
                          <Typography color={"red"}>Destination Hop</Typography>
                        );
                      }
                    })}
                  </Stack>
                </Stack>
              </Card>
            </InfoWindowF>
          ) : null}

          <PolylineF
            path={locations.map((location) => location.points)}
            options={{
              strokeColor: toggle === "dark" ? "#ffffff" : "#000000",
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
      </Stack>
    </>
  );
}
