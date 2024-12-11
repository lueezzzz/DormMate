import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ClassicSpinner } from "react-spinners-kit";

const StudentPermits = ({ permit, isModalOpen, setIsModalOpen }) => {
  if (!permit) return null;

  const [isLoading, setIsLoading] = useState(false);

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
              <strong>Name of Filer: </strong> {permit.permitFiler}
            </p>
            <p>
              <strong>Purpose:</strong> {permit.purpose}
            </p>
            <p>
              <strong>Room Number:</strong> {permit.roomNumber}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`${
                  permit.permitStatus === "Rejected"
                    ? "text-red-500"
                    : permit.permitStatus === "Accepted"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {permit.permitStatus}
              </span>
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StudentPermits;
