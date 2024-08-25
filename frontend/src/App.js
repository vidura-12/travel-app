import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import TravelAgentLayout from './TravelAgentLayout';
import Home from './com/home';
import Location from './com/location';
import Hotel from './com/hotel';
import Feed from './com/feedback';
import AdminHome from './admin/home';
import AdminLogin from './admin/AdminLogin';
import SchedulerHome from './scheduler/home';
import AgentHome from './travelagent/home';

import AgentContact from './travelagent/num';
import AgentAbout from './travelagent/details';
import AgentDashboard from './travelagent/dashboard';
import AgentCreatePost from './travelagent/createpost';
import AgentBookTourist from './travelagent/booktourist';
import AgentRegister from './travelagent/register';
 

import Location_Home from './locationmanager/home';
import AddEvent from './EventManager/addEvent';
import EventList from './EventManager/eventCard';
import EventLayout from './EventLayout';

import Newlocation from './com/newLocation';
import Schedulerlayout from './schedulerlayout';
import Travelagency from './com/agency';

import Packages from './com/packages';


import LoginPage from './com/LoginPage';
import SignUpPage from './com/SignUpPage'; // Import the SignUpPage component




function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/home" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/location" element={<UserLayout><Location /></UserLayout>} />
        <Route path="/hotel" element={<UserLayout><Hotel /></UserLayout>} />
        <Route path="/feed" element={<UserLayout><Feed /></UserLayout>} />

        <Route path="/tours" element={<UserLayout><Tour /></UserLayout>} />

        <Route path="/newLocation" element={<UserLayout><Newlocation /></UserLayout>} />
        <Route path="/agency" element={<UserLayout><Travelagency /></UserLayout>} />

        <Route path="/packages" element={<UserLayout><Packages/></UserLayout>} />



        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminLayout><AdminHome /></AdminLayout>} />


       
        <Route path="/scheduler/home" element={<AdminLayout><SchedulerHome /></AdminLayout>} />

        <Route path="/travelagent/home" element={<TravelAgentLayout><AgentHome /></TravelAgentLayout>} />
        <Route path="/travelagent/dashboard" element={<TravelAgentLayout><AgentDashboard /></TravelAgentLayout>} />
        <Route path="/travelagent/contact" element={<TravelAgentLayout><AgentContact /></TravelAgentLayout>} />
        <Route path="/travelagent/about" element={<TravelAgentLayout><AgentAbout /></TravelAgentLayout>} />
        <Route path="/travelagent/createpost" element={<TravelAgentLayout><AgentCreatePost/></TravelAgentLayout>} />
        <Route path="/travelagent/booktourist" element={<TravelAgentLayout><AgentBookTourist/></TravelAgentLayout>} />
        <Route path="/travelagent/register" element={<TravelAgentLayout><AgentRegister/></TravelAgentLayout>} />

        <Route path="/scheduler/home" element={<Schedulerlayout><SchedulerHome /></Schedulerlayout>} />
        <Route path="/travelagent/home" element={<AdminLayout><AgentHome /></AdminLayout>} />
        <Route path="/Location/home" element={<LocationLayout><Location_Home /></LocationLayout>} />


        <Route path="/EventManager/addEvent" element={<EventLayout><AddEvent /></EventLayout>} />
        <Route path="/EventManager/eventCard" element={<EventLayout><EventList /></EventLayout>} />


        <Route path="/LocationAdmin/home" element={<LocationLayout><Location_Home /></LocationLayout>} />

      </Routes>
    </Router>
  );
}

export default App;