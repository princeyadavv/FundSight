import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../context/TokenContent";
import { RxCross2 } from "react-icons/rx";
import { CiSquarePlus } from "react-icons/ci";
import ProfileCard from "./ProfileCard";

const Profile = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [titles, setTitles] = useState([]); // Store fetched data
  const [file, setFile] = useState(""); // Moved inside the component

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      alert("No file selected.");
      return;
    }

    // Validate file type (allow only CSV and JSON)
    const allowedTypes = ["application/json", "text/csv"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Invalid file type. Please upload a CSV or JSON file.");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSize) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    setFile(selectedFile);
  };

  const logout = () => {
    localStorage.removeItem("bankai");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("bankai"); // Retrieve token

    // Ensure file and title exist
    if (!file || !title) {
      alert("Please select a file and enter a title.");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("file", file); // Append file
    formData.append("title", title);

    try {
      const response = await fetch("http://localhost:5000/workflow/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header
        },
        body: formData, // Send FormData (not JSON)
      });

      if (!response.ok) {
        throw new Error("Unable to send title");
      }

      // Refresh data after upload
      fetchData();
    } catch (error) {
      console.error("Error uploading title:", error);
      alert(error);
      alert("Title upload failed");
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("bankai");

    try {
      const response = await fetch("http://localhost:5000/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Data:", data);
        setTitles(Array.isArray(data) ? data : []); // Ensure data is an array
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative w-full h-fit min-h-screen py-5">
      <section className="container">
        <header></header>

        {/* Render Title List */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {titles.length > 0 ? (
            titles.map((item, index) => (
              <ProfileCard
                key={index}
                title={item.Title}
                createId={item.createdBy}
                id={item._id}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              No Titles Found
            </p>
          )}
        </ul>
      </section>

      <button
        onClick={() => {
          const elements = document.getElementsByClassName("services-modal");
          Array.from(elements).forEach((element) =>
            element.classList.add("active-modal")
          );
        }}
        className="fixed bottom-4 text-5xl w-15 h-15 center right-4 bg-[#4e52b4] text-white rounded-full p-4 shadow-lg focus:outline-none"
      >
        <CiSquarePlus />
      </button>

      <div className="services-modal">
        <div className="services-modal-content">
          <div
            className="services-modal-close"
            onClick={() => {
              const elements =
                document.getElementsByClassName("services-modal");
              Array.from(elements).forEach((element) =>
                element.classList.remove("active-modal")
              );
            }}
          >
            <RxCross2 />
          </div>
          <form
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md mt-6"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Title"
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            {/* File Input */}
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />

            <button
              type="submit"
              onClick={() => {
                const elements =
                  document.getElementsByClassName("services-modal");
                Array.from(elements).forEach((element) =>
                  element.classList.remove("active-modal")
                );
              }}
              className="bg-[#4e52b4] text-white p-2 rounded shadow"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
