import { NavLink } from "react-router-dom";
import { SearchBox } from "./SearchBox";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { user, admin } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-pink-100 p-4 sticky top-0 z-10">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="text-tekhelet font-bold text-2xl">
          <NavLink to="/" className="flex items-center text-2xl">
            A
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-lg">
              <i className="fa-solid fa-star"></i>
            </span>
            live!
          </NavLink>
        </div>

        {/* Search Box */}
        <SearchBox />

        {/* Navigation Links */}
        <div className="text-tekhelet flex space-x-6 font-medium text-lg">
          {user ? (
            <>
              <NavLink to="/find-events" className="relative group">
                Find Events
                <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
              <NavLink to="/my-tickets" className="relative group">
                My Tickets
                <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="relative group text-tekhelet font-medium"
              >
                Logout
                <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
              </button>
            </>
          ) : admin ? (
            <>
              <NavLink to="/create-event" className="relative group">
                Create Event
                <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
              <NavLink to="/dashboard" className="relative group">
                Dashboard
                <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="relative group text-tekhelet font-medium"
              >
                Logout
                <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
              </button>
            </>
          ) : (
            <>
              <NavLink to="/select-role" className="relative group">
                Register
                <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
              <NavLink to="/login" className="relative group">
                Login
                <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
