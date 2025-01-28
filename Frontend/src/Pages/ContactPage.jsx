import React, { useState } from "react";
import { FaInstagramSquare, FaDiscord, FaTwitter } from "react-icons/fa";
const ContactPage = () => {
  const socialMedia = [
    { icon: <FaInstagramSquare />, color: "text-pink-500", bg: "bg-[#6368e8]" },
    { icon: <FaDiscord />, color: "text-blue-500", bg: "bg-[#6368e8] " },
    { icon: <FaTwitter />, color: "text-blue-400", bg: "bg-[#6368e8]" },
  ];
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    websiteType: "Web Design",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSend = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl flex">
        {/* Left Section - Contact Info */}
        <div className="bg-[#6368e8] text-white p-8 rounded-l-xl w-1/3 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Contact Information</h2>
            <p className="mt-2 text-sm text-purple-200">
              Fill out the form, and our team will get back to you within 24
              hours.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <p className="flex items-center">
              📞 <span className="ml-3">+0123 4567 8910</span>
            </p>
            <p className="flex items-center">
              📧 <span className="ml-3">hello@flowbase.com</span>
            </p>
            <p className="flex items-center">
              📍 <span className="ml-3">102 Street 2714 Don</span>
            </p>
          </div>

          <div className="flex space-x-4 mt-6">
            {socialMedia.map((item, index) => (
              <span
                key={index}
                className={`cursor-pointer text-2xl h-10 w-10 text-white flex justify-center items-center rounded-full transition duration-300 ${
                  item.bg
                } ${item.color} hover:bg-white hover:text-${
                  item.color.split("-")[1]
                }-500`}
              >
                {item.icon}
              </span>
            ))}
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="w-2/3 p-8">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Contact Us
          </h2>
          <p className="text-gray-500 text-center mt-2 mb-6">
            Any questions or remarks? Just write us a message!
          </p>

          <form onSubmit={handleSend} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md mt-1"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-gray-600">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md mt-1"
                  placeholder="+90 543 779 94 64"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mt-1"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-gray-600">
                What type of website do you need?
              </label>
              <div className="flex items-center space-x-4 mt-2">
                {["Web Design", "Web Development", "Logo Design", "Other"].map(
                  (type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="websiteType"
                        value={type}
                        checked={formData.websiteType === type}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="text-gray-600">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mt-1 resize-none"
                rows="4"
                placeholder="Write your message..."
              />
            </div>

            <div className="text-right">
              <button className="bg-[#6368e8] text-white py-2 px-6 rounded-lg  transition">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
