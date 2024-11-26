import React, { useState } from "react";
import FilePermitModal from "@/modals/FilePermitModal";

import useLogOut from "@/utils/useLogout";

const FilePermit = ({ userDetails }) => {
  const [openPermit, setOpenPermit] = useState(false);
  const logOut = useLogOut();


  return (
    <>
      <div className="user-info">
        <h2>
          Welcome, {userDetails.firstName} {userDetails.lastName}
        </h2>
        <h2>Current Dorm: {userDetails.userDorm}</h2>
        <h2>Room Number: {userDetails.roomNumber}</h2>
        <button className="file-permit-btn" onClick={() => setOpenPermit(true)}>
          File Permit
        </button>
        <button className="file-permit-btn" onClick={logOut}>Logout</button>
      </div>

      <FilePermitModal openModal={openPermit} setOpenModal={setOpenPermit}  userDetails={userDetails}/>
    </>
  );
};

export default FilePermit;
