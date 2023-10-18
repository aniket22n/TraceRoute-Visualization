import { Box } from "@mui/material";
import Head from "next/head";

import Home from "@/components/landing/Home";

const Index = () => {
  return (
    <Box>
      <Head>
        <title>Home</title>
        <meta name="description" content="Traceroute visualizer App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* from components */}
      <Home />
    </Box>
  );
};

export default Index;
