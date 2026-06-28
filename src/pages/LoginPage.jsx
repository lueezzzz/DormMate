import React from "react";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/forms/LoginForm";
import Footer from "@/components/landing-page/Footer";

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <LoginForm />
      <Footer />
    </>
  );
};

export default LoginPage;
