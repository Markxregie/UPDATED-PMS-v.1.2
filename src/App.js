import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Dashboard from './components/dashboard';
import Room from './components/room';
import Booking from './components/booking';
import Guest from './components/guest';
import Housekeeping from './components/housekeeping';
import Facilities from './components/facilities';
import Billing from './components/billing';
import Reports from './components/report';
import Employee from './components/employee';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="dashboard-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/room" element={<Room />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/guest" element={<Guest />} />
            <Route path="/housekeeping" element={<Housekeeping />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/employee" element={<Employee />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
