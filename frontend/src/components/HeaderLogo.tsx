import { Link } from "react-router-dom";
import { Link as LinkIcon } from "lucide-react";

const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="p-2 rounded-xl bg-gradient-primary shadow-button group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
        <LinkIcon className="w-6 h-6 text-primary-foreground" />
      </div>
      <div>
        <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          CropLink
        </h1>
        <p className="text-xs text-muted-foreground -mt-1 hidden md:block">
          Smart URL Shortener
        </p>
      </div>
    </Link>
  );
};

export default HeaderLogo;