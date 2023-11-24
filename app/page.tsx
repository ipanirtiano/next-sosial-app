/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useState, SyntheticEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  // init use router
  const router = useRouter();
  // state form login
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // mutation login
  const { mutate: Login, isPending: LoginLoading } = useMutation({
    mutationFn: async (userLogin: any) => {
      const response = await axios.post("/api/auth/login", userLogin);
      return response.data;
    },
    onError: (error) => {
      const e = error as AxiosError;
      setMessage(e.message);
    },
    onSuccess: () => {
      // redirect
      router.push("/home");
    },
  });

  // function handle submit
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // validate form
    if (email === "" || password === "") return;
    // run mutations
    const user = {
      email,
      password,
    };
    Login(user);
  };

  return (
    <div className="w-full bg-gray-100 h-screen flex items-center justify-center text-gray-900">
      <div className="md:w-[400px] w-full px-6 bg-white h-screen flex justify-center flex-col">
        <h4 className="text-2xl font-semibold mb-4">Sign In</h4>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Username</label>
              <input
                type="email"
                className="bg-gray-100 w-full placeholder:text-sm px-4 py-[10px] outline-none"
                placeholder="Username / Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                className="bg-gray-100 w-full placeholder:text-sm px-4 py-[10px] outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {message && (
              <div className="text-sm text-red-600 flex gap-2">
                <div>*</div>
                <div>{message}</div>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center bg-blue-500 py-[10px] text-white text-center"
            >
              {LoginLoading ? (
                <div className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Loading...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between py-3">
          <div className="text-sm hover:underline text-blue-600">
            <a href="">Forgot Password?</a>
          </div>
          <div className="text-sm hover:underline text-blue-600">
            <Link href="/signup">Sign Up</Link>
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
    </div>
  );
}
