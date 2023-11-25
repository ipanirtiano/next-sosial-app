"use client";
/* eslint-disable @next/next/no-img-element */
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import NotifyMe from "./NotifyMe";
import { useForm } from "react-hook-form";

const Share = () => {
  // init use router
  const router = useRouter();
  const { data: authMe }: any = useQuery({ queryKey: ["me"] });
  // state form post
  const [image, setImage] = useState<File>();
  const [description_post, setDescriptionPost] = useState("");
  const [messageError, setMessageError] = useState("");
  const [status, setStatus] = useState(false);
  // state loading
  const [isLoading, setIsloading] = useState(false);
  // state useform
  const { register, handleSubmit } = useForm();

  // state modal box
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // mutations create a new post
  const { mutate: createPost } = useMutation({
    mutationFn: async (newPost: any) => {
      const response = await axios.post("/api/post", newPost);
      return response.data.data;
    },
    onSuccess: async () => {
      setDescriptionPost("");
      setImage(undefined);
      setIsOpen(true);
      setStatus(true);
      router.push("/home");
      router.refresh();
    },
    onError: (error) => {
      setMessageError("Opps.. something went wrong!");
      setStatus(false);
      setIsOpen(true);
    },
  });

  // handle click callback
  const handleClick = () => {
    setIsOpen(false);
  };

  // function onSubmit handle post and upload file
  const onSubmit = async (data: any) => {
    // set is loading true
    setIsloading(true);
    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "uploads");
        const uploadResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dqxwj5jsh/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const uploadedImageData = await uploadResponse.json();
        imageUrl = uploadedImageData.secure_url;
      }

      // run mutations
      const dataPost = {
        description_post: description_post,
        image_post: imageUrl,
      };
      createPost(dataPost);
      router.refresh();
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full bg-white py-3 md:px-4 px-3 rounded-md mt-[20px] border border-gray-200">
          <div className="flex items-start gap-3 mb-4 w-[100%]">
            <div className="cursor-pointer w-[55px]">
              <img
                src={authMe?.profile_pic}
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
                  {...register("upload")}
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
              {isLoading ? (
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
      {messageError && (
        <NotifyMe
          status={status}
          message={messageError}
          handleClick={handleClick}
          isOpen={isOpen}
        />
      )}
    </>
  );
};

export default Share;
