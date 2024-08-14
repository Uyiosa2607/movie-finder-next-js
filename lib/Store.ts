import { atom } from "jotai";
import { doc, getDoc } from "firebase/firestore";
import { useAtom } from "jotai";
import { db } from "./Firebase";

export const userAtom = atom({
  id: "",
  auth: false,
});
