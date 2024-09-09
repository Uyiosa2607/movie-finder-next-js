"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);

  //Function to handle users auth
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formdata = new FormData(event.currentTarget);

    const email: any = formdata.get("email");
    const password: any = formdata.get("password");

    try {
      setLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <main className="bg-[url('/img/background.jpg')] bg-center w-screen h-screen pt-[4rem]">
      <div className="w-[85vw] p-4 md:w-[60vw] backdrop-blur-sm bg-white/30 mx-auto h-[80vh] rounded-lg">
        <form onSubmit={handleLogin} className="pt-[8rem] text-[#333]">
          <h3 className="text-center text-2xl font-medium mb-3">
            Welcome Back
          </h3>
          <div className="md:w-[400px] mb-2 mx-auto">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Enter Your Email"
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="md:w-[400px] mx-auto">
            <Label htmlFor="password">Password</Label>
            <Input
              placeholder="Enter Your Password"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="md:w-[400px] mx-auto pt-5">
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-green-700 text-center"
            >
              Login{" "}
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
