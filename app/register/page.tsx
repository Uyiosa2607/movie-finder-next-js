"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/lib/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FormEvent } from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import upload from "@/lib/Uploader";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const { toast } = useToast();

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

    if (avatar.file === null) return alert("Please select image");

    const formdata = new FormData(event.currentTarget);
    const name: any = formdata.get("name");
    const email: any = formdata.get("email");
    const password: any = formdata.get("password");
    const confirmPassword: any = formdata.get("confirm_password");

    if (password !== confirmPassword) return alert("passwords do not match");

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
      toast({
        title: "Registration Succesfull",
        description: "You can login now with your credentials",
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <Card className="bg-white p-2  shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-4">
            <i className="fas fa-film text-4xl text-red-500"></i>
            <h2 className="text-2xl font-bold text-gray-900">MovieFinder</h2>
          </div>
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Join us to discover and track your favorite movies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="mb-4 flex flex-col gap-1">
              <Label className="font-[600px]">Full Name</Label>
              <Input
                name="name"
                className="w-full"
                required
                size={16}
                type="text"
              />
            </div>
            <div className="mb-4 flex flex-col gap-1">
              <Label className="font-[600px]">Email</Label>
              <Input
                name="email"
                className="w-full"
                required
                size={16}
                type="email"
              />
            </div>
            <div className="mb-4 flex flex-col gap-1">
              <Label className="font-[600px]">Password</Label>
              <Input
                name="password"
                className="w-full"
                size={16}
                type="password"
                required
              />
            </div>
            <div className="mb-4 flex flex-col gap-1">
              <Label className="font-[600px]">Confirm password</Label>
              <Input
                name="confirm_password"
                className="w-full"
                size={16}
                type="password"
                required
              />
            </div>
            <div className="mb-4 flex flex-col gap-1">
              <Label>Pick profile picture</Label>
              <Input onChange={handleProfilePicture} type="file" required />
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white !rounded-button whitespace-nowrap cursor-pointer"
            >
              Create Account{" "}
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            </Button>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full !rounded-button whitespace-nowrap cursor-pointer"
            >
              <i className="fab fa-google mr-2 text-red-500"></i> Continue with
              Google
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link
              href="/login"
              className="font-medium pl-1 text-red-600 hover:text-red-500 cursor-pointer"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
