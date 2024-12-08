import React from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "../css/TransientBooking.css"

const BookingForm = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/transient");
  };

  return(
      <form className="booking-form">
        <div>
          <Label htmlFor="fullName">Name:</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            // value={formData.fullName}
            // onChange={handleInputChange}
            className="bg-gray-100"
            required={true}
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address:</Label>
          <Input
            id="email"
            name="email"
            type="email"
            // value={formData.email}
            // onChange={handleInputChange}
            className="bg-gray-100"
            required={true}
          />
        </div>
        <div>
          <Label htmlFor="contact">Contact Number:</Label>
          <Input
            id="contact"
            name="contact"
            type="tel"
            // value={formData.contact}
            // onChange={handleInputChange}
            className="bg-gray-100"
            required={true}
          />
        </div>
        <div>
          <Label htmlFor="noOfPersons">How Many Persons Will Stay:</Label>
          <Input
            id="noOfPersons"
            name="noOfPersons"
            min="1"
            type="number"
            // value={formData.noOfPersons}
            // onChange={handleInputChange}
            className="bg-gray-100"
            required={true}
          />
        </div>
        <div>
          <Label htmlFor="checkin">Date of Check-in:</Label>
          <Input
            id="checkin"
            name="checkin"
            type="date"
            // value={formData.checkin}
            // onChange={handleInputChange}
            className="bg-gray-100"
            required={true}
          />
        </div>
        <Button type="submit" className="bg-[#ff8d4e] hover:bg-[#d3723e]">Book</Button>
        <Button
          type="button"
          variant="ghost"
          className="bg-[#d3d3d3] hover:bg-[#c9c4c2]"
          onClick={handleCancel}>
        Cancel
        </Button>
    </form>
  );
};

export default BookingForm;