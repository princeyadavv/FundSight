import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Track progress %
  const navigate = useNavigate();

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to simulate progress animation
  const startProgress = () => {
    setProgress(1); // Start from 5% to indicate request started
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < 90) {
          return oldProgress + 5; // Gradually increase up to 80%
        }
        return oldProgress;
      });
    }, 120);
    return interval;
  };

  const handleSignup = async (data) => {
    setMessage("");
    setLoading(true);
    setProgress(0);
    const progressInterval = startProgress(); // Start progress animation

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Account created successfully!");
        setTimeout(() => {
          navigate("/login");
          setLoading(false);
          setProgress(0);
        }, 500);
      } else {
        setMessage(result?.message || "Sign-up failed");
        setLoading(false);
        setProgress(0); // Reset progress on error
      }
    } catch (error) {
      setMessage("Error: " + error.message);
      setLoading(false);
      setProgress(0);
    } finally {
      clearInterval(progressInterval); // Stop progress incrementing
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      {/* Progress Bar */}
      {loading && (
        <div
          className="fixed top-0 left-0 h-1 bg-[#4e52b4] z-50 transition-all ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      )}

      <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full">
        {/* Left Side: Welcome Section */}
        <div className="bg-[#6368e8] text-white p-6 flex flex-col justify-center items-center text-center w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Join Our Community!
          </h2>
          <p className="text-sm opacity-80 mb-4">
            Already have an account? Login now.
          </p>
          <Link
            to="/login"
            className="border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#4e52b4] transition"
          >
            Login
          </Link>
        </div>

        {/* Right Side: Sign-up Form */}
        <div className="p-6 md:p-8 w-full md:w-1/2">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800">Create Account</h3>
          </div>

          {message && (
            <div className="text-center text-red-600 font-medium text-sm mb-4">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("firstname", {
                    required: "First Name is required",
                  })}
                  className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#6368e8] outline-none ${
                    errors.firstname ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="First Name"
                />
                {errors.firstname && (
                  <span className="text-red-500 text-sm">
                    {errors.firstname.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  {...register("lastname")}
                  className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#6368e8] outline-none border-gray-300"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#6368e8] outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#6368e8] outline-none ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-2.5 text-gray-600"
                >
                  {showPassword ? (
                    <HiEye className="h-5 w-5" />
                  ) : (
                    <HiEyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button type="submit" className="button w-full">
              Sign Up
            </button>
          </form>

          <p className="text-gray-600 text-center mt-4">
            By signing up, you agree to our{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Terms & Conditions
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
