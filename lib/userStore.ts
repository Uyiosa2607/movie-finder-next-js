import { atom } from "jotai";

interface MovieDetails {
  title: string;
  id: string;
  budget: number;
  backdrop_path: string;
  original_language: string;
  overview: string;
  release_date: string;
  runtime: number;
}

// interface User {
//   name: string;
//   email: string;
//   img: string;
//   id: string;
//   auth: boolean;
//   title: string;
// }

const currentUser = atom({
  id: "",
  email: "",
  img: "",
  auth: false,
  name: "",
});

const isLoadingAtom = atom(true);

const toggleModal = atom(false);

const movieDetailsAtom = atom<MovieDetails[]>([]);

export { isLoadingAtom, toggleModal, movieDetailsAtom, currentUser };
