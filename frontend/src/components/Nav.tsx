import { UserButton, 
  ClerkLoading, 
  ClerkLoaded, 
  SignedIn } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import HeaderLogo from "./HeaderLogo";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 
      bg-gradient-to-r from-gray-900 via-black to-gray-900 
      backdrop-blur-lg bg-opacity-90 shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <HeaderLogo />

      <SignedIn>
          <div className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
            <Link to="/" className="hover:text-blue-400 transition">Home</Link>
            {/* <Link to="/about" className="hover:text-blue-400 transition">About</Link> */}
            <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
          </div>

          <div className="flex items-center gap-4">
            <ClerkLoaded>
              <UserButton afterSwitchSessionUrl="/" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            </ClerkLoading>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Nav;
