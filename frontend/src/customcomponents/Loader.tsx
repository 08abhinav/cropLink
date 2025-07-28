import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 z-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
