/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  AiOutlineBell,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineMessage,
  AiOutlineSearch,
  AiOutlineSetting,
} from "react-icons/ai";
import Image from "next/image";
import SideMenu from "./SideMenu";
import SearchBar from "./SearchBar";
import { user } from "@prisma/client";
import Logout from "./Logout";

const Navbar = ({ user }: { user: user }) => {
  // set menu to toggle menu navbar
  const [menu, setMenu] = useState(false);
  // set settings to toggle menu settings
  const [setings, setSetings] = useState(false);

  return (
    <nav className="z-[100] flex justify-between items-center px-4 md:px-6 py-3 bg-white fixed top-0 left-0 right-0 shadow-sm text-gray-900 max-w-[1900px] mx-auto">
      {/* Logo and Menu */}
      <div className="flex md:gap-6 relative items-center gap-3">
        <AiOutlineMenu
          onClick={() => setMenu(!menu)}
          className="md:hidden text-xl cursor-pointer"
        />
        <Link href="/home" className="font-semibold md:text-lg">
          My Sosial
        </Link>
        <div
          className={`fixed md:static top-0 transition-all duration-200 ease-in-out h-screen overflow-auto md:h-0 ${
            menu ? "left-0" : "left-[-1000px]"
          }  bg-slate-100 px-4 py-4 md:p-0 w-[260px] md:w-0 shadow-md`}
        >
          <AiOutlineMenu
            onClick={() => setMenu(!menu)}
            className="md:hidden text-xl cursor-pointer mb-4"
          />
          <div className="relative">
            <input
              type="text"
              className="w-full bg-white border border-gray-200 rounded-full px-4 py-2 text-sm outline-none border-none md:hidden mb-4"
              placeholder="Seach username.."
            />
            <AiOutlineSearch className="absolute top-2 right-3 text-gray-500 md:hidden" />
          </div>
          <div>
            <SideMenu user={user} />
          </div>
        </div>
      </div>
      {/* end menu */}

      {/* search bar */}
      <div className="w-[400px] items-center justify-center hidden md:block">
        <SearchBar />
      </div>

      {/* Notify and Profile */}
      <div className="flex gap-4 items-center">
        <div className="cursor-pointer relative hidden md:block">
          <AiOutlineMessage className="text-xl" />
          <div className="w-2 h-2 rounded-full bg-red-600 text-white absolute top-[-2px] text-sm"></div>
        </div>
        <div className="cursor-pointer relative hidden md:block">
          <AiOutlineBell className="text-xl" />
          <div className="w-2 h-2 rounded-full bg-red-600 text-white absolute top-[-2px] text-sm"></div>
        </div>
        <div
          onClick={() => setSetings(!setings)}
          className="cursor-pointer relative"
        >
          <img
            src={`profile_img/${user?.profile_pic}`}
            className="w-8 h-8 object-cover rounded-full bg-gray-200"
            alt=""
          />
          <div
            className={`px-4 pt-2 pb-4 rounded-md transition-all duration-300 fixed bg-white w-[200px] shadow-2xl ${
              setings ? "top-[65px] right-2" : " top-[65px] right-[-1000px]"
            }`}
          >
            <p className="text-sm text-gray-700 mb-4">Settings</p>
            <ul className="space-y-3">
              <Link
                href="/profile"
                className="flex gap-3 items-center cursor-pointer"
              >
                <img
                  src={`profile_img/${user?.profile_pic}`}
                  className="w-8 h-8 object-cover rounded-full bg-gray-200"
                  alt=""
                />
                <p className="font-semibold text-sm">{user?.full_name}</p>
              </Link>

              <Link
                href="/settings"
                className="flex gap-3 items-center cursor-pointer"
              >
                <AiOutlineSetting className="w-6 h-6 rounded-full" />
                <p className="font-semibold text-sm">Settings</p>
              </Link>

              <button className="flex gap-3 items-center cursor-pointer">
                <Logout />
              </button>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
