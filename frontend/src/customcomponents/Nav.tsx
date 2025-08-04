import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import axios from "@/lib/axios";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Nav = () => {
  const { isAuthenticated, logout, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setUserName(null);
      return;
    }
    const fetchUser = async () => {
      setLoadingUser(true);
      try {
        const res = await axios.get("/user/me");
        const name = res.data?.name || "";
        setUserName(String(name));
      } catch {
        setUserName(null);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  const initial = userName
    ? userName.trim().charAt(0).toUpperCase()
    : "U";

  return (
    <nav className="fixed top-0 left-0 z-50 w-full backdrop-blur-lg bg-gradient-to-r from-blue-100 via-white to-green-100 font-serif shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo / Title */}
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

        {/* Links + Profile */}
        <div className="flex items-center space-x-6 text-blue-500 font-semibold">
          <Link to="/about" className="hover:text-blue-700 transition-colors">
            About
          </Link>

          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="hover:text-blue-700 transition-colors"
            >
              Dashboard
            </Link>
          )}

          {/* Profile dropdown */}
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <div className="relative">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-medium">
                  {loadingUser ? "..." : initial}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-blue-500" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="w-48 z-[1000] bg-green-100 absolute"
            sideOffset={8}
          >
            {isAuthenticated ? (
              <>
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard")}
                  className="cursor-pointer"
                >
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600"
                >
                  Logout
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <div className="px-4 py-2 text-sm text-gray-600">
                  Start by clicking the Sign in button.
                </div>
                <DropdownMenuItem
                  onClick={() => navigate("/signin")}
                  className="cursor-pointer"
                >
                  Sign in
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/register")}
                  className="cursor-pointer"
                >
                  Register
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        </div>
      </div>
    </nav>
  );
};

export default Nav;
