import React from 'react'
import "../index.css"
import FilePermit from '../components/FilePermit';
import "../css/DormerPage.css"
import PermitLogs from '@/components/PermitLogs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DormerHomepage = () => {
  return (
    <>
      <section className="dormer-page section-center">

        <div className="file-permit">
           <FilePermit/>
        </div>

        <div className="permit-history">
          <PermitLogs/>
        </div>

      </section>
      <Footer/>
    </>
  );
}

export default DormerHomepage