import React from "react";
import { ClassicSpinner } from "react-spinners-kit";

const Loader1 = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <ClassicSpinner size={50} color="#ff8d4e" />
    </div>
  );
};

export default Loader1;
