"use client";

import axios from "axios";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out");
      router.push("/login");
    } catch (e: any) {
      console.log(e.message);

      toast.error(e.message);
    }
  };

  const getUser = async () => {
    try {
      const user = await axios.get("/api/users/me");
      console.log(user.data);
      setUserData(user.data.data._id);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-3xl">Profile Page</h1>
      <h1 className="text-2xl">Welcome</h1>
      <div className="p-2 bg-orange-500 rounded-xl">
        <Link href={`profile/${userData}`}> {userData}</Link>
      </div>
      <div>
        <button
          className="p-2 bg-blue-500 rounded-md mt-4 hover:bg-slate-600"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
