import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Layouts
import UserLayout from './UserLayout';
import AdminLayout from './AdminLayout';

import EventLayout from './EventLayout';

import TravelAgentLayout from './TravelAgentLayout';
import LocationLayout from './LocationLayout';
import VehicleRentalLayout from './vehiclerental/vehiclerentalLayout';

import UserSupportLayOut from './UserSupportLayOut';


import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Profile from './components/Auth/Profile';

import Home from './com/home';
import Location from './com/location';
import Hotel from './com/hotel';
import Feed from './com/feedback';

<<<<<<< HEAD
// Vehicle Rental Components
import VehicleRentalHome from './vehiclerental/VehicleRentalHome';
import VehicleOwnerPage from './vehiclerental/VehicleOwner'
import VehicleOwnerLogin from './vehiclerental/VehicleOwnerLogin';
import VehicleOwnerRegister from './vehiclerental/VehicleOwnerRegister';
import Mybookings from './vehiclerental/MyBookings';
import VehicleBook from './vehiclerental/VehicelBook';

// Vehicle Rental Manager Components

// Admin Components
=======


import SchedulerDashboard from './com/Schedulerdashboard';

import FeedbackList from './com/feedRite';
import FeedbackForm from './com/feedbackForm';
import Review from './com/review';
import allFeedBack from './com/allFeedBack';


import Newlocation from './com/newLocation';


>>>>>>> Final
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
import AgentRegister from './com/register';
import AgentProfile from './com/profileGuide';
import AgentUpProfile from './travelagent/upProfile';

import AgentLog from './travelagent/login'
import AgentView from './travelagent/viewBooking';
import AgentApprove from './travelagent/approveDeny';
import  AgentGuide from './com/guide'; 
import  AgentAll from './com/allGuides'; 
import  AgentBookGuide from './com/bookGuide';

import AgentSucc from './travelagent/succ';




 //Event Manager Components
import AddEvent from './EventManager/addEvent'
import EventList from './EventManager/EventList';
import EventView from './com/eventView';
import EditEvent from './EventManager/updateEvent';
import UserTicketForm from './com/ticket';
import TicketReport from './EventManager/report';
import AdminEventApproval from './EventManager/Admin';



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

// Scheduler Components

import SchedulerLayout from './schedulerlayout';
import Travelagency from './scheduler/agency';
import SellerSignup from './scheduler/sellersignup';
import SellersProfile from './scheduler/Sellersprofile';
import EditPackage from './scheduler/Editpackage';
import Packagedetails from './scheduler/packagedetails';
import Scheduladmin from './scheduler/scheduladmin';
import Tour from './scheduler/tours'



import FeedRitrive from './usersupporter/feedbackRetrive';
import FeedDash from './usersupporter/dashboard';




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
<<<<<<< HEAD
        <Route path="/tours" element={<UserLayout><Tour /></UserLayout>} />
        <Route path="/newLocation" element={<UserLayout><Newlocation /></UserLayout>} />
        <Route path="/agency" element={<UserLayout><Travelagency /></UserLayout>} />
        <Route path="/guideHome" element={<UserLayout><AgentGHome /></UserLayout>} />
        <Route path="/packages" element={<UserLayout><Packages /></UserLayout>} />
        
       
=======
>>>>>>> Final


        <Route path="/newLocation" element={<UserLayout><Newlocation /></UserLayout>} />

        <Route path="/agency" element={<UserLayout><Travelagency /></UserLayout>} /> 
        
        <Route path="/guide" element={<UserLayout><AgentGuide /></UserLayout>} />
        <Route path="/allGuides" element={<UserLayout><AgentAll /></UserLayout>} />  
        <Route path="/bookGuide" element={<UserLayout><AgentBookGuide /></UserLayout>} />

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
        


        
        {/* User Support Home Route */}
        {/* <Route path="/com/UserSupportHome" element={<UserLayout><UserSupportHome /></UserLayout>} /> */}
        <Route path="/UserSupportHome" element={<UserLayout><UserSupportHome /></UserLayout>} />


        
        <Route path="/register" element={<UserLayout><AgentRegister /></UserLayout>} />
        <Route path="/profileGuide" element={<UserLayout><AgentProfile /></UserLayout>} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminLayout><AdminHome /></AdminLayout>} />

        <Route path="/Admin/profile" element={<AdminLayout><AdminProfile /></AdminLayout>} />

        {/* Role-based Routes */}

        <Route path="/travelagent/home" element={<AdminLayout><AgentHome /></AdminLayout>} />
        <Route path="/location/home" element={<LocationLayout><Location_Home /></LocationLayout>} />


        {/* Travel Agent Routes */}
        <Route path="/travelagent/home" element={<TravelAgentLayout><AgentHome /></TravelAgentLayout>} />
        <Route path="/travelagent/dashboard" element={<TravelAgentLayout><AgentDashboard /></TravelAgentLayout>} />
        <Route path="/travelagent/contact" element={<TravelAgentLayout><AgentContact /></TravelAgentLayout>} />
        <Route path="/travelagent/about" element={<TravelAgentLayout><AgentAbout /></TravelAgentLayout>} />

        <Route path="/travelagent/createpost" element={<TravelAgentLayout><AgentCreatePost/></TravelAgentLayout>} />
        <Route path="/travelagent/booktourist" element={<TravelAgentLayout><AgentBookTourist/></TravelAgentLayout>} />
         <Route path="/travelagent/upProfile" element={<TravelAgentLayout><AgentUpProfile/></TravelAgentLayout>} />
        <Route path="/travelagent/succ" element={<TravelAgentLayout><AgentSucc/></TravelAgentLayout>} />
        <Route path="/travelagent/login" element={<TravelAgentLayout><AgentLog/></TravelAgentLayout>} />
        <Route path="/travelagent/viewBooking" element={<TravelAgentLayout><AgentView/></TravelAgentLayout>} />
        <Route path="/travelagent/approveDeny" element={<TravelAgentLayout><AgentApprove/></TravelAgentLayout>} />

        <Route path="/travelagent/createpost" element={<TravelAgentLayout><AgentCreatePost /></TravelAgentLayout>} />
        <Route path="/travelagent/booktourist" element={<TravelAgentLayout><AgentBookTourist /></TravelAgentLayout>} />
        <Route path="/travelagent/register" element={<TravelAgentLayout><AgentRegister /></TravelAgentLayout>} />
        <Route path="/travelagent/profile" element={<TravelAgentLayout><AgentProfile /></TravelAgentLayout>} />
        <Route path="/travelagent/upProfile" element={<TravelAgentLayout><AgentUpProfile /></TravelAgentLayout>} />
        <Route path="/travelagent/succ" element={<TravelAgentLayout><AgentSucc /></TravelAgentLayout>} />


        {/* Location Manager Routes */}
        <Route path="/LocationAdmin/home" element={<LocationLayout><Location_Home /></LocationLayout>} />

        {/* Event manager */}
        <Route path="/EventManager/addEvent" element={<EventLayout><AddEvent/></EventLayout>} />
        <Route path="/EventManager/EventList" element={<EventLayout><EventList/></EventLayout>} />
        <Route path="/EventManager/updateEvent/:id" element={<EventLayout><EditEvent/></EventLayout>} />
        <Route path="/EventManager/report" element={<EventLayout><TicketReport/></EventLayout>} />
        <Route path="/eventView" element={<UserLayout><EventView/></UserLayout>} /> 
        <Route path="/ticket/:id" element={<UserLayout><UserTicketForm/></UserLayout>} />
        <Route path="/EventManager/Admin" element={<EventLayout><AdminEventApproval/></EventLayout>} />


     

     
        


        <Route path="/LocationAdmin/LocationsSummary" element={<LocationLayout><LocationsSummary /></LocationLayout>} />


        {/* Scheduler Layout Routes */}
        <Route path="/tours" element={<SchedulerLayout><Tour /></SchedulerLayout>} />
        <Route path="/agency" element={<SchedulerLayout><Travelagency /></SchedulerLayout>} />
        <Route path="/sellersignup" element={<SchedulerLayout><SellerSignup /></SchedulerLayout>} />
        <Route path="/Sellersprofile" element={<SchedulerLayout><SellersProfile /></SchedulerLayout>} />
        <Route path="/packagedetails" element={<SchedulerLayout><Packagedetails /></SchedulerLayout>} />
        <Route path="/scheduladmin" element={<SchedulerLayout><Scheduladmin /></SchedulerLayout>} />

        <Route path="/Admin/profile" element={<AdminProfile />} />



        {/* Scheduler Layout Route */}
<<<<<<< HEAD
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

        
=======

        <Route path='/usersupporter/feedbackRetrive' element={<UserSupportLayOut><FeedRitrive /></UserSupportLayOut>} />
        <Route path= '/usersupporter/dashboard' element={<UserSupportLayOut><FeedDash /></UserSupportLayOut>} />

        <Route path="/checklists" element={<ChecklistOverview />} />
        <Route path="/checklists/create" element={<CreateChecklist />} />
        <Route path="/checklists/:id/items" element={<ChecklistItems />} /> 
        <Route path="/checklists/delete/:id" element={<DeleteChecklistModal />} />

       
>>>>>>> Final
      </Routes>
    </Router>
  );
}

export default App;
