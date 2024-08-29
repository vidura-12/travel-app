import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import LocationLayout from './LocationLayout';
import UserSupportLayOut from './UserSupportLayOut'
import Home from './com/home';
import Location from './com/location';
import Hotel from './com/hotel';
import Feed from './com/feedback';

import FeedbackForm from './com/feedbackForm';
import Review from './com/review';


import AdminHome from './admin/home';
import AdminLogin from './admin/AdminLogin';
import Tour from './com/tours';
import SchedulerHome from './scheduler/home';
import AgentHome from './travelagent/home';
import Location_Home from './locationmanager/home';




import UserSupport_Home from './usersupporter/home'; //this 
import Feedback from './com/feedbackForm';

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
        <Route path="/review" element={<UserLayout><Review /></UserLayout>} />


         <Route path="/feedbackForm" element={<UserLayout><FeedbackForm /></UserLayout>} />
        

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminLayout><AdminHome /></AdminLayout>} />

         {/* Role-based Routes */}
       
        <Route path="/scheduler/home" element={<AdminLayout><SchedulerHome /></AdminLayout>} />
        <Route path="/travelagent/home" element={<AdminLayout><AgentHome /></AdminLayout>} />
        <Route path="/Location/home" element={<LocationLayout><Location_Home /></LocationLayout>} />

        <Route path="/usersupporter/home" element= {<UserSupportLayOut>< UserSupport_Home/></UserSupportLayOut>} />
         
 
      </Routes>
    </Router>
  );
}

export default App;
