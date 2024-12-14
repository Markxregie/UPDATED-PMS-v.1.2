import React, { useEffect, useState } from 'react';
import './guest.css';
import AddGuest from './AddGuest.js';

const Modal = ({ show, onClose, onConfirm, guest }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="archive-modal-overlay">
      <div className="archive-modal-content">
        <p>Are you sure you want to archive this guest?</p>
        <p><strong>{guest.name}</strong> - Room {guest.room}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="confirm-button">Confirm</button>
          <button onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

const ArchivesListModal = ({ show, onClose, archives }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="archive-modal-overlay">
      <div className="archive-modal-content">
        <h2>Archives List</h2>
        {archives.length === 0 ? (
          <p>No archived guests.</p>
        ) : (
          <ul>
            {archives.map((guest, index) => (
              <li key={index}>{guest.name} - Room {guest.room}</li>
            ))}
          </ul>
        )}
        <button onClick={onClose} className="cancel-button">Close</button>
      </div>
    </div>
  );
};

const Guest = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddGuestModalOpen, setIsAddGuestModalOpen] = useState(false);
  const [isArchivesModalOpen, setIsArchivesModalOpen] = useState(false); // State for Archives Modal
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [guests, setGuests] = useState([
    { name: 'Yesha Perez', contact: '09217680121', email: 'yeng@gmail.com', room: '00001', checkIn: '2024-12-14', checkOut: '2024-12-15' },
    { name: 'Limuel Alcovendas', contact: '09212345678', email: 'limwel@gmail.com', room: '00002', checkIn: '2024-12-14', checkOut: '2024-12-15' },
    { name: 'Mark Legend', contact: '09219876543', email: 'mark@gmail.com', room: '00003', checkIn: '2024-12-14', checkOut: '2024-12-15' },
  ]);
  const [archives, setArchives] = useState([]); // Archived guests

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = () => {
    const results = guests.filter((guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.contact.includes(searchTerm) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.room.includes(searchTerm)
    );
    setFilteredGuests(results); 
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);  
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const openModal = (guest) => {
    setSelectedGuest(guest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGuest(null);
    setIsModalOpen(false);
  };

  const confirmArchive = () => {
    setArchives((prevArchives) => [...prevArchives, selectedGuest]);
    setGuests((prevGuests) => prevGuests.filter((guest) => guest !== selectedGuest));
    closeModal();
  };

  const openAddGuestModal = () => {
    setIsAddGuestModalOpen(true);
  };

  const closeAddGuestModal = () => {
    setIsAddGuestModalOpen(false);
  };

  const addGuest = (newGuest) => {
    setGuests((prevGuests) => [...prevGuests, newGuest]);
    closeAddGuestModal(); 
  };

  const openArchivesModal = () => {
    setIsArchivesModalOpen(true);
  };

  const closeArchivesModal = () => {
    setIsArchivesModalOpen(false);
  };

  return (
    <div className="guest-container">
      <div className="title-date-container">
        <h1 className="guest-title">Guest</h1>
        <p className="current-date">{formattedDate}</p>
      </div>
      
      <div className="header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Guest"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="buttons">
          <button className="add-guest" onClick={openAddGuestModal}>+ Add Guest</button>
          <button className="archives" onClick={openArchivesModal}>Archives List</button>
        </div>
      </div>

      <table className="guest-table">
        <thead>
          <tr>
            <th>Guest Name</th>
            <th>Contact Number</th>
            <th>Email Address</th>
            <th>Room Number</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(filteredGuests.length > 0 ? filteredGuests : guests).map((guest, index) => (
            <tr key={index}>
              <td>{guest.name}</td>
              <td>{guest.contact}</td>
              <td>{guest.email}</td>
              <td>{guest.room}</td>
              <td>{guest.checkIn}</td>
              <td>{guest.checkOut}</td>
              <td>
                <button className="view-button">View</button>
                <button className="archive-button" onClick={() => openModal(guest)}>Archive</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddGuest 
        show={isAddGuestModalOpen} 
        onClose={closeAddGuestModal} 
        onConfirm={addGuest} 
        guest={null} 
      />

      <Modal 
        show={isModalOpen} 
        onClose={closeModal} 
        onConfirm={confirmArchive} 
        guest={selectedGuest} 
      />

      <ArchivesListModal 
        show={isArchivesModalOpen} 
        onClose={closeArchivesModal} 
        archives={archives} 
      />
    </div>
  );
};

export default Guest;