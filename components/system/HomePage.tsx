import { userAtom } from "@/lib/store";
import { useAtom } from "jotai";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/Firebase";
import Header from "./Header";

export default function HomePage() {
  const [user, setUser] = useAtom(userAtom);
  console.log(auth.currentUser);

  function handleLogout() {
    signOut(auth);
    console.log(auth.currentUser);
  }

  return (
    <main>
      <Header />
      <div className="container mx-auto">
        <h1 className="text-center mt-[10rem]">This is Home page</h1>
        <div className="w-500px mx-auto">
          <p>Email: {user.email}</p>
          <p>Id: {user.id}</p>
        </div>

        <button onClick={handleLogout}>signout</button>
      </div>
    </main>
  );
}
