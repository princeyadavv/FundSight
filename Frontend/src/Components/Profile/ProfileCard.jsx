import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ id, title }) => {
  const navigate = useNavigate();

  const handleGetData = () => {
    navigate(`/profile/${id}`); // Navigate to new page with ID
  };

  return (
    <li className="p-6 bg-[#4e52b4] text-white rounded-2xl shadow-lg transition-transform transform hover:scale-105 w-64">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm opacity-80">ID: {id}</p>
      <button
        onClick={handleGetData}
        className="mt-4 bg-white text-[#4e52b4] px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
      >
        GetData
      </button>
    </li>
  );
};

export default ProfileCard;
