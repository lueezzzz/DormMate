import React, { useEffect, useState } from "react";
import "../index.css";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import EmptyLog from "../assets/images/EmptyLog.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/auth";
import getUserPermits from "@/utils/useGetUserPermits";
import { DormerSideBar } from "@/components/DormerSideBar";
import Loader2 from "@/loaders/Loader2";
import StudentPermits from "@/modals/StudentPermits";

const PermitLogsPage = () => {
  const [permitType, setPermitType] = useState("Late Permit");
  const [selectedPermit, setSelectedPermit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [permits, setPermits] = useState([]);
  const [user, isLoading] = useAuthState(auth);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      const fetchPermits = async () => {
        setIsFetching(true);

        const timeoutId = setTimeout(() => {
          console.log("Timeout reached");
          setIsFetching(false);
        }, 1500);
        try {
          await new Promise((resolve, reject) => {
            getUserPermits((updatedPermits) => {
              setPermits(updatedPermits);
              console.log(isFetching);
              resolve();
            });
          });
        } catch (error) {
          console.log("error");
        } finally {
          clearTimeout(timeoutId);
          setIsFetching(false);
        }
      };

      fetchPermits();
    }
  }, [isLoading, user]);

  const handleChangeView = (viewType) => {
    if (permitType !== viewType) {
      setPermitType(viewType);
    }
  };

  const handleCardClick = (permit) => {
    setSelectedPermit(permit);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="p-6 sm:p-4 md:p-6">
        <SidebarProvider>
          <DormerSideBar />
          <SidebarTrigger className="text-[#ff8d4e] mr-3 sm:mr-1 md:mr-3" />

          <div className="flex flex-col space-y-6 w-full">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-[#ff8d4e]">Permit Logs</h1>
            </div>

            <div className="filter-buttons space-x-4 mb-6">
              <Button
                className={`px-4 py-2 rounded-lg ${
                  permitType === "Late Permit"
                    ? "bg-[#ff8d4e] text-white hover:bg-[#d3723e]"
                    : "bg-gray-100 text-black hover:bg-[#d3723e] hover:text-white"
                }`}
                onClick={() => handleChangeView("Late Permit")}
              >
                Late Night
              </Button>
              <Button
                className={`px-4 py-2 rounded-lg ${
                  permitType === "Overnight Permit"
                    ? "bg-[#ff8d4e] text-white hover:bg-[#d3723e]"
                    : "bg-gray-100 text-black hover:bg-[#d3723e] hover:text-white"
                }`}
                onClick={() => handleChangeView("Overnight Permit")}
              >
                Overnight
              </Button>

              <Button
                className={`px-4 py-2 rounded-lg ${
                  permitType === "Weekend Permit"
                    ? "bg-[#ff8d4e] text-white hover:bg-[#d3723e]"
                    : "bg-gray-100 text-black hover:bg-[#d3723e] hover:text-white"
                }`}
                onClick={() => handleChangeView("Weekend Permit")}
              >
                Weekend
              </Button>
            </div>
            {isFetching ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 />
              </div>
            ) : permits.filter((permit) => permit.permitType === permitType)
                .length === 0 ? (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <img
                  src={EmptyLog}
                  alt="No permits available"
                  className="mt-12"
                />
                <p>No permits yet for this permit type.</p>
              </div>
            ) : (
              <>
                <ul className="space-y-4">
                  {permits
                    .filter((permit) => permit.permitType === permitType)
                    .sort((a, b) => {
                      if (
                        a.permitStatus === "Pending" &&
                        b.permitStatus !== "Pending"
                      ) {
                        return -1;
                      }
                      if (
                        a.permitStatus !== "Pending" &&
                        b.permitStatus === "Pending"
                      ) {
                        return 1;
                      }
                      return 0;
                    })
                    .slice(0, showMore ? permits.length : 2)
                    .map((permit, index) => (
                      <li
                        key={index}
                        className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all"
                        onClick={() => handleCardClick(permit)}
                      >
                        <div>
                          <h2 className="text-xl font-semibold">
                            {permit.permitType}
                          </h2>
                          <p className="text-gray-600 pb-4">
                            Room #{permit.roomNumber}
                          </p>
                          <span
                            className={`text-sm px-2 py-1 rounded-full ${
                              permit.permitStatus === "Approved"
                                ? "bg-green-200 text-green-800"
                                : permit.permitStatus === "Rejected"
                                ? "bg-red-200 text-red-800"
                                : "bg-yellow-300 text-yellow-800"
                            }`}
                          >
                            {permit.permitStatus}
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>

                {permits.filter((permit) => permit.permitType === permitType)
                  .length > 2 && (
                  <div className="flex justify-center mt-4">
                    <Button
                      onClick={() => {
                        setShowMore(!showMore);
                      }}
                      className="px-4 py-2 rounded-lg bg-[#ff8d4e] text-white hover:bg-[#d3723e]"
                    >
                      {showMore ? "Show Less" : "Show More"}
                    </Button>
                  </div>
                )}

                <StudentPermits
                  permit={selectedPermit}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              </>
            )}
          </div>
        </SidebarProvider>
      </section>
    </>
  );
};

export default PermitLogsPage;
