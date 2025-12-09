import { 
  UserButton, 
  ClerkLoading, 
  ClerkLoaded, 
  SignedIn 
} from "@clerk/clerk-react";
import { Loader2, BarChart3, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/70 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between border-b border-white/10">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-white/10 border border-white/20 shadow-md group-hover:shadow-lg transition-all duration-300">
            <LinkIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              CropLink
            </h1>
            <p className="text-sm text-gray-400 -mt-0.5">
              Smart URL Shortener
            </p>
          </div>
        </Link>

        <SignedIn>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard">
              <Button 
                variant="ghost" 
                size="default" 
                className="text-white cursor-pointer border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all"
              >
                <BarChart3 className="w-4 h-4 mr-2 text-gray-300 group-hover:text-white transition-colors" />
                Dashboard
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ClerkLoaded>
              <div className="p-1 rounded-full bg-white/10 border border-white/20 shadow-inner">
                <UserButton 
                  afterSwitchSessionUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                      userButtonPopoverCard: "bg-black/90 border border-white/20 shadow-lg backdrop-blur-xl",
                      userButtonPopoverActions: "text-white"
                    }
                  }}
                />
              </div>
            </ClerkLoaded>
            <ClerkLoading>
              <div className="p-2 rounded-full bg-white/10 border border-white/20">
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              </div>
            </ClerkLoading>
          </div>
        </SignedIn>
      </div>

      {/* 🔥 Bottom Glass Glow Effect */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/0 via-white/20 to-white/0 blur-sm" />
    </nav>
  );
};

export default Nav;
