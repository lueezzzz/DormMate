import { DormerSideBar } from "@/components/DormerSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/firebase/auth";
import getNotifications from "@/utils/useGetNotifications";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const NotificationPage = () => {
  const [notifs, setNotifs] = useState([]);
  const [user, isLoading] = useAuthState(auth);

  useEffect(() => {
    const fetchNotifs = async  () => {
      try {
          getNotifications((updatedNotifications) => {
            setNotifs(updatedNotifications);
          });
          console.log(notifs)
      } catch (error) {
        console.log(error);
      };
      
    }
    fetchNotifs();
  }, [isLoading, user]);

  return (
    <section className="p-6 sm:p-4 md:p-6">
      <SidebarProvider>
        <DormerSideBar />
        <SidebarTrigger className="text-[#ff8d4e] mr-3 sm:mr-1 md:mr-3" />
        <div className="flex flex-col space-y-6 w-full">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#ff8d4e]">
              Check Notifications
            </h1>
          </div>
        </div>
      </SidebarProvider>
    </section>
  );
};

export default NotificationPage;
