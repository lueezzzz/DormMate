import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const AddDormers = ({
  isDialogOpen,
  setIsDialogOpen,
  formData,
  handleInputChange,
  handleAddDormer,
}) => {
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      className="w-[50%]"
    >
      <DialogTrigger asChild>
        <Button className="bg-[#ff8d4e] hover:bg-[#d3723e]">Add Dormer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Dormer</DialogTitle>
          <DialogDescription>
            Please fill in the details of the new dormer.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddDormer}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-gray-100"
                required={true}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-gray-100"
                required={true}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-gray-100"
                required={true}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-gray-100"
                required={true}
              />
            </div>
            <div>
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input
                id="roomNumber"
                name="roomNumber"
                type="number"
                value={formData.roomNumber}
                onChange={handleInputChange}
                className="bg-gray-100"
                required={true}
              />
            </div>
          </div>
          <DialogFooter className="mt-5">
            <Button type="submit" className="bg-[#ff8d4e] hover:bg-[#d3723e]">
              Add
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDormers;
