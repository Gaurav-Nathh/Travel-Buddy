import { useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

export const PostCreation = ({ user }) => {
  const [content, setContent] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [buddyCount, setBuddyCount] = useState("");
  const [date, setDate] = useState();

  const queryClient = useQueryClient();

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: async ({ mainContent, date, buddycount, from, to }) => {
      const postData = {
        content: {
          mainContent,
          date,
          buddycount,
          from,
          to,
        },
      };
      const res = await axiosInstance.post("/post/create", postData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: () => {
      resetForm();
      toast.success("Post Created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Failed to create post");
    },
  });

  const handlePostCreation = async (e) => {
    e.preventDefault();
    createPostMutation({
      mainContent: content,
      date,
      buddycount: buddyCount,
      from,
      to,
    });
  };

  const resetForm = () => {
    setContent("");
    setFrom("");
    setTo("");
    setBuddyCount(0);
    setDate("");
  };
  return (
    <div className="w-[100%] mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <form onSubmit={handlePostCreation} className="space-y-6">
        {/* User Info */}
        <div className="flex items-center space-x-4">
          <img
            src={user.profilePicture || "/avatar.png"}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <p className=" text-2xl font-semibold text-gray-800">
            {user.username}
          </p>
        </div>

        {/* From Input */}
        <div>
          <label className="block text-xl font-medium text-gray-700">
            From
          </label>
          <input
            type="text"
            value={from}
            required
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 block w-full text-gray-800 rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-4 bg-gray-100"
            placeholder="Start location"
          />
        </div>

        {/* To Input */}
        <div>
          <label className="block text-xl font-medium text-gray-700">To</label>
          <input
            type="text"
            value={to}
            required
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 block w-full text-gray-800 rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-4 bg-gray-100"
            placeholder="Destination"
          />
        </div>

        {/* Buddy Count Input */}
        <div>
          <label className="block text-xl font-medium text-gray-700">
            Buddy Count
          </label>
          <input
            type="number"
            value={buddyCount}
            required
            onChange={(e) => setBuddyCount(e.target.value)}
            className="mt-1 block w-full text-gray-800 rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-4 bg-gray-100"
            placeholder="Number of travel buddies"
          />
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-xl font-medium text-gray-700">
            Travel Date
          </label>
          <input
            type="date"
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full text-gray-800 rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-4 bg-gray-100"
          />
        </div>

        {/* Main Content / Description */}
        <div>
          <label className="block text-xl font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="What's on your mind?"
            className="mt-1 block w-full text-gray-800 rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-4 bg-gray-100 min-h-[100px] resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isPending}
            className="text-white bg-blue-700 py-3 px-5 rounded-xl"
          >
            {isPending ? <Loader className="animate-spin w-5 h-5" /> : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};
