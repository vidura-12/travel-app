import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import LocationLayout from './LocationLayout';
import Home from './com/home';
import Location from './com/location';
import Hotel from './com/hotel';
import Feed from './com/feedback';
import AdminHome from './admin/home';
import AdminLogin from './admin/AdminLogin';
import Tour from './com/tours';
import SchedulerHome from './scheduler/home';
import AgentHome from './travelagent/home';
import Location_Home from './locationmanager/home';
import Newlocation from './com/newLocation';
<<<<<<< Updated upstream
=======
import Schedulerlayout from './schedulerlayout';
import Travelagency from './com/agency';
import LoginPage from './com/LoginPage'; // Import LoginPage
import SignUpPage from './com/SignUpPage'; // Import SignUpPage (correct name)
import ProfileDetails from './com/ProfileDetails';
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< Updated upstream
=======
        {/* Default Route: Redirect to LoginPage */}
        <Route path="/" element={<Navigate to="/LoginPage" />} />

        {/* Login Route */}
        <Route path="/LoginPage" element={<LoginPage />} />
        
        {/* Signup Route */}
        <Route path="/SignUpPage" element={<SignUpPage />} />  {/* Correct path for SignUpPage */}

>>>>>>> Stashed changes
        {/* User Routes */}
        <Route path="/home" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/location" element={<UserLayout><Location /></UserLayout>} />
        <Route path="/hotel" element={<UserLayout><Hotel /></UserLayout>} />
        <Route path="/feed" element={<UserLayout><Feed /></UserLayout>} />
        <Route path="/tours" element={<UserLayout><Tour /></UserLayout>} />
        <Route path="/newLocation" element={<UserLayout><Newlocation /></UserLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminLayout><AdminHome /></AdminLayout>} />

         {/* Role-based Routes */}
       
         <Route path="/scheduler/home" element={<AdminLayout><SchedulerHome /></AdminLayout>} />
        <Route path="/travelagent/home" element={<AdminLayout><AgentHome /></AdminLayout>} />
        <Route path="/LocationAdmin/home" element={<LocationLayout><Location_Home /></LocationLayout>} />

      </Routes>
    </Router>
  );
}

export default App;