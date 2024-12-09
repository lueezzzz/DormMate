import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { auth } from "@/firebase/auth";
import { db } from "@/firebase/db";
import getDormers from "@/utils/useGetDormers";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const ManageRooms = () => {
  const [user, isLoading] = useAuthState(auth);
  const [dormers, setDormers] = useState([]);
  const [adminDorm, setAdminDorm] = useState("");
  const [isFetching, setIsFetching] = useState({
    adminDorm: false,
    dormerDetails: false,
  });

  useEffect(() => {
    if (!isLoading && user) {
      let unsubscribe;

      const fetchAdminandDormers = async () => {
        setIsFetching((prev) => ({ ...prev, adminDorm: true }));  
        try{
          const adminRef = doc(db, "users", user.uid);
          const adminDocSnap = await getDoc(adminRef);

          if (adminDocSnap.exists()){
              const adminDorm = adminDocSnap.data().userDorm;
              setAdminDorm(adminDorm);
              fetchDormers(adminDorm);
          } else {
            console.error("DNE");
          }
        } catch (error) {
          console.log("Error: ", error);
        } finally {
          setIsFetching((prev) => ({...prev, adminDorm: false}));
        }
      };

      const fetchDormers = async (adminDorm) => {
        setIsFetching((prev)=> ({...prev, dormerDetails: true}))
        try{
          unsubscribe = await getDormers(setDormers, adminDorm);
        } catch (error) {
          console.log("Error: ", error);
        } finally{
          setIsFetching((prev)=> ({...prev, dormerDetails: false}))
        }
      };

      fetchAdminandDormers();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      }

    }
  }, [isLoading, user]);

  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Room No. </TableHead>
          </TableRow>
          <TableBody>
            {dormers
              .sort((a, b) => a.roomNumber - b.roomNumber) 
              .map((dormer, index) => (
                <TableRow key={index}>
                  <TableCell>Room {dormer.roomNumber}</TableCell>
                  <TableCell>
                    <button className="">
                      Edit
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TableHeader>
      </Table>
    </section>
  );
};

export default ManageRooms;
