import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import assignDormerRoom from "@/utils/useAssignDormerRoom";

const Rooms = ({ roomNumber, groupedDormers, setSelectedRoom }) => {
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
  const [selectedDormer, setSelectedDormer] = useState(null);
  const [targetRoom, setTargetRoom] = useState("");

  const handleMoveButtonClick = (dormer) => {
    setSelectedDormer(dormer);
    setIsMoveDialogOpen(true);
  };

  const handleMoveToRoom = async () => {
    await assignDormerRoom(selectedDormer.uID, targetRoom);
    setIsMoveDialogOpen(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger
          className="text-[#ff8d4e] hover:text-[#d3723e] text-sm"
          onClick={() => setSelectedRoom(roomNumber)}
        >
          <Pencil />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Room {roomNumber}</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupedDormers[roomNumber]?.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <Button
                      className="bg-[#ff8d4e] hover:bg-[#d3723e] text-white rounded-md text-sm"
                      onClick={() => handleMoveButtonClick(student)}
                    >
                      Move
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      <Dialog open={isMoveDialogOpen} onOpenChange={setIsMoveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Move {selectedDormer?.firstName} {selectedDormer?.lastName}
            </DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            <input
              id="targetRoom"
              type="text"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#ff8d4e] focus:border-[#ff8d4e] text-gray-700 bg-gray-50"
              value={targetRoom}
              onChange={(e) => setTargetRoom(e.target.value)}
              placeholder="Enter room number"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              className="bg-gray-400 hover:bg-gray-500 text-white"
              onClick={() => setIsMoveDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#ff8d4e] hover:bg-[#d3723e] text-white"
              onClick={handleMoveToRoom}
            >
              Move
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Rooms;
