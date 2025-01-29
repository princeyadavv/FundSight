import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-white pt-10 text-gray-800">
      {/* Hero Section */}
      {/* Video Section */}
      <div className="flex justify-center px-4 sm:px-0 min-h-[80vh]">
        <div className="relative w-full md:w-4/5 lg:w-2/3">
          <video
            className="w-full h-full object-cover rounded-2xl filter opacity-0 contrast-50 brightness-90 md:opacity-110"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="src/assets/videos/landingpage.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-1 flex items-center justify-center">
            <div className="flex items-center justify-center bg-transparent">
              <div className="text-center py-12 px-4">
                <h1 className="text-3xl md:text-5xl font-bold">
                  Empower Your Investments
                </h1>
                <p className="mt-4 text-lg md:text-xl">
                  Unleash the full potential of your portfolio with Innovative
                  Insights
                </p>
                <div className="mt-6 center space-x-4 gap-4">
                  <button className="button">Join us now</button>
                  <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300">
                    Request demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="text-center p-4 sm:p-12 flex justify-center items-center flex-col">
        <h2 className="text-3xl md:text-5xl font-bold">Key Features</h2>
        <div className="w-full md:w-3/4 lg:w-1/2">
          <p className="mt-4 text-lg text-gray-700">
            Explore the robust functionalities of FundSphere that streamline
            financial management and enhance investment strategies.
          </p>
        </div>
        <div className="flex flex-col mt-10 px-4 space-y-10">
          {/* Feature 1 */}
          <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-40">
            <div className="text-left w-full lg:w-1/2">
              <h3 className="text-3xl md:text-5xl font-bold">
                Real-Time Analytics
              </h3>
              <p className="mt-2 text-gray-600">
                Gain instant insights with real-time analytics, enabling
                informed decision-making and strategic planning.
              </p>
              <div className="mt-4 space-x-4">
                <button className="button">Try now</button>
                <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300">
                  Learn more
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center rounded-2xl w-full lg:w-auto">
              <img
                src="src/assets/images/2.png"
                alt="Analytics"
                className="rounded-lg shadow-2xl w-full lg:w-100"
              />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col lg:flex-row-reverse justify-center items-center gap-10 lg:gap-40">
            <div className="text-left w-full lg:w-1/2">
              <h3 className="text-3xl md:text-5xl font-bold">
                Secure Transactions
              </h3>
              <p className="mt-2 text-gray-600">
                Ensure the highest level of security for all transactions,
                protecting sensitive data and maintaining confidentiality.
              </p>
              <div className="mt-4 space-x-4">
                <button className="button">Try now</button>
                <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300">
                  Learn more
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center rounded-2xl w-full lg:w-auto">
              <img
                src="src/assets/images/1.png"
                alt="Analytics"
                className="rounded-lg shadow-2xl w-full lg:w-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
