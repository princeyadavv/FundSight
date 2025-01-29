import React, { useState } from "react";
import { FaInstagram, FaDiscord, FaTwitter } from "react-icons/fa";

const ContactPage = () => {
  const socialMedia = [
    { icon: <FaInstagram /> },
    { icon: <FaDiscord /> },
    { icon: <FaTwitter /> },
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
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
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl flex flex-col lg:flex-row">
        {/* Left Section - Contact Info */}
        <div className="bg-[#6368e8] text-white p-8 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none w-full lg:w-1/3 flex flex-col justify-between">
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
                className={`cursor-pointer text-2xl h-10 w-10 flex justify-center items-center text-white rounded-full transition duration-300
                     hover:bg-white hover:text-[#6368e8]
                }-500`}
              >
                {item.icon}
              </span>
            ))}
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="w-full lg:w-2/3 p-8">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Contact Us
          </h2>
          <p className="text-gray-500 text-center mt-2 mb-6">
            Any questions or remarks? Just write us a message!
          </p>

          <form onSubmit={handleSend} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#6368e8] outline-none "
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
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#6368e8] outline-none "
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
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#6368e8] outline-none "
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-gray-600">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#6368e8] outline-none  "
                rows="4"
                placeholder="Write your message..."
              />
            </div>

            <div className="text-right">
              <button className="bg-[#6368e8] text-white py-2 px-6 rounded-lg transition">
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
