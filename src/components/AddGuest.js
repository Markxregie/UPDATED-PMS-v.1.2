import React, { useState } from 'react';
import './AddGuest.css';

const AddGuest = ({ show, onClose, onConfirm, guest }) => {

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    room: '',
    checkIn: '',
    checkOut: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.contact) newErrors.contact = 'Contact number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.room) newErrors.room = 'Room number is required';
    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onConfirm(formData); 
      resetForm(); 
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      contact: '',
      email: '',
      room: '',
      checkIn: '',
      checkOut: '',
    });
    setErrors({});
    onClose(); 
  };

  if (!show) {
    return null;    
  }

  return (
    <div className="modal-overlay-add-guest">
      <div className="modal-content-add-guest">
        <h2>Add New Guest</h2>
        <form className="guest-form-add-guest" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Guest Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="error-add-guest">{errors.name}</div>}
          </div>

          <div>
            <label htmlFor="contact">Contact Number</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
            {errors.contact && <div className="error-add-guest">{errors.contact}</div>}
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="error-add-guest">{errors.email}</div>}
          </div>

          <div>
            <label htmlFor="room">Room Number</label>
            <input
              type="text"
              id="room"
              name="room"
              value={formData.room}
              onChange={handleChange}
            />
            {errors.room && <div className="error-add-guest">{errors.room}</div>}
          </div>

          <div>
            <label htmlFor="checkIn">Check-in Date</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
            />
            {errors.checkIn && <div className="error-add-guest">{errors.checkIn}</div>}
          </div>

          <div>
            <label htmlFor="checkOut">Check-out Date</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
            />
            {errors.checkOut && <div className="error-add-guest">{errors.checkOut}</div>}
          </div>

          <div className="modal-buttons-add-guest">
            <button type="submit" className="confirm-button-add-guest">Confirm</button>
            <button type="button" onClick={resetForm} className="cancel-button-add-guest">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGuest;