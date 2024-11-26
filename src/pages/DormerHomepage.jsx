import React, { useState, useEffect } from "react";
import "../index.css";
import FilePermit from "../components/FilePermit";
import "../css/DormerPage.css";
import PermitLogs from "@/components/PermitLogs";
import Footer from "@/components/Footer";
import { auth } from "@/firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "@/firebase/db";
import { doc, getDoc } from "firebase/firestore";
import getUserPermits from "@/utils/useGetUserPermits";
import Loader1 from "@/loaders/Loader1";

const DormerHomepage = () => {
  const [user, isLoading] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState(null);
  const [permits, setPermits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && user) {
      const fetchData = async () => {
        try {
          getUserPermits((updatedPermits) => {
            setPermits(updatedPermits);
          });

          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserDetails(userDocSnap.data());
          } else {
            console.error("User document does not exist!");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isLoading, user]);

  if (loading) {
    return <Loader1 />;
  }

  return (
    <>
      <section className="dormer-page section-center">
        <div className="file-permit">
          <FilePermit userDetails={userDetails} />
        </div>

        <div className="permit-history">
          <PermitLogs permits={permits} />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DormerHomepage;
