/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React from "react";
import { useState, SyntheticEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import NotifyMe from "../components/NotifyMe";

const Page = () => {
  // init use router
  const router = useRouter();
  // state from
  const [full_name, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm_password, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState(false);

  // state modal box
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // use mutation post a new user to API
  const { mutate: PostUser, isPending: PostUserLoading } = useMutation({
    mutationFn: async (newUser: any) => {
      const user = await axios.post("/api/register", newUser);
      return user;
    },
    onError: (error) => {
      console.log(error);
      setStatus(false);
      setIsOpen(true);
      setMessage("Opps something went wrong!");
    },
    onSuccess: () => {
      // redirect to user page
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setMessage("User created successfully... Please login.");
      setIsOpen(true);
      setStatus(true);
    },
  });

  // function handle submit
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // validate form
    if (
      full_name === "" ||
      email === "null" ||
      password === "" ||
      confirm_password === ""
    )
      return;

    // run mutations
    const data = {
      full_name,
      email,
      password,
      confirm_password,
    };

    PostUser(data);
  };

  // handle click callback
  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full bg-gray-100 h-screen flex items-center justify-center text-gray-900">
      <div className="md:w-[400px] w-full px-6 bg-white h-screen flex justify-center flex-col">
        <h4 className="text-2xl font-semibold mb-4">Sign Up</h4>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                className="bg-gray-100 w-full placeholder:text-sm px-4 py-2 border border-gray-200 outline-none"
                placeholder="Full Name"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                className="bg-gray-100 w-full placeholder:text-sm px-4 py-2 border border-gray-200 outline-none"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                className="bg-gray-100 w-full placeholder:text-sm px-4 py-2 border border-gray-200 outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                className="bg-gray-100 w-full placeholder:text-sm px-4 py-2 border border-gray-200 outline-none"
                placeholder="Confirm Password"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 py-2 text-white flex items-center justify-center"
            >
              {PostUserLoading ? (
                <div className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Loading...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
            <Link
              href="/"
              className="w-full bg-red-500 py-2 text-white block text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
        <div className="flex items-center justify-between py-3">
          <div className="text-sm hover:underline text-blue-600">
            <Link href="/">Have an account?</Link>
          </div>
          <div className="text-sm hover:underline text-blue-600">
            <Link href="/sign-up">Reset Password?</Link>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <img
          src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className="h-screen"
        />
      </div>

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

export default Page;
