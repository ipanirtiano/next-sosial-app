/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { BsFillTrash3Fill, BsShare, BsThreeDotsVertical } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import CommenList from "./CommenList";
import moment from "moment";
import FormComment from "./FormComment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const Post = ({ item }: { item: any }) => {
  const router = useRouter();
  // init use query get auth me
  const { data: authMe }: any = useQuery({ queryKey: ["me"] });
  const [togleDelete, setTogleDelete] = useState(false);
  const [oppen, setOpen] = useState(false);
  const [dataLike, setDataLike] = useState("");

  // set get data likes
  const getDataLikes = async () => {
    try {
      const response = await axios.get(`/api/post/like/${item?.id}`);
      setDataLike(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataLikes();
  }, [dataLike]);

  // function delete post byID
  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(`/api/post/${item.id}`);
      setTogleDelete(false);
      router.refresh();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // funtion handle like
  const handleLikes = async () => {
    try {
      // get id POST
      const idPost = item.id;
      const response = await axios.post("/api/post/like/", { idPost });
      setDataLike(response.data.message);
      router.refresh();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-white py-3 md:px-4 px-3 rounded-md mt-[20px] text-gray-900 relative">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="cursor-pointer">
            <img
              src={`/profile_img/${item?.User?.profile_pic}`}
              alt=""
              className="rounded-full w-8 h-8 object-cover bg-gray-200"
            />
          </div>
          <div>
            <p className="font-semibold">{item?.User?.full_name}</p>
            <p className="text-xs text-gray-500">
              {moment(item?.createdAt).fromNow()}
            </p>
          </div>
        </div>
        {item?.id_user === authMe?.id && (
          <div
            onClick={() => setTogleDelete(!togleDelete)}
            className="cursor-pointer"
          >
            <BsThreeDotsVertical />
          </div>
        )}

        {togleDelete && (
          <div
            onClick={handleDeletePost}
            className="absolute top-8 right-4 bg-slate-100 shadow-md py-2 px-3"
          >
            <ul className="cursor-pointer flex gap-2">
              <li className="text-xs ">Delete Post</li>
              <BsFillTrash3Fill className="text-red-500" />
            </ul>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm mb-2">{item?.description_post}</p>
        {item?.image_post && (
          <img src={item?.image_post} alt="" className="w-full" />
        )}
      </div>
      <div className="flex items-center gap-4 pt-5">
        <div
          onClick={handleLikes}
          className="flex items-center gap-2 cursor-pointer"
        >
          {dataLike === "like" ? (
            <AiTwotoneLike className="text-blue-800" />
          ) : (
            <AiOutlineLike className="text-gray-800" />
          )}

          <p className="text-sm">{item?.like?.length} Likes</p>
        </div>

        <div
          onClick={() => setOpen(!oppen)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <BiCommentDetail />

          <p className="text-sm"> {item?.comment?.length} Comments</p>
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <BsShare />
          <p className="text-sm">Share</p>
        </div>
      </div>

      <div className={`${oppen ? "h-full" : "h-0"} w-full  overflow-hidden`}>
        <FormComment idPost={item?.id} />

        {item?.comment?.map((item: any, i: 0) => {
          return <CommenList key={i} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Post;
