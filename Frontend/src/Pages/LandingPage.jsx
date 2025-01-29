import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for previous

  const testimonials = [
    {
      name: "Emily Johnson",
      text: "FundSphere has transformed the way I manage my investments. The platform is intuitive and has significantly boosted my portfolio's performance.",
      rating: 5,
      image: "src/assets/images/phone.webp",
      bgColor: "bg-red-400",
    },
    {
      name: "John Smith",
      text: "This app is an absolute game-changer for my business operations. It’s fast, reliable, and the support team is fantastic.",
      rating: 4,
      image: "src/assets/images/tablet.webp",
      bgColor: "bg-blue-400",
    },
    {
      name: "Sophia Brown",
      text: "I’ve tried many platforms, but none compare to this. The user experience is seamless and engaging.",
      rating: 5,
      image: "src/assets/images/laptop.webp",
      bgColor: "bg-green-400",
    },
    {
      name: "Michael Davis",
      text: "It’s a decent app overall, but there’s room for improvement. Customer service, however, is exceptional.",
      rating: 3,
      image: "src/assets/images/watch.webp",
      bgColor: "bg-purple-400",
    },
  ];

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="bg-white pt-10 text-gray-800 ">
      {/* Hero Section */}

      {/* Video Section */}
      <div className="flex justify-center">
        <div className="relative w-4/5 lg:w-2/3 ">
          <video
            className="w-full h-full object-cover rounded-2xl filter contrast-50 brightness-90"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="src/assets/videos/landingpage.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-1  bg-opacity-100 flex items-center justify-center">
            <div className=" bg-transparent   flex items-center justify-center   ">
              <div className="text-center py-12  ">
                <h1 className="text-5xl font-bold">Empower Your Investments</h1>
                <p className="mt-4 text-xl  ">
                  Unleash the full potential of your portfolio with Innovative
                  Insights
                </p>
                <div className="mt-6 space-x-4">
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
      <div className="text-center p-12 flex justify-center items-center flex-col">
        <h2 className="text-5xl font-bold">Key Features</h2>
        <div className="w-1/2 ">
          <p className="mt-4 text-lg text-gray-700 ">
            Explore the robust functionalities of FundSphere that streamline
            financial management and enhance investment strategies.
          </p>
        </div>
        <div className="flex items-center flex-col  mt-10 px-8">
          {/* Feature 1 */}
          <div className="flex justify-center items-center gap-40  ">
            <div className="text-left  w-1/2 h-1/4 ">
              <h3 className="text-5xl font-bold">Real-Time Analytics</h3>
              <p className="mt-2 text-gray-600">
                Gain instant insights with real-time analytics, enabling
                informed decision-making and strategic planning.
              </p>
              <div className="mt-4 space-x-4">
                <button className=" button">Try now</button>
                <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300">
                  Learn more
                </button>
              </div>
            </div>
            <div className="w-1/2 h-100 shadow-2xl  flex justify-center items-center rounded-2xl">
              <img
                src="src/assets/images/bar.webp"
                alt="Analytics"
                className="rounded-lg shadow-md w-80 h-1/3"
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-40 flex-row-reverse">
            <div className="text-left  w-1/2 h-1/4 ">
              <h3 className="text-5xl font-bold">Secure Transactions</h3>
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
            <div className="w-1/2 h-100 shadow-2xl  flex justify-center items-center rounded-2xl">
              <img
                src="src/assets/images/patym.webp"
                alt="Analytics"
                className="rounded-lg shadow-md w-80 h-1/3"
              />
            </div>
          </div>

          {/* Feature 2 */}
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="w-full py-12 center bg-gray-100 shadow-2xl h-fit relative overflow-hidden">
      <div className="grid grid-cols-1 gap-8 w-4/5 p-4">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="w-full rounded-2xl h-50 center flex-row gap-10 bg-gray-100 shadow-lg p-4"
          >
            <div
              className={`w-1/4 ${testimonials[currentIndex].bgColor} h-full center gap-10`}
            >
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-20 h-20 mx-auto rounded-full shadow-md"
              />
            </div>
            <div className="flex flex-col items-start">
              <div className="mt-2 text-yellow-500">
                {"★".repeat(testimonials[currentIndex].rating)}
              </div>
              <p className="mt-4 text-lg italic">{testimonials[currentIndex].text}</p>
              <p className="mt-4 font-semibold">{testimonials[currentIndex].name}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute right-10 bottom-10 flex gap-4">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
