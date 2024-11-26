import React from "react";

const PermitLogs = ({ permits }) => {

  const sortedPermits = permits.sort((a, b) => {
    if (a.permitStatus === "Pending" && b.permitStatus !== "Pending") {
      return -1; 
    }
    if (a.permitStatus !== "Pending" && b.permitStatus === "Pending") {
      return 1; 
    }
    if (a.permitStatus === "Rejected" && b.permitStatus !== "Rejected") {
      return 1; 
    }
    if (a.permitStatus !== "Rejected" && b.permitStatus === "Rejected") {
      return -1; 
    }
    return 0; 
  });

  return (
    <div className="permit-logs">
      <h2>Permit Logs</h2>
      <div className="log-list">
        {sortedPermits.length > 0 ? (
          sortedPermits.map((permit, index) => (
            <div key={index} className="permit-card">
              <div className="permit-icon">
                <span>
                  {permit.permitType
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </span>
              </div>
              <div className="permit-info">
                <h3>{permit.permitType}</h3>
                <p>
                  Date Filed: {new Date(permit.dateFiled).toLocaleDateString()}{" "}
                  @ {new Date(permit.dateFiled).toLocaleTimeString()}
                </p>
              </div>
              <div
                className={`permit-status ${
                  permit.permitStatus ? permit.permitStatus.toLowerCase() : ""
                }`}
              >
                {permit.permitStatus || "Status Unknown"}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No permits available</p>
        )}
      </div>
    </div>
  );
};

export default PermitLogs;
