import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/auth";
import { db } from "@/firebase/db";
import getDormers from "@/utils/useGetDormers";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Rooms from "@/modals/Rooms";

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Room No.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(groupedDormers)
            .sort((a, b) => a - b)
            .map((roomNumber) => (
              <TableRow key={roomNumber}>
                <TableCell>Room {roomNumber}</TableCell>
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
    </section>
  );
};

export default ManageRooms;
