import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Layouts
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import TravelAgentLayout from './TravelAgentLayout';
import LocationLayout from './LocationLayout';

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

// Admin Components
import AdminHome from './admin/home';
import AdminLogin from './admin/AdminLogin';

import Tour from './com/tours';

import SchedulerHome from './scheduler/home';

import SchedulerHome from './scheduler/home';


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

import Newlocation from './com/newLocation';

import Schedulerlayout from './schedulerlayout';

import Travelagency from './scheduler/agency';
import PackageDetails from './scheduler/packagedetails';
import Tour from './scheduler/tours';
import Sellersignup from './scheduler/Sellersignup';

import Travelagency from './com/agency';
import PackageDetails from './com/packagedetails';
import SellerSignup from './com/sellersignup';
import SchedulerDashboard from './com/Schedulerdashboard';
import SellersProfile from './com/Sellersprofile';
import EditPackage from './com/Editpackage';

import Travelagency from './com/agency';
import PackageDetails from './com/packagedetails';





import LoginPage from './com/LoginPage';
import SignUpPage from './com/SignUpPage'; // Import the SignUpPage component

import LocationsSummary from './locationmanager/LocationsSummary';
import AdminProfile from './admin/Adminlprofile';

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



        {/* Scheduler Routes */}
        <Route path="/tours" element={<Schedulerlayout><Tour /></Schedulerlayout>} />
        <Route path="/agency" element={<Schedulerlayout><Travelagency /></Schedulerlayout>} />
        <Route path="/packagedetails" element={<Schedulerlayout><PackageDetails/></Schedulerlayout>} />
        <Route path="/Sellersignup" element={<Schedulerlayout><Sellersignup/></Schedulerlayout>} />
        

        <Route path="/agency" element={<UserLayout><Travelagency /></UserLayout>} />
        <Route path="/packagedetails" element={<UserLayout><PackageDetails/></UserLayout>} />


        <Route path="/tours" element={<UserLayout><Tour /></UserLayout>} />
        <Route path="/agency" element={<UserLayout><Travelagency /></UserLayout>} />
        <Route path="/packagedetails" element={<UserLayout><PackageDetails/></UserLayout>}/>
        <Route path="/sellersignup" element={<UserLayout><sellersignup /></UserLayout>}/>
        <Route path="/Schedulerdashboard" element={<UserLayout><SchedulerDashboard /></UserLayout>}/>
        <Route path="/Sellersprofile" element={<UserLayout><SellersProfile /></UserLayout>}/>
        <Route path="/Editpackage" element={<UserLayout><EditPackage /></UserLayout>}/>
        <Route path="/sellersignup" element={<UserLayout><SellerSignup /></UserLayout>}/>


        <Route path="/agency" element={<UserLayout><Travelagency /></UserLayout>} />
        <Route path="/guideHome" element={<UserLayout><AgentGHome /></UserLayout>} />
        <Route path="/packages" element={<UserLayout><Packages /></UserLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminLayout><AdminHome /></AdminLayout>} />
        <Route path="/scheduler/home" element={<AdminLayout><SchedulerHome /></AdminLayout>} />

        {/* Role-based Routes */}
       
        <Route path="/travelagent/home" element={<AdminLayout><AgentHome /></AdminLayout>} />

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
        <Route path="/Admin/profile" element={<AdminProfile />} />

        {/* Scheduler Layout Route */}
        <Route path="/scheduler/home" element={<Schedulerlayout><SchedulerHome /></Schedulerlayout>} />
      </Routes>
    </Router>
  );
}

export default App;
