import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-indigo-100 text-gray-800 py-8 mt-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Connect with me */}
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-xl font-semibold mb-4">Connect with me</h2>
            <div className="flex space-x-4">
              <Link to="https://github.com/bijaylaxmibehera" target="_blank">
                <i class="fa-brands fa-github text-2xl hover:text-indigo-500 transition-colors"></i>
              </Link>
              <Link to="https://twitter.com/bijaylaxmi_b" target="_blank">
                <i class="fa-brands fa-twitter  text-2xl hover:text-indigo-500 transition-colors"></i>
              </Link>
              <Link
                to="https://www.linkedin.com/in/bijaylaxmibehera/"
                target="_blank"
              >
                <i class="fa-brands fa-linkedin text-2xl hover:text-indigo-500 transition-colors"></i>
              </Link>
            </div>
          </div>

          {/* Alive! Section */}
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-xl font-semibold">Alive!</h2>
            <small>Bringing Your Events to Life, Effortlessly</small>
            <p>&copy; 2024</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="space-y- *:mr-3">
              <NavLink
                to="/register"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Login
              </NavLink>
              <NavLink
                to="/events"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Events
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;