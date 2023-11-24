"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  AiOutlineCheck,
  AiOutlineWhatsApp,
  AiTwotoneMail,
} from "react-icons/ai";
import { BsFacebook, BsGlobe, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

type Props = {};

const ProfileDetails = (props: Props) => {
  const { data: authMe }: any = useQuery({ queryKey: ["me"] });

  return (
    <div className="w-full bg-white text-gray-900 pb-8">
      <div className="pt-[70px] flex flex-col justify-center items-center mb-4">
        <p className="font-semibold text-2xl">{authMe?.full_name}</p>
        <div className="flex gap-3 py-2">
          <p className="text-sm text-gray-600">4578K Followers</p>
          <div className="w-5 h-5 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs">
            <AiOutlineCheck />
          </div>
        </div>
      </div>

      <div className="px-6">
        <p className="font-semibold text-xl mb-4">Contact</p>

        <div className="flex flex-wrap justify-between gap-2">
          <div className="md:max-w-[40%] w-full">
            <ul>
              <li className="flex items-center space-x-2 py-2 border-b border-gray-300">
                <FaRegUser className="text-xl" />
                <p className="text-sm">{authMe?.full_name}</p>
              </li>
              <li className="flex items-center space-x-2 py-2 border-b border-gray-300">
                <AiTwotoneMail className="text-xl" />
                <p className="text-sm">{authMe?.email}</p>
              </li>
              <li className="flex items-center space-x-2 py-2 border-b border-gray-300">
                <AiOutlineWhatsApp className="text-xl" />
                <p className="text-sm">{authMe?.phone}</p>
              </li>
            </ul>
          </div>

          <div className="md:max-w-[40%] w-full">
            <ul>
              <li className="flex items-center space-x-2 py-2 border-b border-gray-300">
                <BsFacebook className="text-xl" />
                <p className="text-sm">{authMe?.facebook}</p>
              </li>
              <li className="flex items-center space-x-2 py-2 border-b border-gray-300">
                <BsInstagram className="text-xl" />
                <p className="text-sm">{authMe?.instagram}</p>
              </li>
              <li className="flex items-center space-x-2 py-2 border-b border-gray-300">
                <BsTwitter className="text-xl" />
                <p className="text-sm">{authMe?.twitter}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
