import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import { toggleTheme } from "@/store/atoms/theme";
import { useMemo } from "react";

import Home from "@/components/Home";
import Nav from "@/components/Nav";
import { useRecoilValue } from "recoil";
import { Theme } from "@/theme/theme";

const Index = () => {
  const toggle = useRecoilValue(toggleTheme);
  let theme;

  useMemo(() => {
    theme = createTheme({
      palette: { mode: toggle },
      typography: {
        h1: Theme.typography.heading,
      },
    });
  }, [toggle]);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Nav />
        <Home />
      </Box>
    </ThemeProvider>
  );
};

export default Index;
