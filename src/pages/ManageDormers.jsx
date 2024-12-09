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
import AddDormers from "@/modals/AddDormers";
import getDormers from "@/utils/useGetDormers";
import removeDormerByUID from "@/utils/useRemoveDormerByUID";
import signUpDormer from "@/utils/useSignUp";
import { setDoc, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const ManageDormers = () => {
  const [isFetching, setIsFetching] = useState({
    adminDorm: false,
    dormerDetails: false,
  });

  const [user, isLoading] = useAuthState(auth);
  const [dormers, setDormers] = useState([]);
  const [adminDorm, setAdminDorm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    roomNumber: "",
  });

  useEffect(() => {
    if (!isLoading && user) {
      let unsubscribe;

      const fetchAdminAndDormers = async () => {
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
      // await removeDormerByUID(dormerUID);
      await removeDormerByUID("TW2QtbSWxvez6HXZ2hDG5uJ5BQu2");
      console.log("Removed dormer");
    } catch {
      console.log("Error removing");
    }
  };

  const handleAddDormer = async (e) => {
    e.preventDefault();
    const { email, password, roomNumber, lastName, firstName } = formData;

    try {
      const dormer = await signUpDormer(email, password);
      const docRef = await setDoc(doc(db, "users", dormer.uid), {
        email,
        userDorm: adminDorm,
        isAdmin: false,
        roomNumber,
        firstName,
        lastName,
      });
      console.log("Dormer added successfully:", dormer.uid);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error adding dormer:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "roomNumber" ? (value ? parseInt(value) : "") : value,
    }));
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
        <AddDormers
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          formData={formData}
          handleInputChange={handleInputChange}
          handleAddDormer={handleAddDormer}
        />
      </div>
    </section>
  );
};

export default ManageDormers;
