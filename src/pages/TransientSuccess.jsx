import React from "react";
import Navbar from "../components/Navbar";
import Footer from "@/components/landing-page/Footer";
import "../css/TransientView.css";
import SuccessMessage from "@/components/SuccessMessage";

const TransientSuccess = () => {
  return (
    <>
      <Navbar />
      <SuccessMessage />
      <Footer />
    </>
  );
};

export default TransientSuccess;
