import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const UserCard = ({ user, isConnection }) => {
  const queryClient = useQueryClient();

  const { mutate: removeConnectionMutation } = useMutation({
    mutationFn: (userId) => axiosInstance.delete(`/connections/${userId}`),

    onSuccess: () => {
      toast.success("Connection removed successfully");
      queryClient.refetchQueries({
        queryKey: ["connections"],
        exact: true,
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const handleRemoveConnection = () => {
    removeConnectionMutation(user._id);
  };

  return (
    <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center transition-all hover:shadow-md">
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
      <div className="flex w-full gap-8">
        {/* <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors w-full">
          {isConnection ? "Connected" : "Connect"}
        </button> */}
        <button
          onClick={handleRemoveConnection}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors w-full"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default UserCard;
