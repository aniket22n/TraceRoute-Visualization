import { Box, IconButton, Stack, useTheme } from "@mui/material";
import { Moon, Sun } from "phosphor-react";
import { useRecoilState } from "recoil";

import { toggleTheme } from "@/store/atoms/theme";

const Nav = () => {
  const theme = useTheme();
  const [toggle, setToggleTheme] = useRecoilState(toggleTheme);

  return (
    <Box
      sx={{ height: "80px", maxWidth: "100svw", border: "none" }}
      bgcolor={theme.palette.background.default}
    >
      <Stack
        alignItems={"flex-end"}
        justifyContent={"center"}
        sx={{ height: "100%", mr: "20px" }}
      >
        <IconButton
          onClick={() => setToggleTheme(toggle === "dark" ? "light" : "dark")}
        >
          {toggle === "dark" ? (
            <Sun size={36} weight="bold" />
          ) : (
            <Moon size={36} weight="bold" color="black" />
          )}
        </IconButton>
      </Stack>
    </Box>
  );
};
export default Nav;
