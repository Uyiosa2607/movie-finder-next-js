import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function Login() {
  return (
    <main className="w-screen bg-center h-screen  bg-[url('/img/background.jpg')] pt-[2rem]">
      <div className="container rounded-lg backdrop-blur-md bg-white/30 mx-auto w-[90vw] h-[90vh]">
        <div className="flex gap-3">
          <div className="flex-1">
            <form className="pt-[8rem] text-[#333]">
              <h1 className="text-center capitalize font-semibold text-white">
                Welcome back
              </h1>
              <div className="w-[400px] mb-3 mx-auto">
                <Label htmlFor="emaiil">Email</Label>
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
              <div className="mt-5 w-[400px] mx-auto flex items-center justify-center">
                <Button className="w-full hover:bg-green-700 text-center">
                  Login
                </Button>
              </div>
            </form>
          </div>
          <Separator orientation="vertical" className="h-[90vh] bg-gray-100" />
          <div className="flex-1">
            <form className="pt-[8rem] text-[#333]">
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
                <Button className="w-full bg-green-700 text-center">
                  Register
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
