import React from "react";
import { PushSpinner } from "react-spinners-kit";

const Loader1 = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <PushSpinner size={50} color="#000000" />
    </div>
  );
};

export default Loader;
