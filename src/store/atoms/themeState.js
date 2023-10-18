import { atom } from "recoil";

export const themeState = atom({
  key: "ThemeKey",
  default: "dark",
});
