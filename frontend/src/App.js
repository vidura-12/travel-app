import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Layouts
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import TravelAgentLayout from './TravelAgentLayout';
import LocationLayout from './LocationLayout';
import VehicleRentalLayout from './vehiclerental/vehiclerentalLayout';

// Import Components
import Home from './com/home';
import Location from './com/location';
import Hotel from './com/hotel';
import Feed from './com/feedback';
import Tour from './com/tours';
import Newlocation from './com/newLocation';
import Travelagency from './com/agency';
import Packages from './com/packages';
import LoginPage from './com/LoginPage';
import SignUpPage from './com/SignUpPage';

// Vehicle Rental Components
import VehicleRentalHome from './vehiclerental/VehicleRentalHome';
import VehicleOwnerPage from './vehiclerental/VehicleOwner'
import VehicleOwnerLogin from './vehiclerental/VehicleOwnerLogin';
import VehicleOwnerRegister from './vehiclerental/VehicleOwnerRegister';
import Mybookings from './vehiclerental/MyBookings';
import VehicleBook from './vehiclerental/VehicelBook';

// Vehicle Rental Manager Components

// Admin Components
import AdminHome from './admin/home';
import AdminLogin from './admin/AdminLogin';
import SchedulerHome from './scheduler/home';

// Travel Agent Components
import AgentHome from './travelagent/home';
import AgentContact from './travelagent/num';
import AgentAbout from './travelagent/details';
import AgentDashboard from './travelagent/dashboard';
import AgentCreatePost from './travelagent/createpost';
import AgentBookTourist from './travelagent/booktourist';
import AgentRegister from './travelagent/register';
import AgentProfile from './travelagent/profile';
import AgentUpProfile from './travelagent/upProfile';
import AgentSucc from './travelagent/succ';
import AgentGHome from './com/guideHome';

// Location Manager Components
import Location_Home from './locationmanager/home';
import LocationsSummary from './locationmanager/LocationsSummary';
import LocationmanagerHome from './locationmanager/Adminlprofile';

// Scheduler Layout Component
import Schedulerlayout from './schedulerlayout';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* User Routes */}
        <Route path="/home" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/location" element={<UserLayout><Location /></UserLayout>} />
        <Route path="/hotel" element={<UserLayout><Hotel /></UserLayout>} />
        <Route path="/feed" element={<UserLayout><Feed /></UserLayout>} />
        <Route path="/tours" element={<UserLayout><Tour /></UserLayout>} />
        <Route path="/newLocation" element={<UserLayout><Newlocation /></UserLayout>} />
        <Route path="/agency" element={<UserLayout><Travelagency /></UserLayout>} />
        <Route path="/guideHome" element={<UserLayout><AgentGHome /></UserLayout>} />
        <Route path="/packages" element={<UserLayout><Packages /></UserLayout>} />
        
       

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminLayout><AdminHome /></AdminLayout>} />
        <Route path="/scheduler/home" element={<AdminLayout><SchedulerHome /></AdminLayout>} />

        {/* Travel Agent Routes */}
        <Route path="/travelagent/home" element={<TravelAgentLayout><AgentHome /></TravelAgentLayout>} />
        <Route path="/travelagent/dashboard" element={<TravelAgentLayout><AgentDashboard /></TravelAgentLayout>} />
        <Route path="/travelagent/contact" element={<TravelAgentLayout><AgentContact /></TravelAgentLayout>} />
        <Route path="/travelagent/about" element={<TravelAgentLayout><AgentAbout /></TravelAgentLayout>} />
        <Route path="/travelagent/createpost" element={<TravelAgentLayout><AgentCreatePost /></TravelAgentLayout>} />
        <Route path="/travelagent/booktourist" element={<TravelAgentLayout><AgentBookTourist /></TravelAgentLayout>} />
        <Route path="/travelagent/register" element={<TravelAgentLayout><AgentRegister /></TravelAgentLayout>} />
        <Route path="/travelagent/profile" element={<TravelAgentLayout><AgentProfile /></TravelAgentLayout>} />
        <Route path="/travelagent/upProfile" element={<TravelAgentLayout><AgentUpProfile /></TravelAgentLayout>} />
        <Route path="/travelagent/succ" element={<TravelAgentLayout><AgentSucc /></TravelAgentLayout>} />

        {/* Location Manager Routes */}
        <Route path="/LocationAdmin/home" element={<LocationLayout><Location_Home /></LocationLayout>} />
        <Route path="/LocationAdmin/LocationsSummary" element={<LocationLayout><LocationsSummary /></LocationLayout>} />
        <Route path="/LocationAdmin/profile" element={<LocationLayout><LocationmanagerHome /></LocationLayout>} />

        {/* Scheduler Layout Route */}
        <Route path="/scheduler/home" element={<Schedulerlayout><SchedulerHome /></Schedulerlayout>} />

        {/* Vehicle Rental Rout */}
        <Route path="/VehicleRentalHome" element={<VehicleRentalLayout><VehicleRentalHome /></VehicleRentalLayout>} />
        <Route path="/vehicle-owner-dashboard" element={<VehicleOwnerPage />} />
        <Route path="/vehicle-owner/login" element={<VehicleOwnerLogin />} />
        <Route path="/vehicle-owner/register" element={<VehicleOwnerRegister />} />
        <Route path="/mybookings" element={<Mybookings />} />
        <Route path="/vehiclebook/:vehicleId" element={<VehicleBook />} />
        <Route path="/vehicleRenatalHome" element={<VehicleRentalHome />} />
        <Route path="/vehicle-owner-dashboard" element={<VehicleOwnerPage />} />

        
      </Routes>
    </Router>
  );
}

export default App;
