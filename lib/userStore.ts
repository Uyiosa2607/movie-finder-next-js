import { atom } from "jotai";

const currentUser = atom({
  id: "",
  email: "",
  img: "",
  auth: false,
  name: "",
});

const isLoadingAtom = atom<boolean>(true);

export { isLoadingAtom, currentUser };
