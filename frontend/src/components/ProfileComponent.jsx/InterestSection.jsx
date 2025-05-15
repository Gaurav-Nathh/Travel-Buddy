import { X } from "lucide-react";
import { useState } from "react";

const InterestSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [intrest, setIntrest] = useState(userData.intrest || []);
  const [newIntrest, setNewIntrest] = useState("");

  const handleAddIntrest = () => {
    if (newIntrest && !intrest.includes(newIntrest)) {
      setIntrest([...intrest, newIntrest]);
      setNewIntrest("");
    }
  };

  const handleDeleteIntrest = (intrest) => {
    setIntrest(intrest.filter((s) => s !== intrest));
  };

  const handleSave = () => {
    console.log(intrest);
    onSave({ intrest });
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
        Interest
      </h2>

      <div className="flex flex-wrap gap-3">
        {intrest.map((intrest, index) => (
          <span
            key={index}
            className="flex items-center bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm"
          >
            {intrest}
            {isEditing && (
              <button
                onClick={() => handleDeleteIntrest(intrest)}
                className="ml-2 text-red-500 hover:text-red-700 transition"
              >
                <X size={14} />
              </button>
            )}
          </span>
        ))}
      </div>

      {isEditing && (
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Add a new interest..."
            value={newIntrest}
            onChange={(e) => setNewIntrest(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddIntrest}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition"
          >
            Add Interest
          </button>
        </div>
      )}

      {isOwnProfile && (
        <div className="mt-6 flex justify-end">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800 font-medium transition"
            >
              Edit Skills
            </button>
          )}
        </div>
      )}
    </div>
  );
};
export default InterestSection;
