import Head from "next/head";
import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const containerStyle = {
  width: "90vw",
  height: "80vh",
};

const center = {
  lat: 20.5937,
  lng: 78.9629,
};

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC_WoO_Ca8krEupLv5sGIlVfuTM2Y80PFA",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  return (
    <>
      <Head>
        <title>Visualize traceroute</title>
        <meta name="description" content="Traceroute visualizer App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <center style={{ marginTop: "10vh" }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={(map) => {
              const bounds = new window.google.maps.LatLngBounds();
              map.fitBounds(bounds);
              map.setZoom(4);
              map.setCenter(center);
            }}
            onUnmount={(map) => {
              const bounds = new window.google.maps.LatLngBounds();
              map.fitBounds(bounds);
              map.setZoom(4);
              map.setCenter(center);
              // do your stuff before map is unmounted
            }}
          />
        ) : (
          <></>
        )}
      </center>
    </>
  );
}
