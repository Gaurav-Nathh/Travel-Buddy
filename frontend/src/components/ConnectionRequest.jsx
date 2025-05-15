import React from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { fetchAuthUser } from "../queries/authQueries";

const ConnectionRequest = ({ request }) => {
  const queryClient = useQueryClient();

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
  });

  const { mutate: acceptConnectionRequest } = useMutation({
    mutationFn: (requestId) =>
      axiosInstance.put(`/connections/accept/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request accepted");
      queryClient.refetchQueries({
        queryKey: ["connectionRequests"],
        exact: true,
      });
      queryClient.refetchQueries({
        queryKey: ["connections"],
        exact: true,
      });
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  const { mutate: rejectConnectionRequest } = useMutation({
    mutationFn: (requestId) =>
      axiosInstance.put(`/connections/reject/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request rejected");
      queryClient.refetchQueries({
        queryKey: ["connectionRequests"],
        exact: true,
      });
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between transition-all hover:shadow-md">
      <div className="flex items-center gap-4">
        <Link to={`/profile/${request.sender.username}`}>
          <img
            src={request.sender.profilePicture || "/avatar.png"}
            alt={request.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </Link>

        <div>
          <Link
            to={`/profile/${request.sender.username}`}
            className="font-semibold text-lg"
          >
            {request.sender.name}
          </Link>
          <p className="text-gray-600">{request.sender.headline}</p>
        </div>
      </div>

      <div className="space-x-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
          onClick={() => acceptConnectionRequest(request._id)}
        >
          Accept
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          onClick={() => rejectConnectionRequest(request._id)}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ConnectionRequest;
