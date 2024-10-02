import React from "react";
import { Button } from "@/components/ui/button";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const PermitCard = (props) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-2xl rounded-lg md:min-w-[450px] m-10 bg-red-300"
    >
      <ResizablePanel defaultSize={75} className="p-3">
        <div className="flex align-middle p-0 ">
          <span className="font-semibold text-2xl">{props.name}</span>
        </div>
        <div className="flex align-middle p-0">
          <span className="font-semibold">Room #{props.room}</span>
        </div>
        <Button className="rounded-full">{props.status}</Button>
      </ResizablePanel>
      <ResizableHandle></ResizableHandle>
      <ResizablePanel defaultSize={25}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel className="">
            <Button className="rounded-full">Accept</Button>
            <Button className="rounded-full">Reject</Button>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default PermitCard;
