import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { axiosInstance } from "../lib/axios";
import { fetchAuthUser } from "../queries/authQueries";
import {
  ExternalLink,
  Eye,
  MessageSquare,
  ThumbsUp,
  Trash2,
  UserPlus,
  Bell,
} from "lucide-react";

const NotificationPage = () => {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
  });

  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => axiosInstance.get("/notifications"),
  });

  const { mutate: markAsReadMutation } = useMutation({
    mutationFn: (id) => axiosInstance.put(`/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const { mutate: deleteNotificationMutation } = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/notifications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      toast.success("Notification deleted");
    },
  });

  const renderNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <ThumbsUp className="text-blue-500" />;

      case "comment":
        return <MessageSquare className="text-green-500" />;
      case "connectionAccepted":
        return <UserPlus className="text-purple-500" />;
      default:
        return null;
    }
  };

  const renderNotificationContent = (notification) => {
    const isConnected = authUser?.connections?.includes(
      notification.relatedUser._id
    );
    const displayName = isConnected ? notification.relatedUser.name : "Buddy";

    switch (notification.type) {
      case "like":
        return (
          <span>
            <strong>{displayName}</strong> liked your post
          </span>
        );

      case "comment":
        return (
          <span>
            {isConnected ? (
              <Link
                to={`/profile/${notification.relatedUser.username}`}
                className="font-bold"
              >
                {notification.relatedUser.name}
              </Link>
            ) : (
              <span className="font-bold">Buddy</span>
            )}{" "}
            commented on your post
          </span>
        );

      case "connectionAccepted":
        return (
          <span>
            {isConnected ? (
              <Link
                to={`/profile/${notification.relatedUser.username}`}
                className="font-bold"
              >
                {notification.relatedUser.name}
              </Link>
            ) : (
              <span className="font-bold">Buddy</span>
            )}{" "}
            accepted your connection request
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 lg:max-w-[70%] mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Bell className="text-primary" size={24} />
          Notifications
        </h1>

        {isLoading ? (
          <p className="text-gray-500">Loading notifications...</p>
        ) : notifications && notifications.data.length > 0 ? (
          <ul className="space-y-4">
            {notifications.data.map((notification) => (
              <li
                key={notification._id}
                className={`rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all border ${
                  !notification.read
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-start gap-4">
                  {authUser?.connections?.includes(
                    notification.relatedUser._id
                  ) ? (
                    <Link to={`/profile/${notification.relatedUser.username}`}>
                      <img
                        src={
                          notification.relatedUser.profilePicture ||
                          "/avatar.png"
                        }
                        alt={notification.relatedUser.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                      />
                    </Link>
                  ) : (
                    <img
                      src="/avatar.png"
                      alt="Buddy"
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="p-1 text-gray-700 rounded-full">
                        {renderNotificationIcon(notification.type)}
                      </span>
                      <div>
                        <p className="text-xl text-gray-800">
                          {renderNotificationContent(notification)}
                        </p>
                        <p className="text-lg text-gray-500 mt-1">
                          {formatDistanceToNow(
                            new Date(notification.createdAt),
                            {
                              addSuffix: true,
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-1 items-center">
                  {!notification.read && (
                    <button
                      onClick={() => markAsReadMutation(notification._id)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                      title="Mark as Read"
                    >
                      <Eye size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotificationMutation(notification._id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notification at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
