
import React, { useState } from "react";
import "./AddRoomType.css"; 

const AddRoomType = ({ isOpen, onClose, onSubmit }) => {
  const [roomTypeName, setRoomTypeName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState({
    wifi: false,
    shower: false,
    towels: false,
    tv: false,
    concierge: false,
  });
  const [facilities, setFacilities] = useState({
    pool: false,
    gym: false,
    conferenceRoom: false,
    restaurant: false,
    spa: false,
  });

  const amenitiesList = [
    { name: "wifi", label: "WiFi" },
    { name: "aircon", label: "Air Conditioned Room" },
    { name: "shower", label: "Shower Gel, Soap, and Shampoo" },
    { name: "towels", label: "Towels and Linens" },
    { name: "tv", label: "Television Access" },
    { name: "telphone", label: "Telephone" },
    { name: "ref", label: "Refrigerator" },
    { name: "wardrobe", label: "Wardrobe and Closet" },
    { name: "concierge", label: "Concierge Services" },
  ];

  const facilitiesList = [
    { name: "pool", label: "Pool Access" },
    { name: "gym", label: "Gym" },
    { name: "conferenceRoom", label: "Conference Room" },
    { name: "restaurant", label: "Restaurant" },
    { name: "spa", label: "Spa" },
  ];


  const handleAmenityChange = (event) => {
    const { name, checked } = event.target;
    setAmenities((prevAmenities) => ({
      ...prevAmenities,
      [name]: checked, 
    }));
  };


  const handleFacilityChange = (event) => {
    const { name, checked } = event.target;
    setFacilities((prevFacilities) => ({
      ...prevFacilities,
      [name]: checked, 
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const roomTypeData = {
      roomTypeName,
      basePrice,
      capacity,
      roomSize,
      description,
      amenities,
      facilities,
    };
    onSubmit(roomTypeData);
    onClose(); 
  };


  if (!isOpen) return null;

  return (
    <div className="add-room-type-modal-overlay">
      <div className="add-room-type-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Add Room Type</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group1">
            <label>Room Type Name</label>
            <input
              type="text"
              value={roomTypeName}
              onChange={(e) => setRoomTypeName(e.target.value)}
              required
            />
          </div>
          <div className="form-group1">
            <label>Base Price</label>
            <input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group1">
            <label>Capacity</label>
            <input
              type="text"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>
          <div className="form-group1">
            <label>Room Size</label>
            <input
              type="text"
              value={roomSize}
              onChange={(e) => setRoomSize(e.target.value)}
              required
            />
          </div>
          <div className="form-group1">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group2">
            <label>Included Amenities:</label>
            <div className="amenities-list">
              {amenitiesList.map((amenity) => (
                <div key={amenity.name} className="amenity-item">
                  <input
                    type="checkbox"
                    name={amenity.name}
                    checked={amenities[amenity.name]} 
                    onChange={handleAmenityChange} 
                    id={amenity.name}
                  />
                  <label htmlFor={amenity.name}>{amenity.label}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group2">
            <label>Included Facilities:</label>
            <div className="facilities-list">
              {facilitiesList.map((facility) => (
                <div key={facility.name} className="facility-item">
                  <input
                    type="checkbox"
                    name={facility.name}
                    checked={facilities[facility.name]} 
                    onChange={handleFacilityChange} 
                    id={facility.name}
                  />
                  <label htmlFor={facility.name}>{facility.label}</label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="confirm-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoomType;
