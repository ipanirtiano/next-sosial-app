"use client";
import { post } from "@prisma/client";
import LayoutsHome from "../components/LayoutHome";
import Post from "../components/Post";
import Share from "../components/Share";
import Stories from "../components/Stories";
import { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  // state data post
  const [dataPost, setDataPost] = useState([]);

  const getAllPostById = async () => {
    try {
      const response = await axios.get("/api/post");
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
      <Stories />
      <Share />
      {dataPost?.map((item: post, i: any) => {
        return <Post key={i} item={item} />;
      })}
    </LayoutsHome>
  );
};

export default Page;
