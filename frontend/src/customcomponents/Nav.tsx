import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Nav = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <nav className="w-full backdrop-blur-lg bg-gradient-to-r from-blue-100 via-white to-blue-100 font-serif shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3 group">
          <img
            src="/url.png"
            alt="CropLink"
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <Link
            to="/"
            className="text-3xl font-bold text-blue-500 group-hover:text-blue-400 transition-colors duration-200"
          >
            CropLink
          </Link>
        </div>

        <div className="space-x-6 text-blue-500 hidden md:flex font-serif font-semibold">
          <Link to="/about" className="hover:text-blue-700 transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-700 transition-colors">
            Contact
          </Link>
          {isAuthenticated && (
            <span
              onClick={handleLogout}
              className="cursor-pointer hover:text-red-700 transition-colors"
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
