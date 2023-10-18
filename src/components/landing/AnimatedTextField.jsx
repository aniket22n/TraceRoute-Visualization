import React, { useState } from "react";
import {
  Stack,
  TextField,
  Slide,
  IconButton,
  InputAdornment,
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
  const setHops = useSetRecoilState(hopState);
  const [input, setInput] = useState("");

  const handleClick = async () => {
    const response = await axios.get("api/traceroute", { params: { input } });
    if (response.status === 200) {
      setHops(response.data.data);
      console.log(response.data.data);
      redirect.push("/hops");
    }
    setInput("");
  };

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
