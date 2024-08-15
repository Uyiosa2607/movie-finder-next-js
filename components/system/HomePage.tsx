import { currentUser } from "@/lib/userStore";
import { useAtom } from "jotai";
import Header from "./Header";
import Rated from "../movie-categories/Rated";

export default function HomePage() {
  const [user, setUser] = useAtom(currentUser);

  return (
    <main>
      <Header />
      <div className="container mx-auto">
        <h1 className="text-center mt-[10rem]">This is Home page</h1>
        <div className="w-500px mx-auto">
          <p>Email: {user.email}</p>
          <p>Id: {user.id}</p>
        </div>
        <Rated />
      </div>
    </main>
  );
}
