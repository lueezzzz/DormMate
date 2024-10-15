import React from "react";

import "../index.css";
import Headline from "@/components/Headline";
import { dorms } from "@/utils/mockData";

import DormViewCard from "@/components/DormViewCard";
import Footer from "@/components/Footer";
import NavbarLogin from "@/components/NavbarLogin";

const TransientView = () => {


  return (
    <>
      <NavbarLogin/>
      <Headline />
      <div className="mx-20 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dorms.map((dorm) => (
            <DormViewCard
              title={dorm.title}
              image={dorm.image}
              avl_rooms={dorm.avl_rooms}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TransientView;
