import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3690/user/register",
        data
      );
      alert(response.data.message);
      setData({ userName: "", email: "", password: "" });
      navigate("/signin");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-teal-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 ml-2">
              RecipeMaster
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Join RecipeMaster to save and share your favorite recipes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="userName"
              className="block text-gray-700 font-medium text-sm sm:text-base mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              value={data.userName}
              onChange={(e) => setData({ ...data, userName: e.target.value })}
              placeholder="Enter your username"
              className="w-full bg-gray-100 border border-gray-300 rounded-full px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 text-sm sm:text-base transition-all duration-300"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium text-sm sm:text-base mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full bg-gray-100 border border-gray-300 rounded-full px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 text-sm sm:text-base transition-all duration-300"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium text-sm sm:text-base mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Create a password"
              className="w-full bg-gray-100 border border-gray-300 rounded-full px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-400 text-sm sm:text-base transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Sign Up
          </button>

          <div className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-teal-600 hover:text-teal-500 font-medium transition-colors duration-300"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
