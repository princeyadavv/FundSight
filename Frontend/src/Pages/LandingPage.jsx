import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold">Empower Your Investments</h1>
        <p className="mt-4 text-lg">
          Unleash the full potential of your portfolio with Innovative Insights
        </p>
        <div className="mt-6 space-x-4">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
            Join us now
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300">
            Request demo
          </button>
        </div>
      </div>

      {/* Video Section */}
      <div className="flex justify-center">
        <div className="relative w-4/5 lg:w-2/3">
          <img
            src="src/assets/images/logo2.webp"
            alt="Meeting"
            className="w-full rounded-lg shadow-md"
          />
          <button className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 transform transition">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 3.278a7.5 7.5 0 110 13.444A7.5 7.5 0 0110 3.278zm0 1.322a6.178 6.178 0 100 12.356A6.178 6.178 0 0010 4.6zm2.5 6.9l-4 2.5a.625.625 0 01-.938-.54V7.54a.625.625 0 01.938-.54l4 2.5a.625.625 0 010 1.08z" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="text-center py-12">
        <h2 className="text-3xl font-semibold">Key Features</h2>
        <p className="mt-4 text-gray-600">
          Explore the robust functionalities of FundSphere that streamline
          financial management and enhance investment strategies.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 px-8">
          {/* Feature 1 */}
          <div className="text-left">
            <h3 className="text-xl font-bold">Real-Time Analytics</h3>
            <p className="mt-2 text-gray-600">
              Gain instant insights with real-time analytics, enabling informed
              decision-making and strategic planning.
            </p>
            <div className="mt-4 space-x-4">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                Try now
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300">
                Learn more
              </button>
            </div>
          </div>
          <img
            src="src/assets/images/bar.webp"
            alt="Analytics"
            className="rounded-lg shadow-md"
          />

          {/* Feature 2 */}
          <div className="text-left">
            <h3 className="text-xl font-bold">Secure Transactions</h3>
            <p className="mt-2 text-gray-600">
              Ensure the highest level of security for all transactions,
              protecting sensitive data and maintaining confidentiality.
            </p>
            <div className="mt-4 space-x-4">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                Try now
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300">
                Learn more
              </button>
            </div>
          </div>
          <img
            src="src/assets/images/patym.webp"
            alt="Security"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-12 bg-gray-100">
        <div className="w-4/5 mx-auto text-center">
          <img
            src="src/assets/images/phone.webp"
            alt="Emily Johnson"
            className="w-20 h-20 mx-auto rounded-full shadow-md"
          />
          <p className="mt-4 text-lg italic">
            “FundSphere has transformed the way I manage my investments. The
            platform is intuitive and has significantly boosted my portfolio's
            performance.”
          </p>
          <p className="mt-4 font-semibold">Emily Johnson</p>
          <div className="mt-2 text-yellow-500">
            {"★".repeat(5)} {/* 5-star rating */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
