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
import getNotifications from "@/utils/useGetNotifications";
import Loader1 from "@/loaders/Loader1";

//for testing lang
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import deleteNotifs from "@/utils/useDeleteUserNotifs";

const DormerHomepage = () => {
  const [user, isLoading] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState(null);
  const [permits, setPermits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!isLoading && user) {
      const fetchData = async () => {
        try {
          getUserPermits((updatedPermits) => {
            setPermits(updatedPermits);
          });

          getNotifications((updatedNotifications) => {
            setNotifications(updatedNotifications);
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

  async function handleNotifClick(e) {
    console.log("deleted!");
    console.log(notifications);
    await deleteNotifs();
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

        {notifications.length > 0 ? (
          // <DropdownMenu>
          //   <DropdownMenuTrigger>
          //     <button
          //       onClick={(e) => {
          //         console.log("bitch");
          //       }}
          //     >
          //       new notif!
          //     </button>
          //   </DropdownMenuTrigger>
          //   <DropdownMenuContent>
          //     <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          //     <DropdownMenuSeparator />
          //     {notifications.map((notif) => {
          //       return (
          //         <DropdownMenuItem key={notif.id}>
          //           Your
          //           {notif.permitType}
          //           has been
          //           {notif.permitStatus}
          //         </DropdownMenuItem>
          //       );
          //     })}
          //   </DropdownMenuContent>
          // </DropdownMenu>
          <button onClick={handleNotifClick}>new notif</button>
        ) : (
          // <button onClick={handleNotifClick}>new notif</button>
          // <Button onClick={handleNotifClick}>new notif!</Button>
          <DropdownMenu>
            <DropdownMenuTrigger>no notification</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Nothing to see here...</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </section>

      <Footer />
    </>
  );
};

export default DormerHomepage;
