"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiTrolleyFill } from "react-icons/pi";
import { IoNotifications, IoSearchOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

import TooltipIconButton from "./toolTip";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.isLoggedIn);
        setUserId(data.userId);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);
  useEffect(() => {
    if (!userId) return;
    fetch(/api/getUsernameById/${userId})
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.nama);
      })
      .catch(() => setIsLoggedIn(false));
  }, [userId]);
  // console.log(User ID: ${userId}, User Name: ${userName});

  useEffect(() => {
    const btn = document.querySelector("#mega-menu-toggle");
    const menu = document.querySelector("#mega-menu");

    const handleClick = (e: Event) => {
      if (menu?.classList.contains("hidden")) {
        menu.classList.remove("hidden");
        menu.classList.add("grid");
      } else {
        menu?.classList.add("hidden");
        menu?.classList.remove("grid");
      }
    };

    if (btn && window.matchMedia("(hover: none)").matches) {
      btn.addEventListener("click", handleClick);
    }

    return () => {
      btn?.removeEventListener("click", handleClick);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim() !== "") {
      router.push(/home?name=${encodeURIComponent(search.trim())});
    }
  };

  const handleCategoryClick = (kategori: string) => {
    router.push(/home?category=${encodeURIComponent(kategori)});
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += 00${value.toString(16)}.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: ${name.split(" ")[0][0]},
    };
  }
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white text-gray-700 shadow-sm">
      <div className="border-b border-gray-300 py-4 px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Link href={"/home"}>
              <img src="/trashell.png" alt="logo-trashell" className="w-8 h-8" />
            </Link>
          </div>

          <div className="w-full flex items-center justify-between md:flex-1 gap-2">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative group">
                <button id="mega-menu-toggle" className="hidden sm:flex items-center gap-2 cursor-pointer rounded-md border border-gray-400 py-2.5 px-4 text-sm text-black hover:bg-gray-100">
                  <GiHamburgerMenu className="w-5 h-5" />
                  <span>Kategori</span>
                </button>

                <div id="mega-menu" className="absolute left-0 top-full z-50 hidden group-hover:grid w-[800px] grid-cols-2 md:grid-cols-3 gap-x-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md">
                  {["Perabotan", "Elektronik", "Fashion", "Kecantikan", "Otomotif", "Olahraga", "Hobi", "Mainan", "Makanan & Minuman", "Bayi dan Anak", "Kesehatan"].map((kategori) => (
                    <div key={kategori} className="p-2 pb-0 text-gray-900 md:pb-2">
                      <ul className="space-y-2">
                        <li>
                          <button onClick={() => handleCategoryClick(kategori)} className="flex items-center text-gray-900 hover:text-[#3B82F6] cursor-pointer">
                            {kategori}
                          </button>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-w-max flex items-center w-full rounded-md border border-gray-400 px-3 py-2.5 focus-within:ring-1 focus-within:ring-blue-300 bg-white">
                <IoSearchOutline className="w-5 h-5 text-gray-500" />
                <input type="text" className="ml-2 w-full bg-transparent text-sm focus:outline-none" placeholder="Cari produk kesukaanmu" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <TooltipIconButton title="Keranjang">
                <PiTrolleyFill className="w-5 h-5 text-gray-600" />
              </TooltipIconButton>

              <TooltipIconButton title="Notifikasi">
                <IoNotifications className="w-5 h-5 text-gray-600" />
              </TooltipIconButton>

              {isLoggedIn === false && (
                <button className="hidden md:inline-block rounded-md bg-[#3B82F6] px-3 md:px-5 py-2.5 text-sm font-medium text-white hover:bg-[#3b67f6] cursor-pointer" onClick={() => router.push("/login")}>
                  Login
                </button>
              )}
              {isLoggedIn === true && !userName && <span className="text-sm text-gray-500">Loading...</span>}
              {isLoggedIn === true && userName && <Avatar {...stringAvatar(userName!)} />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;