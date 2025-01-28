import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      {/* Newsletter Section */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white">
          Subscribe to our newsletter
        </h3>
        <div className="mt-4 flex justify-center items-center">
          <input
            type="email"
            placeholder="Input your email"
            className="px-4 py-2 rounded-l-lg border-none focus:outline-none text-gray-700"
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
            Subscribe
          </button>
        </div>
      </div>

      {/* Links Section */}
      <div className="text-center mt-6">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-white">
            Pricing
          </a>
          <a href="#" className="hover:text-white">
            About us
          </a>
          <a href="#" className="hover:text-white">
            Features
          </a>
          <a href="#" className="hover:text-white">
            Help Center
          </a>
          <a href="#" className="hover:text-white">
            Contact us
          </a>
          <a href="#" className="hover:text-white">
            FAQs
          </a>
          <a href="#" className="hover:text-white">
            Careers
          </a>
        </div>
      </div>

      <hr className="border-gray-700 my-6" />

      {/* Footer Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 ">
        <div className="flex items-center space-x-2 pl-10">
          <img
            src="src/assets/images/logo.png"
            alt="FundSphere Logo"
            className="w-8 h-8"
          />
          <span className="text-white font-semibold">FundSphere</span>
        </div>

        <div className="flex space-x-4">
          <select className="bg-gray-800 text-gray-400 px-4 py-2 rounded-lg focus:outline-none">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        <p className="text-gray-500">
          © 2024 Brand, Inc. •{" "}
          <a href="#" className="hover:text-white">
            Privacy
          </a>{" "}
          •{" "}
          <a href="#" className="hover:text-white">
            Terms
          </a>{" "}
          •{" "}
          <a href="#" className="hover:text-white">
            Sitemap
          </a>
        </p>

        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
