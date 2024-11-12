import React, { useEffect, useState } from "react";
import "../css/DormerPage.css";
import getUserPermits from "@/utils/useGetUserPermits";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/auth";

const PermitLogs = () => {
  const [permits, setPermits] = useState([]);
  const [user, isLoading] = useAuthState(auth);

  useEffect(() => {
    if (!isLoading && user) {
      console.log("loading done!");

      const unsubscribe = getUserPermits((updatedPermits) => {
        setPermits(updatedPermits);
      });

      return () => unsubscribe();
    } else if (isLoading) {
      console.log("loading wait...");
    }
  }, [isLoading, user]);

  return (
    <div className="permit-logs">
      <h2>Permit Logs</h2>
      <div className="log-list">
        {permits.length > 0 ? (
          permits.map((permit, index) => (
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
          <p className="no-permits-message">No permits available</p>
        )}
      </div>
    </div>
  );
};

export default PermitLogs;
