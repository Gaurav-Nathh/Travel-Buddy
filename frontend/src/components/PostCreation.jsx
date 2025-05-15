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
    <div className="w-full mx-auto p-8 bg-white rounded-3xl shadow-xl border border-gray-200 transition-all duration-300">
      <form onSubmit={handlePostCreation} className="space-y-6">
        {/* User Info */}
        <div className="flex items-center space-x-4">
          <img
            src={user.profilePicture || "/avatar.png"}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-primary"
          />
          <p className="text-xl font-bold text-gray-900">{user.username}</p>
        </div>

        {/* From Input */}
        <div>
          <label className="block text-lg font-semibold text-gray-600 mb-1">
            From
          </label>
          <input
            type="text"
            value={from}
            required
            onChange={(e) => setFrom(e.target.value)}
            className="text-lg w-full rounded-xl border border-gray-300 bg-gray-50 p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Start location"
          />
        </div>

        {/* To Input */}
        <div>
          <label className="block text-lg font-semibold text-gray-600 mb-1">
            To
          </label>
          <input
            type="text"
            value={to}
            required
            onChange={(e) => setTo(e.target.value)}
            className="text-lg w-full rounded-xl border border-gray-300 bg-gray-50 p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Destination"
          />
        </div>

        {/* Buddy Count */}
        <div>
          <label className="block text-lg font-semibold text-gray-600 mb-1">
            Buddy Count
          </label>
          <input
            type="number"
            value={buddyCount}
            required
            onChange={(e) => setBuddyCount(e.target.value)}
            className="text-lg w-full rounded-xl border border-gray-300 bg-gray-50 p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Number of travel buddies"
          />
        </div>

        {/* Travel Date */}
        <div>
          <label className="block text-lg font-semibold text-gray-600 mb-1">
            Travel Date
          </label>
          <input
            type="date"
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
            className="text-lg w-full rounded-xl border border-gray-300 bg-gray-50 p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-semibold text-gray-600 mb-1">
            Description
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="What's on your mind?"
            className="text-lg w-full min-h-[120px] resize-none rounded-xl border border-gray-300 bg-gray-50 p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isPending ? <Loader className="animate-spin w-5 h-5" /> : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};
