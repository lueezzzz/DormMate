import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/firebase/auth";
import { db } from "@/firebase/db";
import getDormers from "@/utils/useGetDormers";
import getDormersByUID from "@/utils/useGetDormersByUID";
import removeDormerByUID from "@/utils/useRemoveDormerByUID";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const ManageDormers = () => {
  const [isFetching, setIsFetching] = useState({
    adminDorm: false,
    dormerDetails: false,
  });

  const [user, isLoading] = useAuthState(auth);
  const [dormers, setDormers] = useState([]);

  useEffect(() => {
    if (!isLoading && user) {
      let unsubscribe;

      const fetchAdminAndDormers = async () => {
        setIsFetching((prev) => ({ ...prev, adminDorm: true }));
        try {
          const adminRef = doc(db, "users", user.uid);
          const adminDocSnap = await getDoc(adminRef);
          let adminDorm = "";

          if (adminDocSnap.exists()) {
            adminDorm = adminDocSnap.data().userDorm;
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
          unsubscribe = await getDormers(setDormers, adminDorm);
        } catch (error) {
          console.log("Error: ", error);
        } finally {
          setIsFetching((prev) => ({ ...prev, dormerDetails: false }));
        }
      };

      fetchAdminAndDormers();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [isLoading, user]);

  const handleRemoveDormer = async (dormerUID) => {
    try {
      await removeDormerByUID(dormerUID);
      console.log("Removed dormer");
    } catch {
      console.log("Error removing");
    }
  };

  return (
    <section>
      <div className="">Manage Dormers</div>
      <div>
        <Table className="w-[50%]">
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Room Assignment </TableHead>
              <TableHead> Remove </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dormers.map((dormer, index) => (
              <TableRow key={index}>
                <TableCell>{`${dormer.firstName} ${dormer.lastName}`}</TableCell>
                <TableCell>{dormer.roomNumber}</TableCell>
                <TableCell>
                  <button
                    className="text-red-500"
                    onClick={() => handleRemoveDormer(dormer.uID)}
                  >
                    Remove
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default ManageDormers;
