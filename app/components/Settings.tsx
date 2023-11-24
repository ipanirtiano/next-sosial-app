/* eslint-disable @next/next/no-img-element */
"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState, SyntheticEvent } from "react";
import { BiEdit } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import NotifyMe from "./NotifyMe";

const Settings = () => {
  // init use router
  const router = useRouter();
  // init use query get auth me
  const { data: authMe }: any = useQuery({ queryKey: ["me"] });
  // state form user profile
  const [full_name, setFullName] = useState(authMe?.full_name);
  const [email, setEmail] = useState(authMe?.email);
  const [phone, setPhone] = useState(authMe?.phone);
  const [instagram, setInstagram] = useState(authMe?.instagram);
  const [facebook, setFacebook] = useState(authMe?.facebook);
  const [twitter, setTwitter] = useState(authMe?.twitter);
  const [profile, setProfile] = useState<File>();
  const [cover, setCover] = useState<File>();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  // state modal box
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // mutation update user
  const { mutate: updateUser, isPending: updateUserLoading } = useMutation({
    mutationFn: async (newUser: any) => {
      const response = await axios.patch("/api/user/update", newUser);
      return response.data;
    },
    onSuccess: () => {
      setMessage("Update Profile Successfully...");
      setIsOpen(true);
      setStatus(true);
      router.refresh();
    },
    onError: (error) => {
      setMessage("Opps.. something went wrong!");
      setStatus(false);
      setIsOpen(true);
      console.log(error);
    },
  });

  // function upload profile pic
  const uploadProfile = async () => {
    // set form data
    const formData = new FormData();
    formData.set("profile", profile);

    try {
      const response = await axios.post("/api/upload/profile", formData);
      return response.data.fileName;
    } catch (error) {
      console.log(error);
    }
  };

  // function upload cover pic
  const uploadCover = async () => {
    // set form data
    const formData = new FormData();
    formData.set("cover", cover);

    try {
      const response = await axios.post("/api/upload/cover", formData);
      return response.data.fileName;
    } catch (error) {
      console.log(error);
    }
  };

  // function handle submit
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // validate the form
    if (
      full_name === "" ||
      email === "" ||
      phone === "" ||
      instagram === "" ||
      facebook === "" ||
      twitter === ""
    )
      return;

    // validate profile
    // set file name
    let profile_pic: any = "";
    if (profile) {
      profile_pic = await uploadProfile();
    } else {
      profile_pic = authMe?.profile_pic;
    }

    // validate cover pic
    let cover_pic: any = "";
    if (cover) {
      cover_pic = await uploadCover();
    } else {
      cover_pic = authMe?.cover_poc;
    }

    const user = {
      full_name,
      email,
      phone,
      instagram,
      facebook,
      twitter,
      profile_pic,
      cover_pic,
    };

    // run mutation update user
    updateUser(user);
  };

  // handle click callback
  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full bg-white mb-3 py-3 px-6">
      <p className="font-semibold text-xl mb-4">Update Profile</p>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3">
          <div className="w-[100px] h-[100px] relative">
            {profile ? (
              <img
                className="w-full h-full object-cover"
                alt=""
                src={URL.createObjectURL(profile)}
              />
            ) : (
              <img
                src={`profile_img/${authMe?.profile_pic}`}
                className="w-full h-full object-cover"
                alt=""
              />
            )}

            <input
              type="file"
              id="fileProfile"
              className=" text-sm text-slate-500  hidden"
              onChange={(e) => setProfile(e.target.files?.[0])}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white cursor-pointer">
              <label htmlFor="fileProfile">
                <div className="flex flex-col justify-center items-center cursor-pointer">
                  <BiEdit className="text-xl" />
                  <p className="text-xs">Edit Profile</p>
                </div>
              </label>
            </div>
          </div>

          <div className="w-[100px] h-[100px] relative">
            {cover ? (
              <img
                className="w-full h-full object-cover"
                alt=""
                src={URL.createObjectURL(cover)}
              />
            ) : (
              <img
                src={`cover_img/${authMe?.cover_pic}`}
                className="w-full h-full object-cover"
                alt=""
              />
            )}
            <input
              type="file"
              id="file"
              className=" text-sm text-slate-500  hidden"
              onChange={(e) => setCover(e.target.files?.[0])}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white cursor-pointer">
              <label htmlFor="file">
                <div className="flex flex-col justify-center items-center cursor-pointer">
                  <BiEdit className="text-xl" />
                  <p className="text-xs">Edit Cover</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-between flex-wrap pt-6">
          <div className="">
            <div>
              <label className="text-xs text-gray-600">Name</label>
              <input
                type="text"
                className="border-b border-gray-300 w-full placeholder:text-sm py-2 outline-none mb-3"
                placeholder="Full Name"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-gray-600">Username</label>
              <input
                type="email"
                className="border-b border-gray-300 w-full placeholder:text-sm py-2 outline-none mb-3"
                placeholder="Username / Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-gray-600">Phone</label>
              <input
                type="text"
                className="border-b border-gray-300 w-full placeholder:text-sm py-2 outline-none mb-3"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="">
            <div>
              <label className="text-xs text-gray-600">Instagram</label>
              <input
                type="text"
                className="border-b border-gray-300 w-full placeholder:text-sm py-2 outline-none mb-3 "
                placeholder="Website"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-gray-600">Facebook</label>
              <input
                type="text"
                className="border-b border-gray-300 w-full placeholder:text-sm py-2 outline-none mb-3 "
                placeholder="Website"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-gray-600">Twitter</label>
              <input
                type="text"
                className="border-b border-gray-300 w-full placeholder:text-sm py-2 outline-none mb-3 "
                placeholder="Website"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center bg-blue-600 text-white py-3 text-center text-sm cursor-pointer"
        >
          {updateUserLoading ? (
            <div className="flex items-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              Updateting...
            </div>
          ) : (
            "Update"
          )}
        </button>
      </form>

      {message && (
        <NotifyMe
          status={status}
          message={message}
          handleClick={handleClick}
          isOpen={isOpen}
        />
      )}
    </div>
  );
};

export default Settings;
