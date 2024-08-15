"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/Firebase";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CiLogout } from "react-icons/ci";
import { GoGear } from "react-icons/go";
import { currentUser } from "@/lib/userStore";
import { useAtom } from "jotai";

export default function Header() {
  const [user, setUser] = useAtom(currentUser);
  function handleLogout() {
    signOut(auth);
  }
  return (
    <main className="p-4 z-100">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="uppercase font-semibold">movie finder</h2>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-xl flex items-center gap-4">
              <CiSearch className="cursor-pointer" />
              <IoIosNotificationsOutline className="cursor-pointer" />
            </div>
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    className="object-cover cursor-pointer"
                    src={user.img}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-4">
                  <div
                    onClick={handleLogout}
                    className="flex hover:text-red-600 cursor-pointer items-center gap-2"
                  >
                    <CiLogout className="text-xl" />
                    <p className="font-medium">Logout</p>
                  </div>
                  <div className="flex cursor-pointer hover:font-bold items-center gap-2">
                    <GoGear className="text-xl" />
                    <p className="font-medium">Settings</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </main>
  );
}
