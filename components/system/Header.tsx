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
import { Search, Film, Star } from "lucide-react";
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

    setLoading(true);
    axios
      .request(options)
      .then(function (response) {
        setSearchedMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }

  async function handleInput(value: string) {
    setQuery(value);
    if (value.length >= 3) {
      await findMovies();
    } else {
      setSearchedMovies([]);
    }
  }

  return (
    <main className="px-4 py-4 z-[500] fixed top-0 left-0 w-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl shadow-purple-900/10">
      <div className="md:container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-transform hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                <Film className="w-5 h-5 text-white" />
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              MOVIE FINDER
            </h2>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search */}
            <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <PopoverTrigger asChild>
                <button className="relative group p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                  <Search
                    size={18}
                    className="text-slate-300 group-hover:text-purple-400 transition-colors"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300"></div>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[340px] md:w-[500px] p-0 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-purple-900/20"
                align="end"
              >
                <Command className="bg-transparent border-0">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/50">
                    <Search className="w-4 h-4 text-slate-400" />
                    <CommandInput
                      className="text-base bg-transparent border-0 text-slate-100 placeholder:text-slate-500"
                      onValueChange={handleInput}
                      placeholder="Search for movies..."
                      value={query}
                    />
                    {loading && (
                      <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </div>
                  <CommandList className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    <CommandEmpty className="py-8 text-center text-slate-500">
                      {query.length < 3
                        ? "Type at least 3 characters"
                        : "No movies found"}
                    </CommandEmpty>
                    <CommandGroup>
                      {searchedMovies.map((movie) => (
                        <CommandItem
                          key={movie.id}
                          value={movie.title}
                          className="px-4 py-3 cursor-pointer hover:bg-slate-800/50 transition-colors"
                          onSelect={() => setIsSearchOpen(false)}
                        >
                          <Link
                            href={`/movie/${movie.id}`}
                            className="flex items-center gap-3 w-full"
                          >
                            <div className="relative flex-shrink-0 w-12 h-16 rounded-md overflow-hidden bg-slate-800 border border-slate-700/50">
                              {movie.poster_path ? (
                                <img
                                  src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                                  alt={movie.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Film className="w-6 h-6 text-slate-600" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-100 truncate">
                                {movie.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-slate-500">
                                  {movie.release_date
                                    ? new Date(movie.release_date).getFullYear()
                                    : "N/A"}
                                </span>
                                {movie.vote_average > 0 && (
                                  <>
                                    <span className="text-slate-600">•</span>
                                    <div className="flex items-center gap-1">
                                      <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                      <span className="text-xs text-slate-400">
                                        {movie.vote_average.toFixed(1)}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </Link>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* User Avatar */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                  <Avatar className="relative w-9 h-9 md:w-10 md:h-10 ring-2 ring-slate-700/50 group-hover:ring-purple-500/50 transition-all duration-300">
                    <AvatarImage src={user.img} className="object-cover" />
                  </Avatar>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-56 p-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-purple-900/20"
                align="end"
              >
                <div className="flex flex-col gap-1">
                  {/* User Info */}
                  <div className="px-3 py-2 mb-2 border-b border-slate-700/50">
                    <p className="text-sm font-medium text-slate-200">
                      {user.name || "User"}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user.email || ""}
                    </p>
                  </div>

                  {/* Settings */}
                  <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/50 text-slate-300 hover:text-purple-400 transition-all duration-200 group">
                    <div className="p-1.5 rounded-md bg-slate-800/50 group-hover:bg-purple-500/10 transition-colors">
                      <GoGear className="text-lg" />
                    </div>
                    <span className="text-sm font-medium">Settings</span>
                  </button>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-slate-300 hover:text-red-400 transition-all duration-200 group"
                  >
                    <div className="p-1.5 rounded-md bg-slate-800/50 group-hover:bg-red-500/10 transition-colors">
                      <CiLogout className="text-lg" />
                    </div>
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </main>
  );
}
