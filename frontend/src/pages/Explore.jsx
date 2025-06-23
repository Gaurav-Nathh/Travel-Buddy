// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import Post from "../components/Post";
// import { Users } from "lucide-react";
// import { axiosInstance } from "../lib/axios";
// import { fetchAuthUser } from "../queries/authQueries";

// const Explore = () => {
//   const { data: authUser, isLoading } = useQuery({
//     queryKey: ["authUser"],
//     queryFn: fetchAuthUser,
//   });

//   const { data: feedPosts } = useQuery({
//     queryKey: ["feedPosts"],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/post/");
//       return res.data;
//     },
//   });
//   return (
//     <div className="lg:max-w-[70%] mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//       {feedPosts?.map((post) => {
//         let username = "Buddy";
//         let fullname = "Buddy";
//         let profilePicture = "/avatar.png";

//         if (post.author && authUser?._id === post.author._id) {
//           fullname = post.author.name;
//           username = post.author.username;
//           profilePicture = post.author.profilePicture || "/avatar.png";
//         } else if (
//           post.author &&
//           authUser?.connections?.includes(post.author._id)
//         ) {
//           fullname = post.author.name;
//           username = post.author.username;
//           profilePicture = post.author.profilePicture || "/avatar.png";
//         }

//         const displayPost = {
//           ...post,
//           author: {
//             ...(post.author || {}),
//             username,
//             name: fullname,
//             profilePicture,
//           },
//         };

//         return <Post key={post._id} post={displayPost} />;
//       })}
//       {feedPosts?.length === 0 && (
//         <div className="bg-white rounded-lg shadow p-8 text-center">
//           <div className="mb-6">
//             <Users size={64} className="mx-auto text-blue-500" />
//           </div>
//           <h2 className="text-2xl font-bold mb-4 text-gray-800">
//             No Posts Yet
//           </h2>
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Post from "../components/Post";
import { Users } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { fetchAuthUser } from "../queries/authQueries";

const Explore = () => {
  const [filterDate, setFilterDate] = useState("");
  const [filterBuddies, setFilterBuddies] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
  });

  const { data: feedPosts = [] } = useQuery({
    queryKey: ["feedPosts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/post/");
      return res.data;
    },
  });

  // Filtering logic
  const filteredPosts = feedPosts.filter((post) => {
    const postDate = post?.content?.date || "";
    const numBuddies = String(post?.content?.buddycount || "");
    const from = post?.content?.from?.toLowerCase() || "";
    const to = post?.content?.to?.toLowerCase() || "";
    const locationInput = filterLocation.toLowerCase();

    const matchesDate = filterDate ? postDate.startsWith(filterDate) : true;
    const matchesBuddies = filterBuddies ? numBuddies === filterBuddies : true;
    const matchesLocation = filterLocation
      ? from.includes(locationInput) || to.includes(locationInput)
      : true;

    return matchesDate && matchesBuddies && matchesLocation;
  });

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Filter Trips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400"
            placeholder="Filter by date"
          />
          <input
            type="number"
            value={filterBuddies}
            onChange={(e) => setFilterBuddies(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400"
            placeholder="No. of Buddies"
          />
          <input
            type="text"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400"
            placeholder="From / To Location"
          />
          <button
            onClick={() => {
              setFilterDate("");
              setFilterBuddies("");
              setFilterLocation("");
            }}
            className="bg-red-100 text-red-600 hover:bg-red-200 transition font-medium rounded-md px-4 py-2"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="lg:max-w-[70%] mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => {
          let username = "Buddy";
          let fullname = "Buddy";
          let profilePicture = "/avatar.png";

          if (post.author && authUser?._id === post.author._id) {
            fullname = post.author.name;
            username = post.author.username;
            profilePicture = post.author.profilePicture || "/avatar.png";
          } else if (
            post.author &&
            authUser?.connections?.includes(post.author._id)
          ) {
            fullname = post.author.name;
            username = post.author.username;
            profilePicture = post.author.profilePicture || "/avatar.png";
          }

          const displayPost = {
            ...post,
            author: {
              ...(post.author || {}),
              username,
              name: fullname,
              profilePicture,
            },
          };

          return <Post key={post._id} post={displayPost} />;
        })}

        {filteredPosts.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center col-span-full">
            <div className="mb-6">
              <Users size={64} className="mx-auto text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              No Posts Found
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
