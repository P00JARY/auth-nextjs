"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function page() {
  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const onsignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("hello", response);

      console.log("Success", response.data);
      router.push("/profile");
    } catch (err: any) {
      setLoading(false);
      console.log("onSign", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.password.length > 0 &&
      user.email.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="my-4 mx-2  flex flex-col gap-4 justify-center items-center h-screen ">
      <h1 className="text-2xl font-bold underline">
        {loading ? "Processing" : "SignUp"}
      </h1>
      <input
        className="text-2xl p-2 rounded-md border shadow-md font-mono text-black"
        type="text"
        placeholder="username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
      />
      <input
        className="text-2xl p-2 rounded-md border  font-mono text-black"
        type="text"
        placeholder="email"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
      />
      <input
        className="text-2xl p-2 rounded-md border font-mono text-black"
        type="password"
        placeholder="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />
      <button
        className="text-2xl p-2 rounded-md border  font-mono hover:bg-white hover:text-black"
        disabled={buttonDisabled}
        onClick={onsignup}
      >
        {buttonDisabled ? "No SignUp" : "Sign Up"}
      </button>
      <Link href="/login">
        <div className="text-2xl  font-mono  hover:text-blue-500">
          already have an account !
        </div>
      </Link>
      <Toaster position="top-center" />
    </div>
  );
}
