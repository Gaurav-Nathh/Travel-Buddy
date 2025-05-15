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
    <div className="lg:max-w-[85%] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Post Creation Column */}
      <div className="order-1 lg:order-none">
        <PostCreation user={authUser} />
      </div>

      {/* Posts Column */}
      <div className="order-2 lg:order-none">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 
                 overflow-visible lg:overflow-y-auto lg:max-h-[calc(100vh-50px)] 
                 pr-2"
        >
          {posts?.length > 0 ? (
            posts.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <div className="bg-white rounded-xl shadow p-8 text-center col-span-full">
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
