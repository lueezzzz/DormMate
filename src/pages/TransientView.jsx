import React, { useEffect, useState } from "react";
import "../index.css";
import Headline from "@/components/Headline";
import DormViewCard from "@/components/DormViewCard";
import Footer from "@/components/Footer";
import Navbar from '../components/Navbar';
import "../css/TransientView.css"
import getDorms from "@/utils/useGetDorms";
import { ClassicSpinner } from "react-spinners-kit";

const TransientView = () => {

  const [dorms, setDorms] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  
  useEffect(()=>{
    const fetchDormData = async () => {
      setIsFetching(true);
      try {
        const dormData = await getDorms();
        setDorms(dormData);
      } catch (error) {
        console.log(error);
      } finally{
        setIsFetching(false);
      }
    };

    fetchDormData();
  }, [])

  return (
    <>
      <Navbar />
      <section className="transient-view section-center">
        <Headline
          header="Welcome UPV Guests!"
          subHeader="Browse Available Dormitories & Book Your Stay"
        />

        {isFetching ? (
          <div className="flex items-center justify-center">
            <div className="mt-10">
              <ClassicSpinner size={50} color="#ff8d4e" />
            </div>
          </div>
        ) : (
          <div className="mx-20 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dorms.map((dorm, index) => (
                <DormViewCard
                  title={dorm.name}
                  avl_rooms={dorm.availRooms}
                  key={index}
                />
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default TransientView;
