import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import GoogleAuthButton from "../components/GoogleAuthButton";

export const RegisterUser = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const registerFormHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg flex w-[70%] max-w-5xl overflow-hidden">
        {/* Left Side: Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
            Register
          </h2>

          {/* Google Login Button */}
          <div className="flex flex-col items-center mb-6">
            <GoogleAuthButton role="user" />
            <p className="text-gray-600 mt-2">Or</p>
          </div>

          <form onSubmit={registerFormHandler}>
            {/* Full Name */}
            <div className="mb-4">
              <label
                htmlFor="fullname"
                className="text-tekhelet font-bold mb-2 flex items-center"
              >
                Full Name<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-mauve"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-tekhelet font-bold mb-2 flex items-center"
              >
                Email<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-mauve"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-indigo-800 font-medium mb-2"
              >
                Password<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-mauve"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 top-8 px-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm mb-4">{error.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-500 text-white font-medium py-2 rounded-md hover:bg-indigo-700 transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <h3 className="text-tekhelet text-center mt-4">
            Already have an account?
            <Link to="/login" className="font-medium underline text-lg ml-3">
              Login
            </Link>
          </h3>
        </div>

        {/* Right Side: Image */}
        <div className="w-1/2">
          <img
            src="https://res.cloudinary.com/bijaylaxmibehera/image/upload/v1735443933/undraw_festivities_q090_j6shp8.png"
            alt="Sign Up"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
