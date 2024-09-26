import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Layouts
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import TravelAgentLayout from './TravelAgentLayout';
import LocationLayout from './LocationLayout';

import UserSupportLayOut from './UserSupportLayOut';
import Supportdash from './usersupporter/dashboard'
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Profile from './components/Auth/Profile';

import Home from './com/home';
import Location from './com/location';
import Hotel from './com/hotel';
import Feed from './com/feedback';

import FeedbackList from './com/feedRite';
import FeedbackForm from './com/feedbackForm';
import Review from './com/review';
import allFeedBack from './com/allFeedBack';

import Tour from './com/tours';
import Newlocation from './com/newLocation';
import Travelagency from './com/agency';
import Packages from './com/packages';

import AdminHome from './admin/home';
import AdminLogin from './admin/AdminLogin';

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
import Navbar from './components/Layout/Navbar';
import ChecklistOverview from './components/checklist/ChecklistOverview';
import CreateChecklist from './components/checklist/CreateChecklist';
import ChecklistItems from './components/checklist/ChecklistItems';
import DeleteChecklistModal from './components/checklist/DeleteChecklistModal';

// Location Manager Components
import Location_Home from './locationmanager/home';
import UserSupportHome from './com/UserSupportHome'; // New component
import Chatbox from './com/Chatbox';
import FAQ from './com/FAQ';
import ContactUs from './com/ContactUs';

import LocationsSummary from './locationmanager/LocationsSummary';
import AdminProfile from './admin/Adminlprofile';

import FeedRitrive from './usersupporter/feedbackRetrive';
import FeedDash from './usersupporter/dashboard';

// Correct import for AdminChatDashboard
import AdminChatDashboard from './usersupporter/AdminChatDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserLayout><Profile /></UserLayout>} />
        
        {/* User Routes */}
        <Route path="/home" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/location" element={<UserLayout><Location /></UserLayout>} />
        <Route path="/hotel" element={<UserLayout><Hotel /></UserLayout>} />
        <Route path="/feed" element={<UserLayout><Feed /></UserLayout>} />
        <Route path="/tours" element={<UserLayout><Tour /></UserLayout>} />
        <Route path="/review" element={<UserLayout><Review /></UserLayout>} />
        <Route path="/feedRite" element={<UserLayout><FeedbackList /></UserLayout>} />
        <Route path="/feedbackForm" element={<UserLayout><FeedbackForm /></UserLayout>} />
        <Route path="/allFeedBack" element={<UserLayout><allFeedBack /></UserLayout>} />
        <Route path="/Chatbox" element={<UserLayout><Chatbox /></UserLayout>} />
        <Route path="/FAQ" element={<UserLayout><FAQ /></UserLayout>} />
        <Route path="/ContactUs" element={<UserLayout><ContactUs /></UserLayout>} />
        <Route path="/newLocation" element={<UserLayout><Newlocation /></UserLayout>} />
        <Route path="/agency" element={<UserLayout><Travelagency /></UserLayout>} />
        <Route path="/guideHome" element={<UserLayout><AgentGHome /></UserLayout>} />
        
        {/* User Support Home Route */}
        <Route path="/UserSupportHome" element={<UserLayout><UserSupportHome /></UserLayout>} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminLayout><AdminHome /></AdminLayout>} />
        
        {/* Role-based Routes */}
        <Route path="/travelagent/home" element={<AdminLayout><AgentHome /></AdminLayout>} />
        <Route path="/location/home" element={<LocationLayout><Location_Home /></LocationLayout>} />
        
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
        
        <Route path='/usersupporter/feedbackRetrive' element={<UserSupportLayOut><FeedRitrive /></UserSupportLayOut>} />
        <Route path= '/usersupporter/dashboard' element={<UserSupportLayOut><FeedDash /></UserSupportLayOut>} />
        
        <Route path="/checklists" element={<ChecklistOverview />} />
        <Route path="/checklists/create" element={<CreateChecklist />} />
        <Route path="/checklists/:id/items" element={<ChecklistItems />} /> 
        <Route path="/checklists/delete/:id" element={<DeleteChecklistModal />} />

        {/* New Admin Chat Dashboard Route */}
        <Route path="/admin/chat-dashboard" element={<AdminLayout><AdminChatDashboard /></AdminLayout>} />
        <Route path="/admin/dash" element={<AdminLayout><FeedDash /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
