import React from "react";
import Roof from "../assets/images/Roof.png";
import EmptyLog from "../assets/images/EmptyLog.png";
import { Flowbite, Button } from "flowbite-react";

const FilePermit = () => {

  return (
    <>
      <div className="user-info">
        <h2>Welcome, {}</h2>
      </div>
      <div className="dorm-info">
        <h2>Current Dorm: {}</h2>
        <h2>Dorm Manager: {}</h2>
      </div>
      <button className="file-permit-btn">File Permit </button>
    </>
  );
};

export default FilePermit;
