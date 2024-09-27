import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Layouts
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';
import TravelAgentLayout from './TravelAgentLayout';
import TourGuideLayout from './tourGuideLayOut';
import LocationLayout from './LocationLayout';
import Adminevent from './eventAdmin';
import UserSupportLayOut from './UserSupportLayOut';


import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Profile from './components/Auth/Profile';

import Home from './com/home';
import Location from './com/location';
import Hotel from './com/hotel';
import Feed from './com/feedback';
import EventLayout from'./EventLayout';


import SchedulerDashboard from './com/Schedulerdashboard';

import FeedbackList from './com/feedRite';
import FeedbackForm from './com/feedbackForm';
import Review from './com/review';
import allFeedBack from './com/allFeedBack';


import Newlocation from './com/newLocation';


import AdminHome from './admin/home';
import AdminLogin from './admin/AdminLogin';
import AdminProfile from './admin/Adminlprofile';


// Travel Agent Components   
import AgentDashboard from './travelagent/dashboard'; 
import AgentBookTourist from './travelagent/booktourist'; 
import AgentApproveDeny from './travelagent/approveDeny';
import AgentBooked from './travelagent/booktourist'; 
import AgentGuideDash from './travelagent/dashGuide';
import AgentGuideHeader from './travelagent/guideHeader';
import AgentTouristBooked from './travelagent/touristBooked';

import AgentAll from './com/allGuides';
import AgentBGuide from './com/bookGuide';
import AgentGuide from './com/guide';
import AgentproGuide from './com/profileGuide';
import AgentRegister from './com/GuideRegister'; 

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

// Scheduler Components
import Tour from './scheduler/tours';
import SchedulerLayout from './schedulerlayout';
import Travelagency from './scheduler/agency';
import SellerSignup from './scheduler/sellersignup';
import SellersProfile from './scheduler/Sellersprofile';
import EditPackage from './scheduler/Editpackage';
import Packagedetails from './scheduler/packagedetails';
import Scheduladmin from './scheduler/scheduladmin';
import SellerRegister from './scheduler/Sellerregister';

import SellerSignIn from './scheduler/sellersignin';

import AdminChatDashboard from './usersupporter/AdminChatDashboard';
import AddEvent from './EventManager/addEvent'
import EventList from './EventManager/EventList';
import EventView from './com/eventView';
import EditEvent from './EventManager/updateEvent';
import UserTicketForm from './com/ticket';
import TicketReport from './EventManager/report';
import AdminEventApproval from './EventManager/Admin';
import Dashboard from './EventManager/Dashbord';
import PendingEvent from './EventManager/PendingEvent';
import FeedRitrive from './usersupporter/feedbackRetrive';
import FeedDash from './usersupporter/dashboard';



function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/usersupporter/feedbackRetrive' element={<UserSupportLayOut><FeedRitrive /></UserSupportLayOut>} />
        <Route path= '/usersupporter/dashboard' element={<UserSupportLayOut><FeedDash /></UserSupportLayOut>} />
        <Route path="/admin/chat-dashboard" element={<AdminLayout><AdminChatDashboard /></AdminLayout>} />
        <Route path="/admin/dash" element={<AdminLayout><FeedDash /></AdminLayout>} />
        <Route path="/UserSupportHome" element={<UserLayout><UserSupportHome /></UserLayout>} />
        <Route path="/review" element={<UserLayout><Review /></UserLayout>} />
        <Route path="/feedRite" element={<UserLayout><FeedbackList /></UserLayout>} />
        <Route path="/feedbackForm" element={<UserLayout><FeedbackForm /></UserLayout>} />
        <Route path="/allFeedBack" element={<UserLayout><allFeedBack /></UserLayout>} />
        <Route path="/Chatbox" element={<UserLayout><Chatbox /></UserLayout>} />
        <Route path="/FAQ" element={<UserLayout><FAQ /></UserLayout>} />
        <Route path="/ContactUs" element={<UserLayout><ContactUs /></UserLayout>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserLayout><Profile /></UserLayout>} />
        {/* User Routes */}
        <Route path="/home" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/location" element={<UserLayout><Location /></UserLayout>} />
        <Route path="/hotel" element={<UserLayout><Hotel /></UserLayout>} />
        <Route path="/feed" element={<UserLayout><Feed /></UserLayout>} />

        <Route path="/newLocation" element={<UserLayout><Newlocation /></UserLayout>} />

        <Route path="/allGuides" element={<UserLayout><AgentAll /></UserLayout>} />
        <Route path="/bookGuide" element={<UserLayout><AgentBGuide /></UserLayout>} />
        <Route path="/guide" element={<UserLayout><AgentGuide /></UserLayout>} />
        <Route path="/guideRegister" element={<UserLayout><AgentRegister /></UserLayout>} /> 

        <Route path="/EventManager/addEvent" element={<EventLayout><AddEvent/></EventLayout>} />
        <Route path="/EventManager/EventList" element={<EventLayout><EventList/></EventLayout>} />
        <Route path="/EventManager/updateEvent/:id" element={<EventLayout><EditEvent/></EventLayout>} />
        <Route path="/EventManager/report" element={<EventLayout><TicketReport/></EventLayout>} />
        <Route path="/eventView" element={<UserLayout><EventView/></UserLayout>} /> 
        <Route path="/ticket/:id" element={<UserLayout><UserTicketForm/></UserLayout>} />
        <Route path="/EventManager/Admin" element={<Adminevent><AdminEventApproval/></Adminevent>} />
        <Route path="/EventManager/Dashboard" element={<EventLayout><Dashboard/></EventLayout>} />
        <Route path="/EventManager/PendingEvent" element={<EventLayout><PendingEvent/></EventLayout>} />
        
        
       
        <Route path="/Schedulerdashboard" element={<UserLayout><SchedulerDashboard /></UserLayout>} />
        <Route path="/Sellersprofile" element={<UserLayout><SellersProfile /></UserLayout>} />
        <Route path="/Editpackage" element={<UserLayout><EditPackage /></UserLayout>} />
        

        <Route path="/review" element={<UserLayout><Review /></UserLayout>} />
        <Route path="/feedRite" element={<UserLayout><FeedbackList /></UserLayout>} />
        <Route path="/feedbackForm" element={<UserLayout><FeedbackForm /></UserLayout>} />
        <Route path="/allFeedBack" element={<UserLayout><allFeedBack /></UserLayout>} />
        <Route path="/Chatbox" element={<UserLayout><Chatbox /></UserLayout>} />
        <Route path="/FAQ" element={<UserLayout><FAQ /></UserLayout>} />
        <Route path="/ContactUs" element={<UserLayout><ContactUs /></UserLayout>} />

        <Route path="/newLocation" element={<UserLayout><Newlocation /></UserLayout>} />
        <Route path="/agency" element={<UserLayout><Travelagency /></UserLayout>} />
         
        
        {/* User Support Home Route */}
        {/* <Route path="/com/UserSupportHome" element={<UserLayout><UserSupportHome /></UserLayout>} /> */}
        <Route path="/UserSupportHome" element={<UserLayout><UserSupportHome /></UserLayout>} />


        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminLayout><AdminHome /></AdminLayout>} />

        <Route path="/Admin/profile" element={<AdminLayout><AdminProfile /></AdminLayout>} />

        {/* Role-based Routes */}

         <Route path="/location/home" element={<LocationLayout><Location_Home /></LocationLayout>} />


        {/* Travel Agent Routes */}
         <Route path="/travelagent/dashboard" element={<TravelAgentLayout><AgentDashboard /></TravelAgentLayout>} />
         <Route path="/travelagent/booktourist" element={<TravelAgentLayout><AgentBooked /></TravelAgentLayout>} />
         <Route path="/travelagent/approveDeny" element={<TravelAgentLayout><AgentApproveDeny /></TravelAgentLayout>} />
         <Route path="/travelagent/dashGuide" element={<TourGuideLayout><AgentGuideDash /></TourGuideLayout>} />
         <Route path="/travelagent/touristBooked" element={<TourGuideLayout><AgentTouristBooked /></TourGuideLayout>} />
         <Route path="/travelagent/guideHeader" element={<TourGuideLayout><AgentGuideHeader /></TourGuideLayout>} />
         <Route path="/profileGuide" element={<TourGuideLayout><AgentproGuide /></TourGuideLayout>} /> 
         
         
        {/* Location Manager Routes */}
        <Route path="/LocationAdmin/home" element={<LocationLayout><Location_Home /></LocationLayout>} />
        <Route path="/LocationAdmin/LocationsSummary" element={<LocationLayout><LocationsSummary /></LocationLayout>} />


        {/* Scheduler Layout Routes */}
        <Route path="/tours" element={<UserLayout><Tour /></UserLayout>} />
        <Route path="/agency" element={<SchedulerLayout><Travelagency /></SchedulerLayout>} />
        <Route path="/sellersignup" element={<SchedulerLayout><SellerSignup /></SchedulerLayout>} />
        <Route path="/Sellersprofile" element={<UserLayout><SellersProfile /></UserLayout>} />
        <Route path="/packagedetails" element={<SchedulerLayout><Packagedetails /></SchedulerLayout>} />
        <Route path="/scheduladmin" element={<SchedulerLayout><Scheduladmin /></SchedulerLayout>} />
        <Route path="/scheduler/Sellersregister" element={<UserLayout><SellerRegister /></UserLayout>} />
        <Route path="/scheduler/sellersignin" element={<UserLayout><SellerSignIn /></UserLayout>} />

        <Route path="/Admin/profile" element={<AdminProfile />} />


        <Route path='/usersupporter/feedbackRetrive' element={<UserSupportLayOut><FeedRitrive /></UserSupportLayOut>} />
        <Route path= '/usersupporter/dashboard' element={<UserSupportLayOut><FeedDash /></UserSupportLayOut>} />

        <Route path="/checklists" element={<ChecklistOverview />} />
        <Route path="/checklists/create" element={<CreateChecklist />} />
        <Route path="/checklists/:id/items" element={<ChecklistItems />} /> 
        <Route path="/checklists/delete/:id" element={<DeleteChecklistModal />} />

       
      </Routes>
    </Router>
  );
}

export default App;
