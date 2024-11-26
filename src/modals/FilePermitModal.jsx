import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import filePermit from "@/utils/useFilePermit";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/db";
import Loader1 from "@/loaders/Loader1";
import { ClassicSpinner } from "react-spinners-kit";

const FilePermitModal = ({ openModal, setOpenModal, userDetails }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    permitType: "",
    timeOut: "",
    destination: "",
    roomNumber: userDetails.roomNumber,
    emergencyContact: "",
    returnDate: "",
    purpose: "",
    dateFiled: "",
    permitStatus: "Pending",
  });

  const onCloseModal = () => {
    setOpenModal(false);
    setFormData({
      permitType: "",
      timeOut: "",
      destination: "",
      roomNumber: userDetails.roomNumber,
      emergencyContact: "",
      returnDate: "",
      purpose: "",
      dateFiled: "",
      permitStatus: "Pending",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "permitType") {
      let newReturnDate = formData.returnDate;

      if (value === "Late Permit") {
        newReturnDate = new Date().toISOString().split("T")[0];
      } else if (value === "Overnight Permit") {
        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        newReturnDate = nextDay.toISOString().split("T")[0];
      }

      setFormData({
        ...formData,
        permitType: value,
        returnDate: newReturnDate,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  async function handleSubmitPermit(e) {
    e.preventDefault();

    setIsLoading(true);

    const currentDate = new Date().toISOString();
    const updatedFormData = { ...formData, dateFiled: currentDate };

    updatedFormData.permitStatus = updatedFormData.permitStatus || "Pending";

    console.log("Submitting Permit Data:", updatedFormData);

    try {
      await filePermit(updatedFormData);
      console.log("Permit filed successfully");
      onCloseModal();
    } catch (error) {
      console.error("Error filing permit:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Modal show={openModal} onClose={onCloseModal} size="lg" popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold">File Permit</h1>
            <p className="text-gray-500 text-sm">
              Please fill up the blank fields below
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-4 w-full h-full">
              <ClassicSpinner size={50} color="#ff8d4e" />
            </div>
          ) : (
            <form onSubmit={handleSubmitPermit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Permit Type
                  </label>
                  <select
                    name="permitType"
                    value={formData.permitType}
                    onChange={handleInputChange}
                    className="w-full border rounded px-2 py-1 bg-gray-100"
                    required
                    disabled={isLoading}
                  >
                    <option value="">Select Type</option>
                    <option value="Late Permit">Late Permit</option>
                    <option value="Overnight Permit">Overnight Permit</option>
                    <option value="Weekend Permit">Weekend Permit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Time out
                  </label>
                  <input
                    type="time"
                    name="timeOut"
                    value={formData.timeOut}
                    onChange={handleInputChange}
                    className="w-full border rounded px-2 py-1 bg-gray-100"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1 bg-gray-100"
                  placeholder="Value"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Emergency Contact No.
                </label>
                <input
                  maxLength={11}
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1 bg-gray-100"
                  placeholder="Value"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Expected Return
                </label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1 bg-gray-100"
                  required
                  disabled={isLoading}
                  min={
                    formData.permitType === "Late Permit"
                      ? new Date().toISOString().split("T")[0] 
                      : formData.permitType === "Overnight Permit"
                      ? new Date(new Date().setDate(new Date().getDate() + 1))
                          .toISOString()
                          .split("T")[0] 
                      : formData.permitType === "Weekend Permit"
                      ? new Date().toISOString().split("T")[0] 
                      : "" 
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Purpose
                </label>
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1 bg-gray-100"
                  placeholder="Value"
                  rows="3"
                  required
                  disabled={isLoading}
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="file-permit-btn"
                  disabled={isLoading}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="text-gray-500 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 transition-all duration-300 ease-linear"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default FilePermitModal;
