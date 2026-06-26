import React from "react";
import Navbar from "../components/Navbar";
import "../index.css";
import Hero from "../components/landing-page/Hero";
import About from "../components/landing-page/About";
import Feature from "../components/landing-page/Feature";
import Authors from "../components/landing-page/Authors";
import Footer from "@/components/landing-page/Footer";
import { customTheme } from "@/utils/mockData";

const LandingPage = () => {
  return (
    <>
      <Navbar flowbiteTheme={customTheme} />
      <Hero />
      <Feature />
      <About />
      <Authors />
      <Footer />
    </>
  );
};

export default LandingPage;
