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
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import upload from "@/lib/Uploader";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  // Function to handle Profile picture selection
  function handleProfilePicture(event: any) {
    if (event.target.files[0]) {
      setAvatar({
        file: event.target.files[0],
        url: URL.createObjectURL(event.target.files[0]),
      });
    }
  }

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

      const profileImgUrl = await upload(avatar.file);

      const savedData = await setDoc(doc(db, "users", response.user.uid), {
        name,
        email,
        id: response.user.uid,
        img: profileImgUrl,
      });

      setLoading(false);
      console.log(response, savedData);
      router.push("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  console.log(avatar.url);

  return (
    <main className="bg-[url('/img/background.jpg')] bg-center w-screen h-screen pt-[4rem]">
      <div className="w-[60vw] backdrop-blur-sm bg-white/30 mx-auto h-[80vh] rounded-lg">
        <form onSubmit={handleRegister} className="pt-[8rem] text-[#333]">
          <h3 className="text-center text-2xl font-medium mb-3">
            Create an Account
          </h3>
          <div className="w-[400px] flex gap-2 items-center mb-4 mx-auto">
            <Avatar className="w-[40px] object-cover h-[40px]">
              <AvatarImage src={avatar.url} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Label className="uppercase text-sm font-medium" htmlFor="avatar">
              select profile picture
            </Label>
            <Input
              style={{ display: "none" }}
              type="file"
              name="avatar"
              id="avatar"
              onChange={handleProfilePicture}
            />
          </div>
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
