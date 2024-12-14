import React from "react";
import "./Archives.css";

const ArchivesList = ({ isOpen, onClose, archivedGuests }) => {
  if (!isOpen) return null;

  return (
    <div className="archives-modal-overlay">
      <div className="archives-modal-content">
        <h2>Archived Guests</h2>
        <table className="archives-table">
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Contact Number</th>
              <th>Email Address</th>
              <th>Room Number</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
            </tr>
          </thead>
          <tbody>
            {archivedGuests.length > 0 ? (
              archivedGuests.map((guest, index) => (
                <tr key={index}>
                  <td>{guest.name}</td>
                  <td>{guest.contact}</td>
                  <td>{guest.email}</td>
                  <td>{guest.room}</td>
                  <td>{guest.checkIn}</td>
                  <td>{guest.checkOut}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="archives-empty">
                  No archived guests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="archives-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ArchivesList;