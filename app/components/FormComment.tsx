/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormComment = ({ idPost }: { idPost: string }) => {
  // init use query get auth me
  const { data: authMe }: any = useQuery({ queryKey: ["me"] });
  // init use router
  const router = useRouter();
  //state form comment
  const [des_comment, setDesComment] = useState("");

  // set mutation add comment
  const { mutate: addComment, isPending: addCommentLoading } = useMutation({
    mutationFn: async (newComment: any) => {
      return await axios.post("/api/post/comment", newComment);
    },
    onSuccess: () => {
      setDesComment("");
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // function handle Comment
  const handleComment = (e: SyntheticEvent) => {
    e.preventDefault();
    // set data comment
    const newComment = {
      id_post: idPost,
      des_comment: des_comment,
    };
    // run the mutations
    addComment(newComment);
  };
  return (
    <div className="w-full flex gap-3 mt-4 border-b pt-2 pb-3 items-center">
      <div className="w-10">
        <img
          src={`/profile_img/${authMe?.profile_pic}`}
          alt=""
          className="rounded-full w-8 h-8 object-cover bg-gray-200"
        />
      </div>
      <form className="w-full" onSubmit={handleComment}>
        <div className="w-full flex items-center gap-2">
          <input
            type="text"
            className="w-full placeholder:text-sm text-sm outline-none border-none"
            placeholder="Comments here.."
            value={des_comment}
            onChange={(e) => setDesComment(e.target.value)}
          />
          <button type="submit" className="text-xs bg-blue-600 text-white p-2">
            {addCommentLoading ? (
              <div className="flex items-center gap-2">
                <span className="loading loading-spinner loading-xs text-xs"></span>
                Send
              </div>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComment;
