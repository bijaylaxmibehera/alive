import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import GoogleAuthButton from "../components/GoogleAuthButton";
import Loading from "../components/Loading";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [userCredential, setUserCredential] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const loginFormHandler = async (e) => {
    e.preventDefault();
    await dispatch(login(userCredential));
    setUserCredential({
      email: "",
      password: "",
    });
    navigate("/");
  };

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-pink-400 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex overflow-hidden">
            {/* Left Image Section */}
            <div className="w-1/2 bg-indigo-100 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/bijaylaxmibehera/image/upload/v1735435552/undraw_welcome-cats_tw36_yz5ayd.png"
                alt="Placeholder"
                className="w-full h-full object-fill"
              />
            </div>

            {/* Right Form Section */}
            <div className="w-1/2 p-6">
              {/* Role Selection */}
              <div className="flex flex-col items-center mb-6">
                <h3 className="text-indigo-800 font-medium mb-2">
                  Select Role for social login
                </h3>
                <div className="flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      onChange={(e) => setRole(e.target.value)}
                      className="mr-2"
                    />
                    User
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      onChange={(e) => setRole(e.target.value)}
                      className="mr-2"
                    />
                    Admin
                  </label>
                </div>
              </div>

              {/* Google Login Button */}
              {role && (
                <div className="flex flex-col items-center mb-6">
                  <GoogleAuthButton role={role}  organization={`${role==="admin" ? "techCorp":""}`}/>
                </div>
              )}
              <div className="text-center">
                <p className="text-tekhelet">Or</p>
              </div>
              {/* Login Form */}
              <form className="px-4" onSubmit={loginFormHandler}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-indigo-800 font-medium mb-2"
                  >
                    Email<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-mauve"
                    placeholder="example@email.com"
                    value={userCredential.email}
                    onChange={(e) => {
                      setUserCredential((userInput) => ({
                        ...userInput,
                        email: e.target.value,
                      }));
                    }}
                  />
                </div>

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
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-mauve"
                    placeholder="password"
                    value={userCredential.password}
                    onChange={(e) => {
                      setUserCredential((userInput) => ({
                        ...userInput,
                        password: e.target.value,
                      }));
                    }}
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

                <button
                  type="submit"
                  className="w-full bg-indigo-500 text-white font-medium py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Login
                </button>
              </form>

              <div className="flex w-full justify-center my-3">
                <Link
                  to="/select-role"
                  className="flex items-center text-tekhelet"
                >
                  Create a new account
                  <span>
                    <i className="fa-solid fa-greater-than ml-3"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
