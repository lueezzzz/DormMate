import { DormerSideBar } from "@/components/DormerSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import FilePermitModal from "@/modals/FilePermitModal";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/db";

const FilePermitPage = () => {
  const [dormer, setDormer] = useState(null);
  const [user, isLoading] = useAuthState(auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      const fetchDormer = async () => {
        try {
          const dormerRef = doc(db, "users", user.uid);
          const dormerDocSnap = await getDoc(dormerRef);

          if (dormerDocSnap.exists()) {
            setDormer(dormerDocSnap.data());
            console.log("fetched");
          } else {
            console.error("Error");
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
      fetchDormer();
    }
  }, [isLoading, user]);

  return (
    <>
      <section className="p-6 sm:p-4 md:p-6">
        <SidebarProvider>
          <DormerSideBar />
          <SidebarTrigger className="text-[#ff8d4e] mr-3 sm:mr-1 md:mr-3" />
          <div className="flex flex-col space-y-6 w-full">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-[#ff8d4e]">
                File Permits
              </h1>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[#ff8d4e] text-white rounded-full">
                  1
                </div>
                <p className="text-gray-700">Click the Button</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[#ff8d4e] text-white rounded-full">
                  2
                </div>
                <p className="text-gray-700">Fill up the form</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[#ff8d4e] text-white rounded-full">
                  3
                </div>
                <p className="text-gray-700">Done!</p>
              </div>
            </div>

            <div className="flex items-center justify-center h-[75%]">
              <button
                className="relative px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#ff8d4e] to-[#ff622d] rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:from-[#ff622d] hover:to-[#ff8d4e] active:scale-95 focus:outline-none"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="absolute inset-0 bg-white opacity-0 rounded-lg transition-opacity duration-300 hover:opacity-10"></span>
                File a Permit
              </button>
            </div>
          </div>
        </SidebarProvider>
        {isModalOpen && (
          <FilePermitModal
            openModal={isModalOpen}
            setOpenModal={setIsModalOpen}
            userDetails={dormer}
          />
        )}
      </section>
    </>
  );
};

export default FilePermitPage;
