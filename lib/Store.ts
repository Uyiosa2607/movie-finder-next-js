import { atom } from "jotai";

export const userAtom = atom({
  auth: false,
  id: "",
  email: "",
});
