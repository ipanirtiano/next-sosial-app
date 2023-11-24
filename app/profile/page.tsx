"use client";
import Banner from "../components/Banner";
import LayoutsHome from "../components/LayoutHome";
import Post from "../components/Post";
import ProfileDetails from "../components/ProfileDetails";
import axios from "axios";
import { post } from "@prisma/client";
import { useEffect, useState } from "react";

const Page = () => {
  // state data post
  const [dataPost, setDataPost] = useState([]);

  const getAllPostById = async () => {
    try {
      const response = await axios.get("/api/post/me");
      setDataPost(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPostById();
  }, [dataPost]);

  return (
    <LayoutsHome>
      <Banner />
      <ProfileDetails />

      {dataPost?.map((item: post, i: any) => {
        return <Post key={i} item={item} />;
      })}
    </LayoutsHome>
  );
};

export default Page;
