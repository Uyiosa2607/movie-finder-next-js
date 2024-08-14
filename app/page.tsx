/* eslint-disable @next/next/no-img-element */
"use client";
import Login from "@/components/system/Login";
import HomePage from "@/components/system/HomePage";
import { auth } from "@/lib/Firebase";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { userAtom } from "@/lib/store";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const onSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          id: user.uid,
          auth: true,
        });
        setLoading(false);
      } else {
        setUser({
          id: "",
          auth: false,
        });
        setLoading(false);
      }
    });

    return () => {
      onSub();
    };
  }, [onAuthStateChanged]);

  console.log(user);

  if (loading === true)
    return (
      <main>
        <div className="container mx-auto flex items-center justify-center">
          <div className="w-screen flex items-center justify-center h-screen">
            <img
              className="w-[100px] h-[100px]"
              src="/img/loading.svg"
              alt="loader"
            />
          </div>
        </div>
      </main>
    );

  return <>{user.auth ? <HomePage /> : <Login />}</>;
}
