import React from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";
import { fetchAuthUser } from "../queries/authQueries";
import Sidebar from "../components/Sidebar";
import ConnectionRequest from "../components/ConnectionRequest";
import { axiosInstance } from "../lib/axios";
import UserCard from "../components/UserCard";

const Connection = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: () => axiosInstance.get("/connections/requests"),
    refetchInterval: 2000,
  });

  const { data: connections } = useQuery({
    queryKey: ["connections"],
    queryFn: () => axiosInstance.get("/connections"),
  });
  return (
    <div className="bg-gray-100 rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">My Connections</h1>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {connectionRequests?.data?.length > 0 ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold">Connection Request</h2>
            <div className="space-y-4">
              {connectionRequests.data.map((request) => (
                <ConnectionRequest key={request._id} request={request} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <UserPlus size={48} className="mx-auto text-gray-400" />
            <h3 className="text-xl font-semibold">No Connection Requests</h3>
            <p className="text-gray-600">
              You don&apos;t have any pending connection requests at the moment.
            </p>
            <p className="text-gray-600 mt-2">
              Explore suggested connections below to expand your network!
            </p>
          </div>
        )}
        {connections?.data?.length > 0 ? (
          <div className="">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {connections.data.map((connection) => (
                <UserCard
                  key={connection._id}
                  user={connection}
                  isConnection={true}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <UserPlus size={48} className="mx-auto text-gray-400" />
            <h3 className="text-xl font-semibold">You have no Connection</h3>
            <p className="text-gray-600">You don&apos;t have any connetion</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connection;
