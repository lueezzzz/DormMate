import { Modal } from "flowbite-react";
import React, { useState } from "react";
import filePermit from "@/utils/useFilePermit";

const FilePermitModal = ({ openModal, setOpenModal }) => {

  const onCloseModal = () => {
    setOpenModal(false);
    setFormData({
      permitType: "",
      timeOut: "",
      destination: "",
      roomNumber: "",
      emergencyContact: "",
      returnDate: "",
      purpose: "",
    });
  };
  
  const [formData, setFormData] = useState({
    permitType: "",
    timeOut: "",
    destination: "",
    roomNumber: "",
    emergencyContact: "",
    returnDate: "",
    purpose: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmitPermit(e) {
    e.preventDefault();
    try {
      await filePermit(formData);
      console.log("Permit filed successfully");
    } catch (error) {
      console.error("Error filing permit:", error);
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
                >
                  <option value="">Select Type</option>
                  <option value="late-night">Late Night</option>
                  <option value="overnight">Overnight</option>
                  <option value="weekend">Weekend</option>
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
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Room no.
                </label>
                <input
                  type="number"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1 bg-gray-100"
                  min="1"
                  max="100"
                  placeholder="Enter room number"
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
                />
              </div>
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
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <button type="submit" className="file-permit-btn">
                Submit
              </button>
              <button
                type="button"
                onClick={onCloseModal}
                className="text-gray-500 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 transition-all duration-300 ease-linear"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FilePermitModal;
