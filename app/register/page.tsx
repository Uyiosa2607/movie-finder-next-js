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
import {
  Loader2,
  Film,
  Mail,
  Lock,
  User,
  Upload,
  ArrowRight,
  Check,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { toast } = useToast();

  // Password strength checker
  const passwordStrength = {
    hasLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  const isPasswordStrong = Object.values(passwordStrength).every(Boolean);

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
    setError("");

    if (avatar.file === null) {
      setError("Please select a profile picture");
      return;
    }

    const formdata = new FormData(event.currentTarget);
    const name: any = formdata.get("name");
    const email: any = formdata.get("email");
    const password: any = formdata.get("password");
    const confirmPassword: any = formdata.get("confirm_password");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!isPasswordStrong) {
      setError("Password does not meet strength requirements");
      return;
    }

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
        title: "Registration Successful",
        description: "You can login now with your credentials",
      });
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered");
      } else {
        setError("Registration failed. Please try again.");
      }
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Floating Movie Icons */}
      <div className="absolute top-10 right-20 opacity-10">
        <Film className="w-32 h-32 text-purple-500" />
      </div>
      <div className="absolute bottom-10 left-20 opacity-10">
        <Film className="w-24 h-24 text-pink-500" />
      </div>

      <Card className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border-slate-800 shadow-2xl shadow-purple-900/20 overflow-hidden">
        <CardHeader className="space-y-3 text-center relative z-10 pb-6">
          {/* Logo */}
          <div className="mx-auto mb-2">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-2xl">
                <Film className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-1">
              MOVIE FINDER
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Your Gateway to Cinema
            </p>
          </div>

          <CardTitle className="text-2xl md:text-3xl font-bold text-white pt-4">
            Create Account
          </CardTitle>
          <CardDescription className="text-slate-400 text-base">
            Join us to discover and track your favorite movies
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm">
                <p className="text-red-400 text-sm font-medium text-center">
                  {error}
                </p>
              </div>
            )}

            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center space-y-3 pb-2">
              <Avatar className="w-24 h-24 border-4 border-slate-700 shadow-xl">
                {avatar.url ? (
                  <AvatarImage src={avatar.url} alt="Profile" />
                ) : (
                  <AvatarFallback className="bg-slate-800">
                    <User className="w-12 h-12 text-slate-500" />
                  </AvatarFallback>
                )}
              </Avatar>

              <label htmlFor="profile-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-purple-500/50 transition-all duration-300">
                  <Upload className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-semibold text-slate-300">
                    {avatar.url ? "Change Photo" : "Upload Photo"}
                  </span>
                </div>
                <Input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicture}
                  className="hidden"
                  required
                />
              </label>
            </div>

            {/* Full Name Field */}
            <div className="space-y-2">
              <Label className="text-slate-300 font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" />
                Full Name
              </Label>
              <div className="relative group">
                <Input
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full h-12 bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder:text-slate-500 rounded-xl transition-all duration-300 pl-4"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label className="text-slate-300 font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" />
                Email Address
              </Label>
              <div className="relative group">
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full h-12 bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder:text-slate-500 rounded-xl transition-all duration-300 pl-4"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label className="text-slate-300 font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" />
                Password
              </Label>
              <div className="relative group">
                <Input
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full h-12 bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder:text-slate-500 rounded-xl transition-all duration-300 pl-4"
                />
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-3 space-y-2 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Password Requirements:
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      {passwordStrength.hasLength ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-600" />
                      )}
                      <span
                        className={`text-xs ${
                          passwordStrength.hasLength
                            ? "text-green-400"
                            : "text-slate-500"
                        }`}
                      >
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordStrength.hasUpper ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-600" />
                      )}
                      <span
                        className={`text-xs ${
                          passwordStrength.hasUpper
                            ? "text-green-400"
                            : "text-slate-500"
                        }`}
                      >
                        One uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordStrength.hasLower ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-600" />
                      )}
                      <span
                        className={`text-xs ${
                          passwordStrength.hasLower
                            ? "text-green-400"
                            : "text-slate-500"
                        }`}
                      >
                        One lowercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordStrength.hasNumber ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-600" />
                      )}
                      <span
                        className={`text-xs ${
                          passwordStrength.hasNumber
                            ? "text-green-400"
                            : "text-slate-500"
                        }`}
                      >
                        One number
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label className="text-slate-300 font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" />
                Confirm Password
              </Label>
              <div className="relative group">
                <Input
                  name="confirm_password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full h-12 bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder:text-slate-500 rounded-xl transition-all duration-300 pl-4"
                />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-2">
                  <X className="w-3 h-3" />
                  Passwords do not match
                </p>
              )}
              {confirmPassword && password === confirmPassword && (
                <p className="text-xs text-green-400 flex items-center gap-1 mt-2">
                  <Check className="w-3 h-3" />
                  Passwords match
                </p>
              )}
            </div>

            {/* Create Account Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-purple-900/50 hover:shadow-xl hover:shadow-purple-900/70 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed group mt-6"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-3 text-slate-500 font-semibold">
                  or continue with
                </span>
              </div>
            </div>

            {/* Google Sign Up Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 bg-slate-800/50 hover:bg-slate-700/50 border-slate-700 hover:border-purple-500/50 text-white font-semibold rounded-xl transition-all duration-300 group"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                />
                <path
                  fill="#34A853"
                  d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                />
                <path
                  fill="#4A90E2"
                  d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                />
              </svg>
              <span className="group-hover:text-white transition-colors">
                Continue with Google
              </span>
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center relative z-10 pt-6">
          <p className="text-sm text-slate-400">
            Already have an account?
            <Link
              href="/login"
              className="font-semibold pl-1 text-purple-400 hover:text-purple-300 transition-colors"
            >
              Login
            </Link>
          </p>
        </CardFooter>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600"></div>
      </Card>
    </div>
  );
}
