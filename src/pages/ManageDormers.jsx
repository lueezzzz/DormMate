import { AppSidebar } from "@/components/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
import EmptyLog from "../assets/images/EmptyLog.png";

import Loader1 from "@/loaders/Loader1";
import { ClassicSpinner } from "react-spinners-kit";

import { Trash2 } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Loader2 from "@/loaders/Loader2";

const ManageDormers = () => {
  const [isFetching, setIsFetching] = useState({
    adminDorm: false,
    dormerDetails: false,
    addingDormer: false,
  });

  const [user, isLoading] = useAuthState(auth);
  const [dormers, setDormers] = useState([]);
  const [adminDorm, setAdminDorm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDormer, setSelectedDormer] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);

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
    setIsRemoving(true);
    try {
      await removeDormerByUID(dormerUID);
      console.log("Removed dormer");
    } catch {
      console.log("Error removing");
    } finally {
      setIsRemoving(false);
      setIsOpen(false)
    }
  };

  const handleAddDormer = async (e) => {
    e.preventDefault();
    const { email, password, roomNumber, lastName, firstName } = formData;

    try {
      setIsFetching((prev) => ({ ...prev, addingDormer: true }));
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
    } finally {
      setIsFetching((prev) => ({ ...prev, addingDormer: false }));
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
    <>
      <section className="p-6 sm:p-4 md:p-6">
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger className="text-[#ff8d4e] mr-3 sm:mr-1 md:mr-3" />
          <div className="flex flex-col space-y-4 sm:space-y-6 w-full">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#ff8d4e]">
                Manage Dormers
              </h1>
            </div>
            <div>
              {isFetching.adminDorm ||
              isFetching.dormerDetails ||
              isFetching.addingDormer ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 />
                </div>
              ) : dormers.length === 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <img src={EmptyLog} alt="No Dormers" className="mt-[50px]" />
                  <p className="text-gray-500">No Dormers yet.</p>
                </div>
              ) : (
                <div>
                  <div className="overflow-x-auto mt-10">
                    <Table className="sm:w-full md:w-3/4 lg:w-1/2 min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                      <TableHeader>
                        <TableRow className="bg-gray-100 text-left">
                          <TableHead className="px-4 py-2 text-sm font-medium text-gray-600">
                            Name
                          </TableHead>
                          <TableHead className="px-4 py-2 text-sm font-medium text-gray-600">
                            Room Assignment
                          </TableHead>
                          <TableHead className="px-4 py-2 text-sm font-medium text-gray-600">
                            Remove
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dormers.map((dormer, index) => (
                          <TableRow
                            key={index}
                            className="border-b even:bg-gray-50 hover:bg-gray-100"
                          >
                            <TableCell className="px-4 py-2 text-sm text-gray-800">{`${dormer.firstName} ${dormer.lastName}`}</TableCell>
                            <TableCell className="px-4 py-2 text-sm text-gray-600">
                              {dormer.roomNumber}
                            </TableCell>
                            <TableCell>
                              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger
                                  className="text-red-500 ml-4 hover:text-red-700 transition duration-200"
                                  onClick={() => {
                                    setSelectedDormer(dormer);
                                  }}
                                >
                                  <Trash2 />
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogTitle>
                                    Are you sure you want to remove this user?
                                  </DialogTitle>
                                  <DialogDescription>
                                    {selectedDormer && (
                                      <DialogDescription>
                                        {selectedDormer.firstName}{" "}
                                        {selectedDormer.lastName}
                                      </DialogDescription>
                                    )}
                                  </DialogDescription>
                                  <DialogFooter>
                                    <DialogClose
                                      onClick={() => setIsOpen(false)}
                                      className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md mr-2 transition duration-200"
                                    >
                                      Cancel
                                    </DialogClose>

                                    <button
                                      onClick={() =>
                                        handleRemoveDormer(selectedDormer.uID)
                                      }
                                      className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md transition duration-200"
                                    >
                                      {isRemoving ? (
                                        <ClassicSpinner
                                          size={20}
                                          color="#fff"
                                        />
                                      ) : (
                                        "Confirm"
                                      )}
                                    </button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex justify-center items-center h-16 mt-5">
                    {isFetching.addingDormer ? (
                      <ClassicSpinner size={20} color="#ff8d4e" />
                    ) : (
                      <AddDormers
                        isDialogOpen={isDialogOpen}
                        setIsDialogOpen={setIsDialogOpen}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleAddDormer={handleAddDormer}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </SidebarProvider>
      </section>
    </>
  );
};

export default ManageDormers;
