import React, { useState } from "react";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // logout
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("bankai");
      navigate("/");
      setLoading(false);
    }, 900);
  };

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/workflow/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }), // Wrap title in an object
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error("Unable to send title");
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error uploading title:", error);
      logout();
      alert("Title upload failed");
    }
  };

  return (
    <div className="relative w-full h-screen py-5">
      <section className="container">
        <header></header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Pokémon"
             
          />
        </div>
        <ul className="cards">
          
        </ul>
      </section>

      <button
        onClick={() => {
          console.log("lalal");
          const elements = document.getElementsByClassName("services-modal");
          Array.from(elements).forEach((element) => {
            element.classList.add("active-modal");
          });
        }}
        className="fixed bottom-4 text-5xl w-15 h-15 center right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg focus:outline-none"
      >
        +
      </button>

      <div className="services-modal ">
        <div className="services-modal-content">
          <div>
            <form
              //   id="uploadForm"
              className=" flex flex-col items-center bg-white p-6 rounded-lg shadow-md mt-6"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Title"
                className="mb-4 p-2 border border-gray-300 rounded w-full"
              />
              {/* <input
                type="file"
                onChange={handleFileChange}
                className="mb-4 p-2 border border-gray-300 rounded"
              /> */}

              <button
                onClick={() => {
                  console.log("lalal");
                  const elements =
                    document.getElementsByClassName("services-modal");
                  Array.from(elements).forEach((element) => {
                    element.classList.remove("active-modal");
                  });
                }}
                type="submit"
                className="bg-[#4e52b4] text-white p-2 rounded shadow"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
