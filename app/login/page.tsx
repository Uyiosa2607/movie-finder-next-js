"use client";
import { FormEvent } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Login() {
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <Card className="bg-white p-2  shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-4">
            <i className="fas fa-film text-4xl text-red-500"></i>
            <h2 className="text-2xl font-bold text-gray-900">MovieFinder</h2>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to access your account and continue your movie journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="mb-4 flex flex-col gap-1">
              <Label className="font-[600px]">Email</Label>
              <Input
                name="email"
                className="w-full"
                size={16}
                type="email"
                required
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

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white !rounded-button whitespace-nowrap cursor-pointer"
            >
              Sign in
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
            Dont&apos;t have an account?
            <Link
              href="/register"
              className="font-medium pl-1 text-red-600 hover:text-red-500 cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
