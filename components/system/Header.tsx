/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useAtom } from "jotai";
import { currentUser } from "@/lib/userStore";
import axios from "axios";
import { auth } from "@/lib/Firebase";
import { signOut } from "firebase/auth";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CiLogout } from "react-icons/ci";
import { GoGear } from "react-icons/go";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { CommandEmpty, CommandInput, CommandList } from "cmdk";
import { Search } from "lucide-react";
import Link from "next/link";

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

const token: any = process.env.NEXT_PUBLIC_MOVIE_AUTH_TOKEN;

export default function Header() {
  const [user] = useAtom(currentUser);
  const [searchedMovies, setSearchedMovies] = useState<Movies[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleLogout() {
    signOut(auth);
  }

  async function findMovies() {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query,
        include_adult: "true",
        language: "en-US",
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization: token,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setSearchedMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async function handleInput(value: string) {
    if (value.length >= 3) {
      setQuery(value);
      await findMovies();
    }
  }

  return (
    <main className="px-2 py-2.5 z-[500] fixed  bg-stone-50 top-0 left-0 w-full">
      <div className="md:container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="uppercase font-[800]">Movie Finder</h2>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-lg flex items-center gap-4">
              <Popover>
                <PopoverTrigger>
                  <Search size={17} className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent
                  className="w-full md:w-[500px] mx-auto"
                  align="start"
                >
                  <Command className="w-[300px] md:w-full p-2">
                    <div className="flex w-full items-center gap-1">
                      <Search className="text-xs text-muted-foreground" />
                      <CommandInput
                        className="text-base w-full"
                        onValueChange={(value) => handleInput(value)}
                        placeholder="Search Movies"
                      />
                    </div>
                    <CommandList>
                      <CommandEmpty>No movies found</CommandEmpty>
                      <CommandGroup>
                        {searchedMovies.map((movie) => (
                          <CommandItem key={movie.id} value={movie.title}>
                            <Link href={`/movie/${movie.id}`}>
                              <div className="flex items-center gap-2">
                                <img
                                  src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                                  alt={movie.title}
                                  className="w-8 h-12"
                                />
                                <span>
                                  {movie.title} ({movie.release_date})
                                </span>
                              </div>
                            </Link>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <Popover>
              <PopoverTrigger>
                <Avatar className="object-cover w-[25px] h-[25px] md:h-[40px] md:w-[40px]">
                  <AvatarImage className="cursor-pointer" src={user.img} />
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
