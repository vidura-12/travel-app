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
import HotelLayout from './HotelLayout';
import HotelComp from './HotelComp';
import AddRating from './com/AddRating'
import ChecklistForm from './components/Check/ChecklistForm';
import ChecklistDisplay from './components/Check/ChecklistDisplay';
import ChecklistItem from './components/Check/ChecklistItem';
import AdminReport from './EventManager/AdminReporte';
import EventManagerProfile from './EventManager/EventOProfile';


import Home from './com/home';
import Location from './com/location';
import Hotels from './com/hotels';
import Feed from './com/feedback';
import EventLayout from'./EventLayout';


import SchedulerDashboard from './com/Schedulerdashboard';

import FeedbackList from './com/feedRite';
import FeedbackForm from './com/feedbackForm';
import Review from './com/review';
import allFeedBack from './com/allFeedBack';


import Newlocation from './com/newLocation';

import Viewl from'./components/Check/Viewl'
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
import AgentLog from './com/guideLog';
import AgentTouristBooked from './travelagent/touristBooked';
 
import AgentReport from './travelagent/Guidereport';

import AgentAll from './com/allGuides';
import AgentBGuide from './com/bookGuide';
import AgentGuide from './com/guide';
import AgentproGuide from './com/profileGuide';
import AgentRegister from './com/GuideRegister';


// Location Manager Components
import Location_Home from './locationmanager/home';

// Hotel Owner Components

import HotelOwnerDashboard from './com/HotelOwnerDashboard'; // Import the hotel owner dashboard component  
import HotelOwnerRegister from './com/HotelOwnerRegister'; // Adjust the path as necessary
import HotelOwnerLogin from './com/HotelOwnerLogin'; // Adjust the path as necessary

// hotel manager components

import HotelManagerDashboard from './hotelmanager/HotelAdminDashboard'; // Import the hotel manager dashboard component
import HotelAdminLayout from './hotelmanager/HotelAdminLayout'; // Import the hotel manager layout component



import UserSupportHome from './com/UserSupportHome'; // New component
import FAQ from './com/FAQ';
import FAQChatApp from './com/FAQChatApp'; // New FAQ and chatbox component
import ContactUs from './com/ContactUs';
 
import Sellerlayout from'./sellerlayout'; 
import LocationsSummary from './locationmanager/LocationsSummary';

// Scheduler Components
import Tour from './scheduler/tours';
import SchedulerLayout from './schedulerlayout';
import Travelagency from './scheduler/agency';
import SellerSignup from './scheduler/sellersignup';
import SellersProfile from './scheduler/Sellersprofile';
import Packagedetails from './scheduler/packagedetails';
import Scheduladmin from './scheduler/scheduladmin';
import SellerRegister from './scheduler/Sellerregister';
import SellerSignIn from './scheduler/sellersignin';
import EditRegister from './scheduler/editregister';
import EditPackage from './scheduler/Editpackage';
import Approveseller from './scheduler/approvedPackages';
import SellerProfile from './scheduler/Sellerprofile';


 

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
import Rating from './usersupporter/AdminRating';
import AgentRegSucc from './com/regSuccess';

// Vehicle Rental Components
import VehicleRentalHome from './vehiclerental/VehicleRentalHome';
import VehicleOwnerPage from './vehiclerental/VehicleOwner'
import VehicleOwnerLogin from './vehiclerental/VehicleOwnerLogin';
import VehicleOwnerRegister from './vehiclerental/VehicleOwnerRegister';
import Mybookings from './vehiclerental/MyBookings';
import VehicleBook from './vehiclerental/VehicelBook';
import VehicleOwnerProfile from './vehiclerental/VehicleOwnerProfile';
import NewVehicle from './vehiclerental/NewVehicle';

// Vehicle Rental Manager Components
import VehicleAdminDashboard from './vehiclerentalManager/VehicleAdminDashboard';
import VehicleRentalLayout from './vehiclerental/vehiclerentalLayout';
import VehicleOwnerLayout from './vehiclerental/VehicleOwnerLayout';
import VehicleAdminLayout from './vehiclerentalManager/VehiceAdminLayout';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/usersupporter/AdminRating' element={<UserSupportLayOut><Rating/></UserSupportLayOut>} />
        <Route path='/usersupporter/feedbackRetrive' element={<UserSupportLayOut><FeedRitrive /></UserSupportLayOut>} />
        <Route path= '/usersupporter/dashboard' element={<UserSupportLayOut><FeedDash /></UserSupportLayOut>} />
        <Route path="/admin/dash" element={<AdminLayout><FeedDash /></AdminLayout>} />
        <Route path="/UserSupportHome" element={<UserLayout><UserSupportHome /></UserLayout>} />
        <Route path="/review" element={<UserLayout><Review /></UserLayout>} />
        <Route path="/feedRite" element={<UserLayout><FeedbackList /></UserLayout>} />
        <Route path="/feedbackForm" element={<UserLayout><FeedbackForm /></UserLayout>} />
        <Route path="/allFeedBack" element={<UserLayout><allFeedBack /></UserLayout>} />
        <Route path="/FAQ" element={<UserLayout><FAQ /></UserLayout>} />
        <Route path="/AFAQ" element={<UserLayout><FAQChatApp /></UserLayout>} />
        <Route path="/ContactUs" element={<UserLayout><ContactUs /></UserLayout>} />
        <Route path="/AddRating" element={<UserLayout><AddRating /></UserLayout>} />
        <Route path="/regSuccess" element={<UserLayout><AgentRegSucc /></UserLayout>} />
        <Route path="/home" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/location" element={<UserLayout><Location /></UserLayout>} />
        <Route path="/hotels" element={<UserLayout><Hotels /></UserLayout>} />

        <Route path="/feed" element={<UserLayout><Feed /></UserLayout>} />

        <Route path="/newLocation" element={<UserLayout><Newlocation /></UserLayout>} />

        <Route path="/allGuides" element={<UserLayout><AgentAll /></UserLayout>} />
        <Route path="/bookGuide" element={<UserLayout><AgentBGuide /></UserLayout>} />
        <Route path="/guide" element={<UserLayout><AgentGuide /></UserLayout>} />
        <Route path="/guideRegister" element={<UserLayout><AgentRegister /></UserLayout>} /> 
 
        <Route path="/guideLog" element={<UserLayout><AgentLog /></UserLayout>} /> 
        <Route path="/profileGuide/:id" element={<AgentproGuide />} /> 

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
      
        

        <Route path="/review" element={<UserLayout><Review /></UserLayout>} />
        <Route path="/feedRite" element={<UserLayout><FeedbackList /></UserLayout>} />
        <Route path="/feedbackForm" element={<UserLayout><FeedbackForm /></UserLayout>} />
        <Route path="/allFeedBack" element={<UserLayout><allFeedBack /></UserLayout>} />
        <Route path="/FAQ" element={<UserLayout><FAQ /></UserLayout>} />
        <Route path="/ContactUs" element={<UserLayout><ContactUs /></UserLayout>} />

        <Route path="/newLocation" element={<UserLayout><Newlocation /></UserLayout>} />
      
        
        {/* User Support Home Route */}
        {/* <Route path="/com/UserSupportHome" element={<UserLayout><UserSupportHome /></UserLayout>} /> */}
        <Route path="/UserSupportHome" element={<UserLayout><UserSupportHome /></UserLayout>} />


        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminLayout><AdminHome /></AdminLayout>} />

        <Route path="/Admin/profile" element={<AdminLayout><AdminProfile /></AdminLayout>} />

        {/* Role-based Routes */}

       

        {/* Travel Agent Routes */}
         <Route path="/travelagent/dashboard" element={<TravelAgentLayout><AgentDashboard /></TravelAgentLayout>} />
         <Route path="/travelagent/booktourist" element={<TravelAgentLayout><AgentBooked /></TravelAgentLayout>} />
         <Route path="/travelagent/approveDeny" element={<TravelAgentLayout><AgentApproveDeny /></TravelAgentLayout>} />
         <Route path="/travelagent/dashGuide" element={<TourGuideLayout><AgentGuideDash /></TourGuideLayout>} />
         <Route path="/travelagent/touristBooked" element={<TourGuideLayout><AgentTouristBooked /></TourGuideLayout>} />
 
         <Route path="/travelagent/guideHeader" element={<TourGuideLayout><AgentGuideHeader /></TourGuideLayout>} />
         <Route path="/profileGuide" element={<TourGuideLayout><AgentproGuide /></TourGuideLayout>} /> 
         <Route path="/travelagent/Guidereport" element={<TravelAgentLayout><AgentReport /></TravelAgentLayout>} />
 
         
         {/* Route for hotel owner*/}
        
          <Route path="/hotelowner/dashboard" element={<HotelComp><HotelOwnerDashboard/></HotelComp>} />
          <Route path="/hotelowner/register" element={<UserLayout><HotelOwnerRegister /></UserLayout>} />
          <Route path="/hotelowner/login" element={<UserLayout><HotelOwnerLogin /></UserLayout>} />

        {/* Location Manager Routes */}
        <Route path="/LocationAdmin/home" element={<LocationLayout><Location_Home /></LocationLayout>} />
        <Route path="/LocationAdmin/LocationsSummary" element={<LocationLayout><LocationsSummary /></LocationLayout>} />

        {/* Hotel Manager Routes */}
        <Route path="/hotelmanager/dashboard" element={<HotelAdminLayout><HotelManagerDashboard /></HotelAdminLayout>} />


        {/* Scheduler Layout Routes */}
        <Route path="/tours" element={<UserLayout><Tour /></UserLayout>} />
        <Route path="/viewLocation" element={<UserLayout><Viewl /></UserLayout>} />
        <Route path="/agency" element={<Sellerlayout><Travelagency /></Sellerlayout>} />
        <Route path="/sellersignup" element={<UserLayout><SellerSignup /></UserLayout>} />
        <Route path="/Sellersprofile" element={<Sellerlayout><SellersProfile /></Sellerlayout>} />
        <Route path="/packagedetails" element={<SchedulerLayout><Packagedetails /></SchedulerLayout>} />
        <Route path="/scheduladmin" element={<SchedulerLayout><Scheduladmin /></SchedulerLayout>} />
        <Route path="/scheduler/Sellersregister" element={<SchedulerLayout><SellerRegister /></SchedulerLayout>} />
        <Route path="/scheduler/sellersignin" element={<UserLayout><SellerSignIn /></UserLayout>} />
        <Route path="/scheduler/editregister" element={<UserLayout><EditRegister /></UserLayout>} />
        <Route path="/scheduler/Editpackage" element={<UserLayout><EditPackage /></UserLayout>} />
        <Route path="/scheduler/approveseller" element={<Sellerlayout><Approveseller/></Sellerlayout>} />
        <Route path="/scheduler/Sellerprofile" element={<Sellerlayout><SellerProfile/></Sellerlayout>} />
       
       
        <Route path="/Admin/profile" element={<AdminProfile />} />
        <Route path="/scheduler/approveseller" element={<Sellerlayout><Approveseller/></Sellerlayout>} />

        <Route path='/usersupporter/feedbackRetrive' element={<UserSupportLayOut><FeedRitrive /></UserSupportLayOut>} />
        <Route path= '/usersupporter/dashboard' element={<UserSupportLayOut><FeedDash /></UserSupportLayOut>} /> 
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserLayout><Profile /></UserLayout>} />
     
        <Route path="/create-checklist" element={<UserLayout><ChecklistForm /></UserLayout>} />
        <Route path="/checklists" element={<UserLayout><ChecklistDisplay /></UserLayout>}  />
        <Route path="/checklists/:checklistId/:checklistTitle" element={<UserLayout><ChecklistItem /></UserLayout>}  />
        <Route path="/booking" element={<UserLayout><ChecklistItem /></UserLayout>}  />
        
        {/* Vehicle Rental Routes */}

        <Route path="/VehicleRentalHome" element={<UserLayout><VehicleRentalHome /></UserLayout>} />
        <Route path="/vehicle-owner-dashboard" element={<VehicleOwnerLayout><VehicleOwnerPage /></VehicleOwnerLayout>} />
        <Route path="/vehicle-owner/login" element={<VehicleRentalLayout><VehicleOwnerLogin /></VehicleRentalLayout>} />
        <Route path="/vehicle-owner/register" element={<VehicleOwnerRegister />} />
        <Route path="/vehicle-owner/mybookings" element={<VehicleOwnerLayout><Mybookings /></VehicleOwnerLayout>} />
        <Route path="/vehiclebook/:vehicleId" element={<UserLayout><VehicleBook /></UserLayout>} />
        <Route path="/vehicle-owner/profile" element={<VehicleOwnerLayout><VehicleOwnerProfile /></VehicleOwnerLayout>} />
        <Route path="/Vehicle-Owner/Add-Vehicle" element= {<NewVehicle />} />

        {/* Vehicle Rental Manager Routes */}

        <Route path="/vehicle-manager/dashboard" element={<VehicleAdminLayout><VehicleAdminDashboard /></VehicleAdminLayout>} />
        <Route path='/usersupporter/feedbackRetrive' element={<UserSupportLayOut><FeedRitrive /></UserSupportLayOut>} />
        <Route path= '/usersupporter/dashboard' element={<UserSupportLayOut><FeedDash /></UserSupportLayOut>} />
        <Route path="/EventManager/AdminReporte" element={<Adminevent><AdminReport/></Adminevent>} />
        <Route path="/EventManager/EventOProfile" element={<EventLayout><EventManagerProfile/></EventLayout>} />
 
       
      </Routes>
    </Router>
  );
}

export default App;