import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Moon, Sun } from "phosphor-react";
import { useRecoilState, useRecoilValue } from "recoil";

import { themeState } from "@/store/atoms/themeState";
import { searchState } from "@/store/atoms/searchState";

const Nav = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const search = useRecoilValue(searchState);

  return (
    <Box
      sx={{
        height: "80px",
        maxWidth: "100svw",
        border: "none",
        color: theme === "dark" ? "#ffffff" : "#000000",
      }}
      bgcolor={theme === "dark" ? "#121212" : "whitesmoke"}
    >
      {search.show && (
        <Stack alignItems={"center"} justifyContent={"center"} height={"100%"}>
          <Typography variant="h1" sx={{ fontSize: "40px" }}>
            {search.input}
          </Typography>
        </Stack>
      )}
      <Box sx={{ position: "absolute", right: "20px", top: "15px" }}>
        <IconButton
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun size={36} weight="bold" />
          ) : (
            <Moon size={36} weight="bold" />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};
export default Nav;
