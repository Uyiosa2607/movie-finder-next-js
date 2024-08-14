"use client";
import Login from "@/components/system/Login";
import HomePage from "@/components/system/HomePage";
import { auth } from "@/lib/Firebase";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { userAtom } from "@/lib/Store";

export default function Home() {
  const [user, setUser] = useAtom(userAtom);

  return <>{user.auth ? <Login /> : <HomePage />}</>;
}
