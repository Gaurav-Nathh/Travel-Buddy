import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { Users } from "lucide-react";
import { fetchAuthUser } from "../queries/authQueries";
import { PostCreation } from "../components/PostCreation";
import Post from "../components/Post";

const MyTrip = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
  });

  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/post/myposts");
      return res.data;
    },
  });

  return (
    <div className="flex gap-6 justify-center mt-6">
      {/* <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div> */}
      <div className="w-[70rem]">
        <PostCreation user={authUser} />
        <div className="mt-6">
          {posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}

          {posts?.length === 0 && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="mb-6">
                <Users size={64} className="mx-auto text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                No Posts Yet
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTrip;
