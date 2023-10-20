// layout for shared components & custom theme

import { ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Theme } from "@/theme/theme";
import { themeState } from "@/store/atoms/themeState";
import Nav from "@/components/Nav";

export default function Layout({ children }) {
  const toggle = useRecoilValue(themeState);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        ...Theme[toggle].palette,
      },
      typography: {
        ...Theme.typography,
      },
    });
  }, [toggle]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Nav />
        <ToastContainer />
        {children}
      </ThemeProvider>
    </>
  );
}
