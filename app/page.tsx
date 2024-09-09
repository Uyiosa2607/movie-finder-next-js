/* eslint-disable @next/next/no-img-element */
"use client";

import Login from "@/components/system/Login";
import HomePage from "@/components/system/HomePage";
import Loading from "@/components/system/Loading";
import { auth } from "@/lib/Firebase";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/Firebase";
import { currentUser, isLoadingAtom } from "@/lib/userStore";

export default function Home() {
  const [user, setUser] = useAtom(currentUser);
  const [loading, setLoading] = useAtom(isLoadingAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      if (!user) {
        setUser({ email: "", id: "", img: "", auth: false, name: "" });
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUser({
            name: data.name || "",
            email: data.email || "",
            id: data.id || user.uid,
            img: data.img || "",
            auth: true,
          });
        } else {
          console.log("No such document!");
          setUser({ email: "", id: "", img: "", auth: false, name: "" });
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        setUser({ email: "", id: "", img: "", auth: false, name: "" });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  if (loading) return <Loading />;

  return (
    <main className="h-screen w-screen">
      {user.auth ? <HomePage /> : <Login />}
    </main>
  );
}
