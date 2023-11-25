/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

const Banner = () => {
  const { data: authMe }: any = useQuery({ queryKey: ["me"] });

  return (
    <div className="w-full h-[200px] bg-white relative border border-gray-200">
      <img
        src={authMe?.cover_pic}
        alt=""
        className="w-full h-full object-cover"
      />

      <img
        src={authMe?.profile_pic}
        alt=""
        className="w-[130px] h-[130px] bg-gray-100 rounded-full absolute bottom-[-60px] left-[50%] translate-x-[-50%] border-[3px] border-white shadow-lg object-cover"
      />
    </div>
  );
};

export default Banner;
