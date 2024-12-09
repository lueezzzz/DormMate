import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import managePermit from "@/utils/useManagePermit";
import { ClassicSpinner } from "react-spinners-kit";

const PermitModal = ({ permit, isModalOpen, setIsModalOpen }) => {
  if (!permit) return null;

  const [isLoading, setIsLoading] = useState(false); 

  const handleApprove = async () => {
    setIsLoading(true); 
    try {
      await managePermit(permit.permitID, "Approved");
      console.log("Permit approved:", permit.permitID);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error approving permit:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleReject = async () => {
    setIsLoading(true); 
    try {
      await managePermit(permit.permitID, "Rejected");
      console.log("Permit rejected:", permit.permitID);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error rejecting permit:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center mt-4 text-[#ff8d4e]">
            Permit Details
          </DialogTitle>

          <DialogDescription className="text-center">
            View the details of the selected permit below.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-4 w-full h-full">
            <ClassicSpinner size={50} color="#ff8d4e" />
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <p>
              <strong>Name of Filer: </strong>
            </p>
            <p>
              <strong>Purpose:</strong> {permit.purpose}
            </p>
            <p>
              <strong>Room Number:</strong> {permit.roomNumber}
            </p>
            <p>
              <strong>Status:</strong> {permit.permitStatus}
            </p>
            {permit.permitStatus === "Pending" && (
              <div className="flex gap-4 justify-center pt-4">
                <Button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  onClick={handleApprove}
                >
                  Accept
                </Button>
                <Button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={handleReject}
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PermitModal;
