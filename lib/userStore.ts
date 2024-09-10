import { atom } from "jotai";

const currentUser = atom({
  id: "",
  email: "",
  img: "",
  auth: false,
  name: "",
});

const movieDetailsAtom = atom({
  title: "",
  overview: "",
  backdrop_path: "",
  release_date: "",
  runtime: 0,
  original_language: "",
  genres: [],
  vote_average: "",
});

const isLoadingAtom = atom<boolean>(true);

const toggleModal = atom<boolean>(false);

export { isLoadingAtom, toggleModal, movieDetailsAtom, currentUser };
