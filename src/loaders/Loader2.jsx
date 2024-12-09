import React from "react";

const Loader2 = () => {
  return (
    <div
      className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-gray-200 border-t-[#ff8d4e] rounded-full"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader2;
