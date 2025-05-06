import { Transition } from "../components/Transition";
import { motion } from "framer-motion";
import { useAuthStore } from "../Store/authStore";
import { formatDate } from "../utils/date";
import { Post } from "../components/Post";
import exploredata from "../utils/exploredata.json";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { usePostStore } from "../Store/postStore";
import PostCard from "../layout/PostCard";

export const ExplorePage = () => {
  const { getPosts, posts, isLoading } = usePostStore();
  useEffect(() => {
    getPosts();
    console.log(posts);
  }, [getPosts]);

  return (
    <>
      <section className="h-[100svh] overflow-hidden bg-cloud_planes bg-center bg-no-repeat bg-cover items-center">
        <Navbar />
        <div className="p-4 max-w-7xl mx-auto">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts &&
                posts.map((post) => <PostCard key={post._id} post={post} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
