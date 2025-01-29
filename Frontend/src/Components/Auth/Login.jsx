import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useToken } from "../context/TokenContent"; // Adjust the path

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Track progress %

  const { saveToken } = useToken();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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

  const handleLogin = async (data) => {
    setError("");
    setLoading(true);
    setProgress(0);

    const progressInterval = startProgress(); // Start progress animation

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        saveToken(result.token);
        setProgress(100); // Complete progress immediately

        // Smooth delay before navigation
        setTimeout(() => {
          navigate("/");
          setLoading(false);
          setProgress(0);
        }, 500);
      } else {
        setError(result.message || "Login failed");
        setLoading(false);
        setProgress(0); // Reset progress on error
      }
    } catch (error) {
      setError("Error: " + error.message);
      setLoading(false);
      setProgress(0);
    } finally {
      clearInterval(progressInterval); // Stop progress incrementing
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 relative">
      {/* Progress Bar */}
      {loading && (
        <div
          className="fixed top-0 left-0 h-1 bg-[#4e52b4] z-50 transition-all ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      )}

      <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full">
        {/* Left Side: Welcome Section */}
        <div className="bg-[#6368e8] text-white p-6 md:p-8 flex flex-col justify-center items-center text-center w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-sm opacity-80 mb-4">New here? Join us today.</p>
          <Link
            to="/signup"
            className="border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-[#4e52b4] transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-6 md:p-8 flex flex-col justify-center w-full md:w-1/2">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-gray-800">Sign In</h3>
          </div>

          {error && (
            <div className="text-center text-red-600 font-medium text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-4">
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

            <div className="mb-4 relative">
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

            <button
              type="submit"
              className="w-full bg-[#6368e8] text-white py-2 rounded-lg hover:bg-[#4e52b4] transition duration-300 disabled:bg-gray-400"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-gray-600 text-center mt-4">
            Forgot your password?{" "}
            <Link to="/reset" className="text-[#6368e8] hover:underline">
              Reset Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
