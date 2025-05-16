import React from "react";
import { Link } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const UserCard = ({ user, onChatClick }) => {
  const queryClient = useQueryClient();

  const { mutate: removeConnectionMutation } = useMutation({
    mutationFn: (userId) => axiosInstance.delete(`/connections/${userId}`),
    onSuccess: () => {
      toast.success("Connection removed successfully");
      queryClient.refetchQueries({ queryKey: ["connections"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const handleRemoveConnection = () => {
    removeConnectionMutation(user._id);
  };

  return (
    <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center relative transition-all hover:shadow-md">
      <Link
        to={`/profile/${user.username}`}
        className="flex flex-col items-center"
      >
        <img
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <h3 className="font-semibold text-lg text-center">{user.name}</h3>
      </Link>
      <p className="text-gray-600 text-center">{user.headline}</p>
      <div className="flex w-full gap-4 mt-4">
        <button
          onClick={() => onChatClick(user)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
        >
          Chat
        </button>
        <button
          onClick={handleRemoveConnection}
          className="bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default UserCard;
