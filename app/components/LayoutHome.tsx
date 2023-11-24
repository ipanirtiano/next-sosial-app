"use client";
import LeftBar from "./LeftBar";
import Navbar from "./Navbar";
import RightMenu from "./RightMenu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const LayoutsHome = ({ children }: { children: React.ReactNode }) => {
  // get auth ME
  const { data: authMe, isLoading: authMeLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await axios.get("/api/auth/me");
      return response.data;
    },
  });

  return (
    <>
      {authMeLoading ? (
        <div className="absolute inset-0 bg-gray-50 z-[100]">
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex items-center gap-2">
              <span className="loading loading-spinner loading-md"></span>
              <p className="text-sm">Loading...</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[1900px] mx-auto bg-gray-100">
          <Navbar user={authMe} />
          <div className="grid grid-cols-12 h-screen gap-4">
            <div className="col-span-2 h-screen hidden md:block">
              <LeftBar user={authMe} />
            </div>

            <div className="md:col-span-8 col-span-12 pt-[80px] px-4 h-screen overflow-auto pb-[50px]">
              {children}
            </div>

            <div className="col-span-2 h-screen bg-white hidden md:block">
              <RightMenu />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutsHome;
