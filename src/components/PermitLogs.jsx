import React, { useEffect, useState } from "react";
import "../css/DormerPage.css";
import getUserPermits from "@/utils/useGetUserPermits";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/auth";

const PermitLogs = () => {
  const [permits, setPermits] = useState([]);
  const [user, isLoading] = useAuthState(auth);

  useEffect(() => {
    const fetchPermits = async () => {
      try {
        const userPermits = await getUserPermits();
        setPermits(userPermits);
      } catch (error) {
        console.error("Error fetching permits:", error);
      }
    };
    if (isLoading) {
      console.log("loading wait...");
    } else {
      console.log("loading done!");

      fetchPermits();
    }
  }, [isLoading]);

  return (
    <div className="permit-logs">
      <h2>Permit Logs</h2>
      <div className="log-list">
        {permits.length > 0 ? (
          permits.map((permit, index) => (
            <div key={index} className="log-item">
              <p>
                <strong>Permit Type:</strong> {permit.permitType}
              </p>
              <p>
                <strong>Time Out:</strong> {permit.timeOut}
              </p>
              <p>
                <strong>Destination:</strong> {permit.destination}
              </p>
              <p>
                <strong>Room Number:</strong> {permit.roomNumber}
              </p>
              <p>
                <strong>Emergency Contact:</strong> {permit.emergencyContact}
              </p>
              <p>
                <strong>Return Date:</strong> {permit.returnDate}
              </p>
              <p>
                <strong>Purpose:</strong> {permit.purpose}
              </p>
            </div>
          ))
        ) : (
          <p>No permits found.</p>
        )}
      </div>
    </div>
  );
};

export default PermitLogs;
