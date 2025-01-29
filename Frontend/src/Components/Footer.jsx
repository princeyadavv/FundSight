import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-400 py-8">
      {/* Newsletter Section */}

      {/* Links Section */}
      <div className="text-center mt-6">
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 mb-4">
          <a href="#" className="hover:text-[#4e52b4]">
            Pricing
          </a>
          <a href="#" className="hover:text-[#4e52b4]">
            About us
          </a>
          <a href="#" className="hover:text-[#4e52b4]">
            Features
          </a>
          <a href="#" className="hover:text-[#4e52b4]">
            Help Center
          </a>
          <a href="#" className="hover:text-[#4e52b4]">
            Contact us
          </a>
          <a href="#" className="hover:text-[#4e52b4]">
            FAQs
          </a>
          <a href="#" className="hover:text-[#4e52b4]">
            Careers
          </a>
        </div>
      </div>

      <hr className="border-gray-700 my-6" />

      {/* Footer Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 px-10">
        <div className="flex items-center space-x-2">
          <img
            src="src/assets/images/logo.png"
            alt="FundSphere Logo"
            className="w-8 h-8"
          />
          <span className="text-white font-semibold">FundSphere</span>
        </div>

        <div className="flex space-x-4">
          <select className="bg-[#c76491] text-gray-400 px-4 py-2 rounded-lg focus:outline-none">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        <p className="text-gray-500">
          © 2024 Brand, Inc. •{" "}
          <a href="#" className="hover:text-[#4e52b4]">
            Privacy
          </a>{" "}
          •{" "}
          <a href="#" className="hover:text-[#4e52b4]">
            Terms
          </a>{" "}
          •{" "}
          <a href="#" className="hover:text-[#4e52b4]">
            Sitemap
          </a>
        </p>

        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-[#4e52b4]">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-[#4e52b4]">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-[#4e52b4]">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-[#4e52b4]">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
