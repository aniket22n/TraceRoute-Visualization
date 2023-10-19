import { atom } from "recoil";

export const hopState = atom({
  key: "HopsKey",
  default: { destination: "", hops: [] },
});
