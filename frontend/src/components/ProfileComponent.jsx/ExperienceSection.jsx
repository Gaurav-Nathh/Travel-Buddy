import { Plane, X } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../../utils/dateUtils";

const ExperienceSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [experiences, setExperiences] = useState(userData.experience || []);
  const [newExperience, setNewExperience] = useState({
    title: "",
    description: "",
  });

  const handleAddExperience = () => {
    if (newExperience.title) {
      setExperiences([...experiences, newExperience]);

      setNewExperience({
        title: "",
        description: "",
      });
    }
  };

  const handleDeleteExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp._id !== id));
  };

  const handleSave = () => {
    onSave({ experience: experiences });
    setIsEditing(false);
  };

  const handleCurrentlyWorkingChange = (e) => {
    setNewExperience({
      ...newExperience,
    });
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mb-6 transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
        Travel experiences
      </h2>

      {experiences.map((exp) => (
        <div
          key={exp._id}
          className="mb-6 p-4 bg-gray-50 rounded-xl flex justify-between items-start hover:shadow-md transition"
        >
          <div className="flex items-start space-x-4">
            <Plane size={20} className="text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {exp.title}
              </h3>
              <p className="text-gray-700 mt-1">{exp.description}</p>
            </div>
          </div>
          {isEditing && (
            <button
              onClick={() => handleDeleteExperience(exp._id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <X size={20} />
            </button>
          )}
        </div>
      ))}

      {isEditing && (
        <div className="bg-gray-50 p-6 rounded-xl mt-6 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newExperience.title}
              onChange={(e) =>
                setNewExperience({ ...newExperience, title: e.target.value })
              }
              className="p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            placeholder="Description"
            value={newExperience.description}
            onChange={(e) =>
              setNewExperience({
                ...newExperience,
                description: e.target.value,
              })
            }
            className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
            rows="4"
          />

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAddExperience}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl shadow transition"
            >
              Add Experience
            </button>
          </div>
        </div>
      )}

      {isOwnProfile && (
        <div className="mt-6 flex justify-end">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-xl shadow transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800 font-medium transition"
            >
              Edit Experiences
            </button>
          )}
        </div>
      )}
    </div>
  );
};
export default ExperienceSection;
