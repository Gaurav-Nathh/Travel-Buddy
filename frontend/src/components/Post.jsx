import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchAuthUser } from "../queries/authQueries";
import { axiosInstance } from "../lib/axios";
import {
  Loader,
  MessageCircle,
  Send,
  ThumbsUp,
  Trash2,
  Handshake,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import PostAction from "./PostAction";
import toast from "react-hot-toast";

const Post = ({ post }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { postId } = useParams();
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
  });

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const isOwner = authUser._id === post.author._id;
  const isLiked = post.likes.includes(authUser._id);
  const alreadyConnected = authUser?.connections?.includes(post.author._id);

  const { data: connectionStatus } = useQuery({
    queryKey: ["connectionStatus", post.author._id],
    queryFn: () => axiosInstance.get(`/connections/status/${post.author._id}`),
  });

  const { mutate: sendConnectionRequest } = useMutation({
    mutationFn: (userId) =>
      axiosInstance.post(`/connections/request/${userId}`),
    onSuccess: () => {
      toast.success("Connection request sent successfully");
      queryClient.invalidateQueries({
        queryKey: ["connectionStatus", post.author._id],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/post/delete/${post._id}`);
    },
    onSuccess: () => {
      queryClient.fetchQuery({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: createComment, isAddingComment } = useMutation({
    mutationFn: async (newComment) => {
      await axiosInstance.post(`/post/${post._id}/comment`, {
        content: newComment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Comment added successfully");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Failed to add comment");
    },
  });

  const { mutate: likePost, isPending: isLikingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`/post/${post._id}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
      // queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });

  const handleConnect = () => {
    if (connectionStatus?.data?.status === "not_connected") {
      sendConnectionRequest(post.author._id);
    }
  };

  const handleDeletePost = () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    deletePost();
  };

  const handleLikePost = async () => {
    if (isLikingPost) return;
    likePost();
  };

  const goToProfile = () => {
    if (post.author.username === "Buddy") {
      toast.error("You are not authorized to access this profile");
    } else {
      navigate(`/profile/${post.author.username}`);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      createComment(newComment);
      setNewComment("");
      setComments([
        ...comments,
        {
          content: newComment,
          user: {
            _id: authUser._id,
            name: authUser.name,
            profilePicture: authUser.profilePicture,
          },
          createdAt: new Date(),
        },
      ]);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md mb-6 overflow-hidden border border-gray-200 transition hover:shadow-lg">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              onClick={goToProfile}
              src={post.author.profilePicture}
              alt="/avatar.png"
              className="w-12 h-12 rounded-full mr-4 shadow-sm object-cover"
            />
            <div>
              <h3
                className="text-lg font-semibold text-gray-900"
                onClick={goToProfile}
              >
                {post.author.username} ({post.author.name})
              </h3>
              <p className="text-sm text-gray-500">{post.author.headline}</p>
              <p className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          {isOwner && (
            <button
              onClick={handleDeletePost}
              className="text-gray-400 hover:text-red-500 transition"
            >
              {isDeletingPost ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}
            </button>
          )}
        </div>

        {/* Post Content */}
        <p className="mb-6 text-xl text-gray-800 leading-relaxed">
          {post.content.mainContent}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600 mb-6">
          <div>
            <p className="text-lg text-gray-400">From</p>
            <p className="text-xl font-semibold text-gray-800">
              {post.content.from || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-400">To</p>
            <p className="text-xl font-semibold text-gray-800">
              {post.content.to || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-400">Buddies</p>
            <p className="text-xl font-medium text-gray-800">
              {post.content.buddycount || 0}
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-400">Date</p>
            <p className="text-xl font-medium text-gray-800">
              {post.content.date
                ? format(new Date(post.content.date), "dd MMM yyyy")
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Image */}
        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="rounded-xl w-full mb-4 border border-gray-200"
          />
        )}

        {/* Actions */}
        <div className="flex justify-around text-gray-600 border-t pt-4">
          <PostAction
            icon={
              <ThumbsUp
                size={20}
                className={isLiked ? "text-blue-500 fill-blue-500" : ""}
              />
            }
            text={`Like (${post.likes.length})`}
            onClick={handleLikePost}
          />
          <PostAction
            icon={<MessageCircle size={20} />}
            text={`Comment (${comments.length})`}
            onClick={() => setShowComments(!showComments)}
          />
          {!isOwner && !alreadyConnected && (
            <PostAction
              icon={<Handshake size={20} />}
              text="Connect"
              onClick={handleConnect}
            />
          )}
        </div>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="px-6 pb-6">
          <div className="mb-4 max-h-60 overflow-y-auto space-y-2">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-gray-100 rounded-lg p-3 flex items-start"
              >
                <img
                  src={comment.user.profilePicture || "/avatar.png"}
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center mb-1 text-sm">
                    <span className="font-semibold mr-2">
                      {comment.user.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(comment.createdAt))}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <form onSubmit={handleAddComment} className="flex items-center">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-3 rounded-full bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="ml-2 text-blue-500"
              disabled={isAddingComment}
            >
              {isAddingComment ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
