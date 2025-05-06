import { useState } from "react";
import { useAuthStore } from "../Store/authStore";
import { usePostStore } from "../Store/postStore";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { complex } from "framer-motion";

const PostCreation = () => {
  const { user } = useAuthStore();
  const { create, isLoading } = usePostStore();
  const [content, setContent] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [buddyCount, setBuddyCount] = useState("");
  const [date, setDate] = useState();

  const handlePostCreation = async (e) => {
    e.preventDefault();
    console.log(from, to, buddyCount, content, date);
    try {
      await create(content, date, buddyCount, from, to);
      toast.success("Post created succesfully.");
    } catch (error) {
      console.log(error);
      toast.error("Error creating the post.");
    }
  };

  return (
    <div className="w-[70rem] max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-6">
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
        <div className="text-right">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? <Loader className="animate-spin w-5 h-5" /> : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreation;
