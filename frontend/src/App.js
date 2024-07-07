import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import Home from './com/home';
import Location from './com/location';
import Hotel from './com/hotel';
import Feed from './com/feedback';
import AdminHome from './admin/home';
import AdminLogin from './admin/AdminLogin';
import SchedulerHome from './scheduler/home';
import agentHome from './travelagent/home';


function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/home" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/location" element={<UserLayout><Location /></UserLayout>} />
        <Route path="/hotel" element={<UserLayout><Hotel /></UserLayout>} />
        <Route path="/feed" element={<UserLayout><Feed /></UserLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminLayout><AdminHome /></AdminLayout>} />

        {/* Role-based Routes */}
       
        <Route path="/scheduler/home" element={<AdminLayout><SchedulerHome /></AdminLayout>} />
        <Route path="/travelagent/home" element={<AdminLayout><agentHome /></AdminLayout>} />
        
      </Routes>
    </Router>
  );
}

export default App;
