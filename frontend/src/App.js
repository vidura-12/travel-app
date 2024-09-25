import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Layouts
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import TravelAgentLayout from './TravelAgentLayout';
import LocationLayout from './LocationLayout';
<<<<<<< HEAD
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Profile from './components/Auth/Profile';
=======


>>>>>>> uthara
// Import Components
import Home from './com/home';
import Location from './com/location';
import Hotel from './com/hotel';
import Feed from './com/feedback';
import Newlocation from './com/newLocation';
import Packagedetails from './com/packagedetails';



import SchedulerDashboard from './com/Schedulerdashboard';
import SellersProfile from './com/Sellersprofile';
import EditPackage from './com/Editpackage';
import LoginPage from './com/LoginPage';
import SignUpPage from './com/SignUpPage';

// Admin Components
import AdminHome from './admin/home';
import AdminLogin from './admin/AdminLogin';
import AdminProfile from './admin/Adminlprofile';

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
import LocationsSummary from './locationmanager/LocationsSummary';

// Scheduler Components
import Tour from './scheduler/tours';
import SchedulerLayout from './schedulerlayout';
import Travelagency from './scheduler/agency';
import SellerSignup from './scheduler/sellersignup';


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
        <Route path="/newLocation" element={<UserLayout><Newlocation /></UserLayout>} />
        <Route path="/packagedetails" element={<UserLayout><Packagedetails /></UserLayout>} />
        
        
       
        <Route path="/Schedulerdashboard" element={<UserLayout><SchedulerDashboard /></UserLayout>} />
        <Route path="/Sellersprofile" element={<UserLayout><SellersProfile /></UserLayout>} />
        <Route path="/Editpackage" element={<UserLayout><EditPackage /></UserLayout>} />
        <Route path="/guideHome" element={<UserLayout><AgentGHome /></UserLayout>} />
       

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminLayout><AdminHome /></AdminLayout>} />
        <Route path="/Admin/profile" element={<AdminLayout><AdminProfile /></AdminLayout>} />

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

<<<<<<< HEAD
        <Route path="/checklists" element={<ChecklistOverview />} />
        <Route path="/checklists/create" element={<CreateChecklist />} />
        <Route path="/checklists/:id/items" element={<ChecklistItems />} /> 
        <Route path="/checklists/delete/:id" element={<DeleteChecklistModal />} />
=======
        {/* Scheduler Layout Routes */}
        <Route path="/tours" element={<SchedulerLayout><Tour /></SchedulerLayout>} />
        <Route path="/agency" element={<SchedulerLayout><Travelagency /></SchedulerLayout>} />
        <Route path="/sellersignup" element={<SchedulerLayout><SellerSignup /></SchedulerLayout>} />
>>>>>>> uthara
       
      </Routes>
    </Router>
  );
}

export default App;
