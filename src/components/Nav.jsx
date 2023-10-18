import { Box, IconButton, Stack } from "@mui/material";
import { Moon, Sun } from "phosphor-react";
import { useRecoilState } from "recoil";

import { themeState } from "@/store/atoms/themeState";

const Nav = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  return (
    <Box
      sx={{ height: "80px", maxWidth: "100svw", border: "none" }}
      bgcolor={theme === "dark" ? "#121212" : "whitesmoke"}
    >
      <Stack
        alignItems={"flex-end"}
        justifyContent={"center"}
        sx={{ height: "100%", mr: "20px" }}
      >
        <IconButton
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun
              size={36}
              color={theme === "dark" ? "whitesmoke" : "black"}
              weight="bold"
            />
          ) : (
            <Moon
              size={36}
              color={theme === "dark" ? "whitesmoke" : "black"}
              weight="bold"
            />
          )}
        </IconButton>
      </Stack>
    </Box>
  );
};
export default Nav;
