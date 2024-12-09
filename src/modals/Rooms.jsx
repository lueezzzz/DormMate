import React from "react";
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

const Rooms = ({ roomNumber, groupedDormers, setSelectedRoom }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => setSelectedRoom(roomNumber)}
          className="bg-[#ff8d4e] hover:bg-[#d3723e] text-white rounded-md text-sm"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Room {roomNumber}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupedDormers[roomNumber]?.map((student, index) => (
              <TableRow key={index}>
                <TableCell>
                  {student.firstName} {student.lastName}
                </TableCell>
                <TableCell>
                  <Button className="bg-[#ff8d4e] hover:bg-[#d3723e] text-white rounded-md text-sm">
                    Move
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default Rooms;
