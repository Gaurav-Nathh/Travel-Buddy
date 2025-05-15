import { useState } from "react";

const AboutSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(userData.about || "");

  const handleSave = () => {
    setIsEditing(false);
    onSave({ about });
  };
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mb-6 transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        About
      </h2>

      {isOwnProfile && (
        <>
          {isEditing ? (
            <>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-800 text-lg transition"
                rows="5"
                placeholder="Write something about yourself..."
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700 text-lg whitespace-pre-line">
                {userData.about || "No information provided yet."}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium transition"
              >
                Edit
              </button>
            </>
          )}
        </>
      )}

      {!isOwnProfile && (
        <p className="text-gray-700 text-lg whitespace-pre-line">
          {userData.about || "No information available."}
        </p>
      )}
    </div>
  );
};
export default AboutSection;
