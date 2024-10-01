import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../index.css";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import PermitCard from "@/components/PermitCard";
import permitsMockData from "@/utils/mockData";

const AdminPermits = () => {
  const [permitType, setPermitType] = useState("Late Night");
  const handleChangeView = (viewType) => {
    if (permitType != viewType) {
      setPermitType(viewType);
    }
  };
  return (
    <>
      <ResizablePanelGroup
        className="max-w-md rounded-lg border md:min-w-[450px] bg-slate-300"
        direction="horizontal"
        style={{ margin: "50px" }}
      >
        <ResizablePanel
          className="flex justify-center align-middle"
          defaultSize={33}
        >
          <Button
            className="m-1"
            onClick={() => handleChangeView("Late Night")}
          >
            Late Night
          </Button>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          className="flex justify-center align-middle"
          defaultSize={33}
        >
          <Button className="m-1" onClick={() => handleChangeView("Overnight")}>
            Overnight
          </Button>
        </ResizablePanel>
        <ResizableHandle />

        <ResizablePanel
          className="flex justify-center align-middle"
          defaultSize={33}
        >
          <Button className="m-1" onClick={() => handleChangeView("Weekend")}>
            Weekend
          </Button>
        </ResizablePanel>
      </ResizablePanelGroup>
      <ul>
        {permitsMockData
          .filter((permit) => permit.type == permitType)
          .map((permit) => (
            <li key={permit.id}>
              <PermitCard
                name={permit.name}
                room={permit.room}
                status={permit.status}
              />
            </li>
          ))}
      </ul>
    </>
  );
};

export default AdminPermits;
