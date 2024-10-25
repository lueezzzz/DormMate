import React from "react";
import "../index.css";
import Headline from "@/components/Headline";
import { dorms } from "@/utils/mockData";
import DormViewCard from "@/components/DormViewCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "../css/TransientView.css"

const TransientView = () => {
  return (
    <>
      <Navbar />
      <section className="transient-view section-center ">
        <Headline
          header="Welcome UPV Guests!"
          subHeader="Browse Available Dormitories & Book Your Stay"
        />
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
      </section>
      <Footer />
    </>
  );
};

export default TransientView;
