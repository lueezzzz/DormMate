import React from 'react';
import Roof from '../assets/images/Roof.png';
import EmptyLog from '../assets/images/EmptyLog.png';

const FilePermit = () => {
  return (
    <div className="container">
      <div className="welcome-section">
        <img src={Roof} alt="Welcome Logo" className="roof-image" />
        <h1>Welcome,</h1>
        <h2>Dormer Name</h2>
        <div className="dorm-details">
        <p>Current Dorm: <strong>Balay Lampirong</strong></p>
        <p>Dorm Manager: <strong>Nida N. Belas</strong></p>
        </div>
        <div className="file-permit">
        <button className="permit-button">File Permit</button>
        </div>
      </div>

      <div className="permit-logs">
        <h3>Permit Logs</h3>
        <img src={EmptyLog} alt="Empty Log" className="EmptyLog-image" />
        <p>No permits have been added yet.</p>
      </div>
    </div>
  )
}

export default FilePermit