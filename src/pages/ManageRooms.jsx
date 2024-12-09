import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { auth } from "@/firebase/auth";
import { db } from "@/firebase/db";
import getDormers from "@/utils/useGetDormers";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Rooms from "@/modals/Rooms";
import { AppSidebar } from "@/components/AppSideBar";
import Loader2 from "@/loaders/Loader2";

const ManageRooms = () => {
  const [user, isLoading] = useAuthState(auth);
  const [dormers, setDormers] = useState([]);
  const [adminDorm, setAdminDorm] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null); 
  const [groupedDormers, setGroupedDormers] = useState({}); 
  const [isFetching, setIsFetching] = useState({
    adminDorm: false,
    dormerDetails: false,
  });

  useEffect(() => {
    if (!isLoading && user) {
      let unsubscribe;

      const fetchAdminandDormers = async () => {
        setIsFetching((prev) => ({ ...prev, adminDorm: true }));
        try {
          const adminRef = doc(db, "users", user.uid);
          const adminDocSnap = await getDoc(adminRef);

          if (adminDocSnap.exists()) {
            const adminDorm = adminDocSnap.data().userDorm;
            setAdminDorm(adminDorm);
            fetchDormers(adminDorm);
          } else {
            console.error("DNE");
          }
        } catch (error) {
          console.log("Error: ", error);
        } finally {
          setIsFetching((prev) => ({ ...prev, adminDorm: false }));
        }
      };

      const fetchDormers = async (adminDorm) => {
        setIsFetching((prev) => ({ ...prev, dormerDetails: true }));
        try {
          unsubscribe = await getDormers((data) => {
            setDormers(data);
            const grouped = data.reduce((acc, dormer) => {
              const room = dormer.roomNumber;
              if (!acc[room]) acc[room] = [];
              acc[room].push(dormer);
              return acc;
            }, {});
            setGroupedDormers(grouped);
          }, adminDorm);
        } catch (error) {
          console.log("Error: ", error);
        } finally {
          setIsFetching((prev) => ({ ...prev, dormerDetails: false }));
        }
      };

      fetchAdminandDormers();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [isLoading, user]);

  return (
    <section>
      <SidebarProvider className="p-6 sm:p-4 md:p-6">
        <AppSidebar />
        <SidebarTrigger className="text-[#ff8d4e] mr-3 sm:mr-1 md:mr-3" />
        <div className="flex flex-col space-y-4 sm:space-y-6 w-full">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#ff8d4e]">
              Manage Rooms
            </h1>
          </div>
          {isFetching.adminDorm || isFetching.dormerDetails ? (
            <div className="flex justify-center items-center h-64">
                <Loader2/>
            </div>
          ) : (
            <Table className="sm:w-full md:w-3/4 lg:w-1/2 min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <TableHeader>
                <TableRow className="bg-gray-100 text-left">
                  <TableHead>Room No.</TableHead>
                  <TableHead>Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(groupedDormers)
                  .sort((a, b) => a - b)
                  .map((roomNumber) => (
                    <TableRow key={roomNumber}>
                      <TableCell className="px-4 py-2 text-sm text-gray-800">
                        Room {roomNumber}
                      </TableCell>
                      <TableCell>
                        <Rooms
                          roomNumber={roomNumber}
                          groupedDormers={groupedDormers}
                          setSelectedRoom={setSelectedRoom}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </div>
      </SidebarProvider>
    </section>
  );
};

export default ManageRooms;
