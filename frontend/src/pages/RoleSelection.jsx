import { useNavigate } from "react-router-dom";

export const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-indigo-400
     to-pink-400 flex items-center justify-center"
    >
      <div className="w-[50%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {/* Admin Card */}
        <div
          className="bg-ghost-white py-3 shadow-md rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-2 hover:border-indigo-600"
          onClick={() => navigate("/register/admin")}
        >
          <div className="flex flex-col items-center text-center">
            <img
              src="https://res.cloudinary.com/bijaylaxmibehera/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1735753516/undraw_proud-coder_9prj_v8dzpp.svg"
              alt="Admin Role"
              className="w-40 h-40 object-contain mb-4"
            />
            <h2 className="text-tekhelet font-bold text-2xl">Admin</h2>
            <p className="text-cool-gray mt-2">
              Register as an admin to create and manage events.
            </p>
          </div>
        </div>
        {/* User Card */}
        <div
          className="bg-ghost-white py-3 shadow-md rounded-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-2 hover:border-indigo-600"
          onClick={() => navigate("/register/user")}
        >
          <div className="flex flex-col items-center text-center">
            <img
              src="https://res.cloudinary.com/bijaylaxmibehera/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1735753516/undraw_just-browsing_0rpb_ercln4.svg"
              alt="User Role"
              className="w-40 h-40 object-contain mb-4"
            />
            <h2 className="text-tekhelet font-bold text-2xl">User</h2>
            <p className="text-cool-gray mt-2">
              Register as a user to explore events and purchase tickets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
