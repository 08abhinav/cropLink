import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import React, { type JSX } from "react";

const ProtectRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, authChecked } = useAuth();

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-gray-500">Checking authentication...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectRoute;
