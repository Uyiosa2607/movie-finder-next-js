import { atom } from "jotai";

type MovieDetails = {
  title: string;
  overview: string;
  backdrop_path: string;
  runtime: number;
  original_language: string;
};

type User = {
  id: string;
  email: string;
  img: string;
  auth: boolean;
  name: string;
};

const currentUser = atom<User[]>([]);

const isLoadingAtom = atom<boolean>(true);

const toggleModal = atom<boolean>(false);

const movieDetailsAtom = atom<MovieDetails[]>([]);

export { isLoadingAtom, toggleModal, movieDetailsAtom, currentUser };
