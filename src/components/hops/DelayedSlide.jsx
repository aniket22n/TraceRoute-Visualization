import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Slide, Typography, Stack } from "@mui/material";
import { Desktop } from "phosphor-react";

export const DelayedSlide = ({ index, hop }) => {
  const theme = useTheme();
  const [isEntered, setIsEntered] = React.useState(false);

  React.useEffect(() => {
    const delay = 500 * index;
    const exitDelay = 1500;

    const entryTimer = setTimeout(() => {
      setIsEntered(true);

      // After a delay, set isEntyered to false
      const exitTimer = setTimeout(() => {
        setIsEntered(false);
      }, exitDelay);

      return () => {
        clearTimeout(exitTimer);
      };
    }, delay);

    return () => {
      clearTimeout(entryTimer);
    };
  }, [index]);

  return (
    <Slide
      direction="left"
      in={isEntered}
      timeout={500}
      display={isEntered ? "block" : "none"}
    >
      <Box sx={{ color: theme.palette.text.secondary }}>
        <Hop hop={hop} />
      </Box>
    </Slide>
  );
};

function Hop({ hop }) {
  const theme = useTheme();

  return (
    <Stack alignItems={"center"} width={"200px"}>
      <Typography>HOP: {hop.hop}</Typography>
      <Desktop size={100} weight="bold" />
      <Typography
        color={
          hop.ip !== "*" ? theme.palette.success.main : theme.palette.error.main
        }
      >
        IP: {hop.ip === "*" ? "failure" : hop.ip}
      </Typography>
    </Stack>
  );
}
