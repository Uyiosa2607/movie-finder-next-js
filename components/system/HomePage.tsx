import { currentUser } from "@/lib/userStore";
import { useAtom } from "jotai";
import Header from "./Header";
import MovieRow from "./MovieRow";

export default function HomePage() {
  const [user, setUser] = useAtom(currentUser);

  return (
    <main className="text-slate-100">
      <Header />

      <MovieRow rowTitle="Comming soon" category="upcoming" />

      <MovieRow rowTitle="top rated" category="top_rated" />

      <MovieRow rowTitle="popular" category="popular" />
    </main>
  );
}
