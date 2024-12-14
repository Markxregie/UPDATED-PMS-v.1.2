import React, { useState, useEffect } from "react";
import Modal from "./facilitiesModal"; 
import "./facilities.css";

const Facilities = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("tab1");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    facilityType: "All",
    capacity: "All",
    availability: "All",
    hours: "All",
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State for Modal

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    const form = event.target;
    // Check if the form is valid
    if (form.checkValidity()) {
      // Submit the form if all fields are valid
      console.log("Form submitted!");
      // You can handle the form data here
    } else {
      // If the form is invalid, trigger validation
      form.reportValidity();
    }
  };

  const filterOptions = {
    facilityType: ["All", "Gym", "Pool", "Conference Room"], // Example values
    capacity: ["All", "10", "20", "30"], // Example values
    availability: ["All", "Available", "Not Available"], // Example values
    hours: ["All", "Mon-Fri", "Mon-Sun"], // Example values
  };

  const filterOptionsBooking = {
    facilityType: ["All", "Gym", "Pool", "Meeting Room"], // Different options for Booking tab
    capacity: ["All", "10", "20", "50"], // Different capacity options
    availability: ["All", "Available", "Not Available"], // Same
    hours: ["All", "Mon-Fri", "Mon-Sun"], // Same
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const filteredData = []; // Empty array since no sample data

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleResetFilters = () => {
    setFilters({
      facilityType: "All",
      capacity: "All",
      availability: "All",
      hours: "All",
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "tab1":
        return (
          <div>
            <FilterBar
              options={filterOptions}
              handleFilterChange={handleFilterChange}
              handleResetFilters={handleResetFilters}
              handleOpenModal={handleOpenModal}
            />
            <Table data={filteredData} />
          </div>
        );
      case "tab2":
        return (
          <div>
            <FilterBar
              options={filterOptionsBooking}
              handleFilterChange={handleFilterChange}
              handleResetFilters={handleResetFilters}
              handleOpenModal={handleOpenModal}
            />
            <TableBooking data={filteredData} />
          </div>
        );
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="facilities-container">
      <div className="facilities-header">
        <h2>Facilities</h2>
        <div className="current-date">
          <p>{formattedDate}</p>
        </div>
      </div>
      <div className="tabs-search">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "tab1" ? "active" : ""}`}
            onClick={() => setActiveTab("tab1")}
          >
            Facilities
          </button>
          <button
            className={`tab-button ${activeTab === "tab2" ? "active" : ""}`}
            onClick={() => setActiveTab("tab2")}
          >
            Facilities Booking
          </button>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="tab-content">{renderContent()}</div>

      <Modal show={isModalOpen} onClose={handleCloseModal}>
        <h2 id="titleaddfacilites">Add New Facility</h2>
        <h3 id="facilitycat">Facility Category</h3>
        <h3 id="pickaction">Pick an Action</h3>
        <div>
          <label className="checkbox">
            <input type="checkbox" name="action" value="Enable" required />
            Create New Facility Category
          </label>
          <label className="checkbox">
            <input type="checkbox" name="action" value="Disable" required />
            Select Existing Facility Category
          </label>
        </div>
        <h3 className="Facilitycatergory">Facility Category</h3>
        <form className="Facilityname" onSubmit={handleSubmit}>
          <label>
            Facility Category Name:
            <input
              type="text"
              name="facilityName"
              required
              placeholder="Facility Category"
            />
          </label>
          <label>
            Facility Category:
            <select name="facilityType" id="facilityType" required>
              <option value="">Select a category</option>
              <option value="Gym">Gym</option>
              <option value="Pool">Pool</option>
              <option value="Conference Room">Conference Room</option>
            </select>
          </label>
        </form>

        <h3 id="FdetailsTitle">Facility Details</h3>

        <div id="upload-image">
          <label>
            Upload Image:
            <input type="file" name="facilityImage" accept="image/*" id="Fimage" />
          </label>
        </div>
        <div className="facility-inputs">
          <div className="input-pair">
            <label>Facility Name:</label>
            <input
              type="text"
              name="facilityName"
              required
              placeholder="Facility Name"
            />
          </div>
          <div className="input-pair">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              required
              placeholder="Location"
            />
          </div>
          <div className="input-pair">
            <label>Capacity:</label>
            <input
              type="number"
              name="capacity"
              required
              placeholder="Capacity"
            />
          </div>
          <div className="input-pair">
            <label>Facility Type:</label>
            <select name="facilityType" id="facilityType" required>
              <option value="">Select Facility Type</option>
              <option value="Gym">Gym</option>
              <option value="Pool">Pool</option>
              <option value="Conference Room">Conference Room</option>
            </select>
          </div>
        </div>
        <div className="Facility-Description">
          <label>Facility Description:</label>
          <input
            type="text"
            name="location"
            required
            placeholder="Location"
          />
        </div>

        <h3 id="Facility-Operational"> Facility Operational Management</h3>
        <div className="operational-times">
          <div className="time-pair">
            <label for="opening-time">Opening Time:</label>
            <input type="time" name="openingTime" id="opening-time" required />
          </div>
          <div className="time-pair">
            <label for="closing-time">Closing Time:</label>
            <input type="time" name="closingTime" id="closing-time" required />
          </div>
        </div>
        <div id="Facility-Operational">
          <div className="operational-options">
            <div className="option-pair">
              <label for="operational-days">Operational Days:</label>
              <select name="operationalDays" id="operational-days" required>
                <option value="">Select Days</option>
                <option value="Monday-Friday">Monday - Friday</option>
                <option value="Monday-Sunday">Monday - Sunday</option>
                <option value="Weekend">Weekend</option>
              </select>
            </div>

            <div className="option-pair">
              <label for="billing-type">Billing Type:</label>
              <select name="billingType" id="billing-type" required>
                <option value="">Select Billing Type</option>
                <option value="Hourly">Hourly</option>
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div className="option-pair">
              <label for="pricing">Pricing:</label>
              <input type="number" name="pricing" id="pricing" required placeholder="Enter Price" />
            </div>
          </div>
        </div>

        <button type="submit" id="button">Save</button>
      </Modal>
    </div>
  );
};

const FilterBar = ({ options, handleFilterChange, handleResetFilters, handleOpenModal }) => {
  return (
    <div className="filter-bar">
      <button className="filter-button">Filter By</button>
      <select
        className="filter-dropdown"
        name="facilityType"
        onChange={handleFilterChange}
      >
        {options.facilityType.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <select
        className="filter-dropdown"
        name="capacity"
        onChange={handleFilterChange}
      >
        {options.capacity.map((cap, index) => (
          <option key={index} value={cap}>
            {cap}
          </option>
        ))}
      </select>
      <select
        className="filter-dropdown"
        name="availability"
        onChange={handleFilterChange}
      >
        {options.availability.map((avail, index) => (
          <option key={index} value={avail}>
            {avail}
          </option>
        ))}
      </select>
      <select
        className="filter-dropdown"
        name="hours"
        onChange={handleFilterChange}
      >
        {options.hours.map((hour, index) => (
          <option key={index} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      <button className="reset-button" onClick={handleResetFilters}>
        Reset Filter
      </button>
      <button className="add-facilities-button" onClick={handleOpenModal}>
        Add Facilities
      </button>
    </div>
  );
};

const Table = ({ data }) => {
  return (
    <table className="facilities-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Facility Name</th>
          <th>Facility Type</th>
          <th>Location</th>
          <th>Price</th>
          <th>Billing Type</th>
          <th>Opening - Closing Hours</th>
          <th>Operational Days</th>
          <th>Capacity</th>
          <th>Availability</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* No sample data here */}
      </tbody>
    </table>
  );
};

const TableBooking = ({ data }) => {
  return (
    <table className="facilities-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Facility</th>
          <th>Facility Type</th>
          <th>Guest Name</th>
          <th>Start-End Date</th>
          <th>Start-End Time</th>
          <th>Total Price Type</th>
          <th>Status</th>
          <th>Number of Guests</th>
          <th>Availability</th>
          <th>Payment Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* No sample data here */}
      </tbody>
    </table>
  );
};

export default Facilities;
