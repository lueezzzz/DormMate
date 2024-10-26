import React from "react";
import "../index.css";
import FilePermit from "../components/FilePermit";
import "../css/DormerPage.css";
import PermitLogs from "@/components/PermitLogs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import filePermit from "@/utils/useFilePermit";

const DormerHomepage = () => {
  async function handleSubmit(permitData) {
    const userInfo = await filePermit(permitData);
    console.log(userInfo);
  }
  return (
    <>
      <section className="dormer-page section-center">
        <div className="file-permit">
          <FilePermit />
        </div>

        <div className="permit-history">
          <PermitLogs />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DormerHomepage;
