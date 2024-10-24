import React from "react";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";
import Footer from "@/components/Footer";

const LoginPage = (props) => {
  return (
    <>
      <Navbar />
      <LoginForm onEmailChange={(e) => setEmail(e.target.value)} />
      <Footer />
    </>
  );
};

export default LoginPage;
