import { format } from "date-fns";

const PostCard = ({ post }) => {
  const { author, content } = post;
  const { username, profilePicture, headline } = author;
  const { from, to, buddycount, date, mainContent } = content;

  return (
    <div className="w-[40rem] bg-white rounded-2xl shadow-lg p-5 w-full">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={profilePicture || "/avatar.png"}
          alt={username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-lg">{username}</p>
          <p className="text-sm text-gray-500">{headline}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <p className="text-gray-400">From</p>
          <p className="font-semibold">{from || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-400">To</p>
          <p className="font-semibold">{to || "N/A"}</p>
        </div>
        <div>
          <p className="text-gray-400">Buddies</p>
          <p className="font-semibold">{buddycount || 0}</p>
        </div>
        <div>
          <p className="text-gray-400">Date</p>
          <p className="font-semibold">
            {date ? format(new Date(date), "dd MMM yyyy") : "N/A"}
          </p>
        </div>
      </div>

      {mainContent && (
        <p className="mt-4 text-gray-600 text-sm">{mainContent}</p>
      )}
    </div>
  );
};

export default PostCard;
