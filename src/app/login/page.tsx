"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function LoginPage() {
  const [buttonDisable, setbuttonDisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/login", user);
      toast.success("User logged in");
      router.push("/profile");
    } catch (error: any) {
      // console.log("login failed", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length && user.password.length > 0) {
      setbuttonDisable(false);
    } else {
      setbuttonDisable(true);
    }
  });
  return (
    <div className="my-4 mx-2 flex flex-col gap-4 justify-center items-center h-screen">
      <h1 className="text-2xl font-bold underline">
        {loading ? "Processing" : "Sign up"}
      </h1>
      <input
        className="text-2xl p-2 rounded-md border font-mono text-black"
        type="text"
        placeholder="email"
        value={user.email}
        onChange={(e: any) => {
          setUser({ ...user, email: e.target.value });
        }}
      />
      <input
        className="text-2xl p-2 rounded-md border font-mono text-black"
        type="password"
        placeholder="password"
        value={user.password || ""}
        onChange={(e: any) => {
          setUser({ ...user, password: e.target.value });
        }}
      />
      <button
        className={`text-2xl p-2 rounded-md border font-mono text-black ${
          buttonDisable ? "bg-red-500  " : "bg-green-500 "
        }`}
        onClick={onLogin}
        disabled={buttonDisable}
      >
        {buttonDisable ? "Can't login" : "Login"}
      </button>
      <Link className="hover:text-blue-500" href="/signup">
        sign up !
      </Link>
      <Toaster position="top-center" />
    </div>
  );
}
