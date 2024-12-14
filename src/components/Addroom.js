
import React from "react";
import "./AddRoom.css";

const AddRoom = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const roomData = Object.fromEntries(formData.entries());
    onSubmit(roomData); 
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add Room</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-section">
  <h1>Room Details</h1>
  <label>Upload Images</label>
  <div className="form-row">
    <div className="form-section upload-images">
      <input type="file" name="images" accept="image/*" required />
    </div>
    <div className="form-section description">
      <label>Description</label>
      <textarea name="description" placeholder="Enter room description" required />
    </div>
  </div>
</div>

          <div className="form-row">
            <div className="form-section">
              <label>Room Number</label>
              <input type="text" name="roomNumber" required />
            </div>
            <div className="form-section">
              <label>Floor Number</label>
              <input type="text" name="floorNumber" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-section">
              <label>Room Type</label>
              <select name="roomType" required>
                <option value="" disabled>Select Room Type</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
              </select>
            </div>
            <div className="form-section">
              <label>Room Status</label>
              <select name="roomStatus" required>
                <option value="" disabled>Select Status</option>
                <option value="Available">Available</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Out-of-Order">Out of Order</option>
              </select>
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoom; 
