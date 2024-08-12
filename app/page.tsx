"use client";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import Login from "@/components/system/Login";
import HomePage from "@/components/system/HomePage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [auth, setAuth] = useState(false);

  const router = useRouter();

  return <>{auth ? <HomePage /> : <Login />}</>;

  // return (
  //   <>
  //     <button onClick={() => setAuth(!auth)}>toggle</button>;
  //   </>
  // );
}
