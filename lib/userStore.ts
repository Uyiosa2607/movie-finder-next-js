import { atom } from "jotai";

type MovieDetails = {
  title: string;
  overview: string;
  backdrop_path: string;
  runtime: number;
  original_language: string;
};

const currentUser = atom({
  id: "",
  email: "",
  img: "",
  auth: false,
  name: "",
});

const isLoadingAtom = atom<boolean>(true);

const toggleModal = atom<boolean>(false);

const movieDetailsAtom = atom<MovieDetails[]>([]);

export { isLoadingAtom, toggleModal, movieDetailsAtom, currentUser };
