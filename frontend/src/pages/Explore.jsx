import React from "react";
import { useQuery } from "@tanstack/react-query";
import Post from "../components/Post";
import { Users } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { fetchAuthUser } from "../queries/authQueries";

const Explore = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
  });

  const { data: feedPosts } = useQuery({
    queryKey: ["feedPosts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/post/");
      return res.data;
    },
  });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {feedPosts?.map((post) => {
        let displayName = "Buddy";
        let profilePicture = "/avatar.png";

        if (authUser?._id === post.author._id) {
          displayName = post.author.name;
          profilePicture = post.author.profilePicture || "/avatar.png";
        } else if (authUser?.connections?.includes(post.author._id)) {
          displayName = post.author.username;
          profilePicture = post.author.profilePicture || "/avatar.png";
        }
        const displayPost = {
          ...post,
          author: {
            ...post.author,
            username: displayName,
            name: displayName,
            profilePicture: profilePicture,
          },
        };
        return <Post key={post._id} post={displayPost} />;
      })}
      {feedPosts?.length === 0 && (
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
  );
};

export default Explore;
