"use client";
/* eslint-disable @next/next/no-img-element */
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState, SyntheticEvent } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import NotifyMe from "./NotifyMe";

const Share = () => {
  // init use router
  const router = useRouter();
  const { data: authMe }: any = useQuery({ queryKey: ["me"] });
  // state form post
  const [image, setImage] = useState<File>();
  const [description_post, setDescriptionPost] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  // state modal box
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // mutations create a new post
  const { mutate: createPost, isPending: createPostLoading } = useMutation({
    mutationFn: async (newPost: any) => {
      const response = await axios.post("/api/post", newPost);
      return response.data.data;
    },
    onSuccess: async () => {
      setDescriptionPost("");
      setImage(undefined);
      setMessage("Update Post Successfully...");
      setIsOpen(true);
      setStatus(true);
      router.push("/home");
      router.refresh();
    },
    onError: (error) => {
      setMessage("Opps.. something went wrong!");
      setStatus(false);
      setIsOpen(true);
    },
  });

  // function upload image
  const uploadFile = async () => {
    if (image) {
      // set form data
      const formData = new FormData();
      formData.set("file", image);

      try {
        const response = await axios.post("/api/upload/post", formData);

        return response.data.fileName;
      } catch (error) {
        console.log(error);
      }
    }
  };

  // function handleSubmitPost
  const handleSubmitPost = async (e: SyntheticEvent) => {
    e.preventDefault();
    // validate post
    if (description_post === "") return;

    // validate upload image
    let imagePost: any = "";
    if (image) {
      imagePost = await uploadFile();
    }

    // run mutations
    const dataPost = {
      description_post: description_post,
      image_post: imagePost,
    };
    createPost(dataPost);
    router.refresh();
  };

  // handle click callback
  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmitPost}>
        <div className="w-full bg-white py-3 md:px-4 px-3 rounded-md mt-[20px] border border-gray-200">
          <div className="flex items-start gap-3 mb-4 w-[100%]">
            <div className="cursor-pointer w-[55px]">
              <img
                src={`/profile_img/${authMe?.profile_pic}`}
                alt=""
                className="rounded-full w-8 h-8 object-cover bg-gray-200"
              />
            </div>
            <div className="w-full">
              <textarea
                className="border-none outline-none w-full resize-none placeholder:text-sm py-1"
                placeholder="Post here..."
                value={description_post}
                onChange={(e) => setDescriptionPost(e.target.value)}
              ></textarea>
            </div>
            <div className="w-[120px]">
              {image && (
                <img
                  className="object-cover w-full h-[60px]"
                  alt=""
                  src={URL.createObjectURL(image)}
                />
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center md:gap-5 gap-2">
              <div className="flex gap-2 cursor-pointer items-center">
                <input
                  type="file"
                  id="file"
                  className=" text-sm text-slate-500  hidden"
                  onChange={(e) => setImage(e.target.files?.[0])}
                />
                <label htmlFor="file">
                  <div className="item flex gap-2 cursor-pointer items-center">
                    <Image
                      src="/assets/img.png"
                      width={20}
                      height={20}
                      alt=""
                    ></Image>
                    <span className="text-sm text-gray-600 font-semibold hidden md:block">
                      Add Image
                    </span>
                  </div>
                </label>
              </div>
              <div className="flex gap-2 cursor-pointer">
                <Image
                  src="/assets/map.png"
                  width={20}
                  height={20}
                  alt=""
                ></Image>
                <p className="text-sm text-gray-600 font-semibold hidden md:block">
                  Add Location
                </p>
              </div>
              <div className="flex gap-2 cursor-pointer">
                <Image
                  src="/assets/friend.png"
                  width={20}
                  height={20}
                  alt=""
                ></Image>
                <p className="text-sm text-gray-600 font-semibold hidden md:block">
                  Add Freind
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-2 py-1 text-sm cursor-pointer  rounded-sm hover:bg-blue-700"
            >
              {createPostLoading ? (
                <div className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Loading...
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <BsFillSendFill className="text-xs" />
                  <p>Post</p>
                </div>
              )}
            </button>
          </div>
        </div>
      </form>
      {/* {message && (
        <NotifyMe
          status={status}
          message={message}
          handleClick={handleClick}
          isOpen={isOpen}
        />
      )} */}
    </>
  );
};

export default Share;
