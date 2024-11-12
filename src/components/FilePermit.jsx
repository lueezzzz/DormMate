import React, { useState } from "react";
import Roof from "../assets/images/Roof.png";
import EmptyLog from "../assets/images/EmptyLog.png";
import { Flowbite, Button } from "flowbite-react";
import FilePermitModal from "@/modals/FilePermitModal";

const FilePermit = () => {
  const [openPermit, setOpenPermit] = useState(false);
  
  return (
    <>
      <div className="user-info">
        <h2>Welcome, {}</h2>
      </div>
      <div className="dorm-info">
        <h2>Current Dorm: {}</h2>
        <h2>Dorm Manager: {}</h2>
      </div>
      <button className="file-permit-btn" onClick={() => setOpenPermit(true)}>
        File Permit
      </button>
      <FilePermitModal openModal={openPermit} setOpenModal={setOpenPermit} />
    </>
  );
};

export default FilePermit;
