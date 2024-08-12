"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/lib/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Register() {
  const [loading, setLoading] = useState(false);

  //Function to handle users Registration
  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);

    const name: any = formdata.get("name");
    const email: any = formdata.get("email");
    const password: any = formdata.get("password");

    try {
      setLoading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const savedData = await setDoc(doc(db, "Users", response.user.uid), {
        name,
        email,
        id: response.user.uid,
      });
      setLoading(false);
      console.log(response, savedData);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <main className="bg-[url('/img/background.jpg')] bg-center w-screen h-screen pt-[4rem]">
      <div className="w-[60vw] backdrop-blur-sm bg-white/30 mx-auto h-[80vh] rounded-lg">
        <form onSubmit={handleRegister} className="pt-[8rem] text-[#333]">
          <h3 className="text-center text-2xl font-medium mb-3">
            Create an Account
          </h3>
          <div className="w-[400px] mb-2 mx-auto">
            <Label htmlFor="name">Full Name</Label>
            <Input
              placeholder="Name and Surname"
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="w-[400px] mb-2 mx-auto">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Enter Your Email"
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="w-[400px] mx-auto">
            <Label htmlFor="password">Password</Label>
            <Input
              placeholder="Enter Your Password"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="w-[400px] mx-auto pt-5">
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-green-700 text-center"
            >
              Register{" "}
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
