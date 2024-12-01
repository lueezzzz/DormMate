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
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const ManageDormers = () => {
  const [isFetching, setIsFetching] = useState({
    adminDorm: false,
    dormersUID: false,
    dormerDetails: false,
  });

  const [dormerUID, setDormerUID] = useState([]);
  const [user, isLoading] = useAuthState(auth);
  const [dormers, setDormers] = useState([]);

  useEffect(() => {
    if (!isLoading && user) {
      let unsubscribe;

      const fetchAdminAndDormeruID = async () => {
        setIsFetching((prev) => ({ ...prev, adminDorm: true }));
        try {
          const adminRef = doc(db, "users", user.uid);
          const adminDocSnap = await getDoc(adminRef);
          let adminDorm = "";

          if (adminDocSnap.exists()) {
            adminDorm = adminDocSnap.data().userDorm;

            fetchDormers(adminDorm);
            fetchDormersUID(adminDorm);
          } else {
            console.error("DNE");
          }
        } catch (error) {
          console.log("Error: ", error);
        } finally {
          setIsFetching((prev) => ({ ...prev, adminDorm: false }));
        }
      };

      const fetchDormersUID = async (dorm) => {
        setIsFetching((prev) => ({ ...prev, dormersUID: true }));
        try {
          const uID = await getDormersByUID(dorm);
          setDormerUID(uID);
        } catch (error) {
          console.error("Error fetching");
        } finally {
          setIsFetching((prev) => ({ ...prev, dormersUID: false }));
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

      fetchAdminAndDormeruID();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [isLoading, user]);

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
                    onClick={() => handleRemoveDormer()}
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
