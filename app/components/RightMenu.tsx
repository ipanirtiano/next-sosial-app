import React from "react";
import Image from "next/image";

type Props = {};

const RightMenu = (props: Props) => {
  return (
    <div className="h-screen overflow-auto hidden md:block bg-white pt-[60px] px-6 text-gray-800 border border-l-gray-200">
      <div className="py-4 pb-6 border-b border-gray-300">
        <p className="text-sm font-semibold mb-5 text-gray-500">Your Favorit</p>
        <ul className="space-y-4">
          <li className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/assets/6.png"
              width={20}
              height={20}
              alt="me"
              className="bg-gray-200"
            ></Image>
            <p className="font-semibold text-sm">Events</p>
          </li>
          <li className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/assets/7.png"
              width={20}
              height={20}
              alt="me"
              className="bg-gray-200"
            ></Image>
            <p className="font-semibold text-sm">Games</p>
          </li>
          <li className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/assets/8.png"
              width={20}
              height={20}
              alt="me"
              className="bg-gray-200"
            ></Image>
            <p className="font-semibold text-sm">Photos</p>
          </li>
          <li className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/assets/9.png"
              width={20}
              height={20}
              alt="me"
              className="bg-gray-200"
            ></Image>
            <p className="font-semibold text-sm">Films</p>
          </li>
          <li className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/assets/10.png"
              width={20}
              height={20}
              alt="me"
              className="bg-gray-200"
            ></Image>
            <p className="font-semibold text-sm">Messages</p>
          </li>
        </ul>
      </div>

      <div className="py-4 pb-6 border-b border-gray-300">
        <p className="text-sm font-semibold mb-5 text-gray-500">Others</p>
        <ul className="space-y-4">
          <li className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/assets/11.png"
              width={20}
              height={20}
              alt="me"
              className="bg-gray-200"
            ></Image>
            <p className="font-semibold text-sm">Tutorials</p>
          </li>
          <li className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/assets/12.png"
              width={20}
              height={20}
              alt="me"
              className="bg-gray-200"
            ></Image>
            <p className="font-semibold text-sm">Dekstop</p>
          </li>
          <li className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/assets/13.png"
              width={20}
              height={20}
              alt="me"
              className="bg-gray-200"
            ></Image>
            <p className="font-semibold text-sm">Content</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightMenu;
