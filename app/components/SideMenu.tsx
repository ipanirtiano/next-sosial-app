/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import { user } from "@prisma/client";

const SideMenu = ({ user }: { user: user }) => {
  return (
    <>
      <div className="pb-6 border-b border-gray-300">
        <ul className="space-y-4 ">
          <Link
            href="/profile"
            className="flex gap-3 items-center cursor-pointer"
          >
            {/* <Image
              src={`/profile_img/${user?.profile_pic}`}
              width={24}
              height={24}
              alt="me"
              className="bg-gray-200 rounded-full object-cover"
            ></Image> */}
            <img
              src={`profile_img/${user?.profile_pic}`}
              className="w-[23px] h-[23px] object-cover rounded-full bg-gray-200"
              alt=""
            />

            <p className="font-semibold text-sm">{user?.full_name}</p>
          </Link>

          <li className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/assets/1.png"
              width={20}
              height={20}
              alt="me"
              className="bg-gray-200"
            ></Image>
            <p className="font-semibold text-sm">Friends</p>
          </li>
          <li className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/assets/2.png"
              width={20}
              height={20}
              alt="me"
              className="bg-gray-200"
            ></Image>
            <p className="font-semibold text-sm">Groups</p>
          </li>
          <li className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/assets/3.png"
              width={20}
              height={20}
              alt="me"
              className="bg-gray-200"
            ></Image>
            <p className="font-semibold text-sm">Market Places</p>
          </li>
          <li className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/assets/4.png"
              width={20}
              height={20}
              alt="me"
              className="bg-gray-200"
            ></Image>
            <p className="font-semibold text-sm">Watch</p>
          </li>
          <li className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/assets/5.png"
              width={20}
              height={20}
              alt="me"
              className="bg-gray-200"
            ></Image>
            <p className="font-semibold text-sm">Memories</p>
          </li>
        </ul>
      </div>

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
    </>
  );
};

export default SideMenu;
