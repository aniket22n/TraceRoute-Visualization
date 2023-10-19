import React, { useState } from "react";
import {
  Fade,
  Typography,
  Stack,
  TextField,
  Slide,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MagnifyingGlass } from "phosphor-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { hopState } from "@/store/atoms/hopsState";

export const AnimatedTextField = () => {
  const redirect = useRouter();
  const theme = useTheme();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const setHops = useSetRecoilState(hopState);

  const handleClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get("api/traceroute", { params: { input } });
      if (response.status === 200) {
        console.log(response.data.data);
        setHops(response.data.data);
        setInput("");
        setLoading(false);
        redirect.push("/hops");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Fade timeout={2000} in={true}>
        <Stack direction={"row"} justifyContent={"center"} spacing={2}>
          <Typography
            sx={{ color: theme.palette.text.primary }}
            variant="h4"
            fontWeight={600}
          >
            Fetching Hops
          </Typography>
          <CircularProgress />
        </Stack>
      </Fade>
    );
  }

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={2}>
      <Slide in={true} direction="up" timeout={2500}>
        <TextField
          variant={"standard"}
          autoComplete="off"
          value={input}
          placeholder="Domain or IPv4"
          InputProps={{
            inputProps: {
              style: { textAlign: "center", fontSize: "24px" },
            },
            endAdornment: input && (
              <InputAdornment position="end">
                <IconButton onClick={handleClick}>
                  <MagnifyingGlass
                    size={32}
                    color={theme.palette.primary.main}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setInput(e.target.value)}
        />
      </Slide>
    </Stack>
  );
};
