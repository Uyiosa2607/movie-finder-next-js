import { atom } from "jotai";

export const currentUser = atom({
  name: "",
  email: "",
  img: "",
  id: "",
  auth: false,
});

export const isLoadingAtom = atom(true);

export const toggleModal = atom(false);
