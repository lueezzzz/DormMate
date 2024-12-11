import { DormerSideBar } from "@/components/DormerSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/firebase/auth";
import getNotifications from "@/utils/useGetNotifications";
import deleteNotifs from "@/utils/useDeleteUserNotifs";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader2 from "@/loaders/Loader2";
import EmptyLog from "../assets/images/EmptyLog.png";

const NotificationPage = () => {
  const [notifs, setNotifs] = useState([]);
  const [user, isLoading] = useAuthState(auth);
  const [isFetching, setIsFetching] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      const fetchNotifs = async () => {
        setIsFetching(true);

        const timeoutId = setTimeout(() => {
          console.log("Timeout reached");
          setIsFetching(false);
        }, 1500);
        try {
          await new Promise((resolve) => {
            getNotifications((updateNotifs) => {
              setNotifs(updateNotifs);
              resolve();
            });
          });
        } catch (error) {
          console.log("Error fetching notifications:", error);
        } finally {
          clearTimeout(timeoutId);
          setIsFetching(false);
        }
      };

      fetchNotifs();
    }
  }, [isLoading, user]);

const handleClearNotifications = async () => {
  try {
    setIsRemoving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    await deleteNotifs();
    setNotifs([]); 
    console.log("All notifications cleared");
  } catch (error) {
    console.error("Error clearing notifications:", error);
  } finally {
    setIsRemoving(false);
  }
};
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
          {isFetching ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 />
            </div>
          ) : notifs.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <img
                src={EmptyLog}
                alt="No permits available"
                className="mt-[65px]"
              />
              <p>No Notifications yet.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {notifs.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                  >
                    <h2 className="text-lg font-bold text-gray-800">
                      Permit was {notif.permitStatus}
                    </h2>
                    <p className="text-gray-600">
                      Filed at: {new Date(notif.dateFiled).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Type: {notif.permitType || "Unknown"} | Purpose:{" "}
                      {notif.purpose || "None"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Destination: {notif.destination || "Not specified"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Return Date: {notif.returnDate || "Not specified"}
                    </p>
                  </div>
                ))}
              </div>
              {notifs.length > 0 && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleClearNotifications}
                    className="px-4 py-2 bg-[#ff8d4e]  hover:bg-[#d3723e] text-white font-semibold rounded-lg shadow-md transition disabled:bg-gray-300"
                    disabled={isRemoving}
                  >
                    {isRemoving ? (
                      <div className="flex justify-center items-center">
                        <Loader2 />
                      </div>
                    ) : (
                      "Clear Notifications"
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </SidebarProvider>
    </section>
  );
};

export default NotificationPage;
