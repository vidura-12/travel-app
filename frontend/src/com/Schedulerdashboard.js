import React from 'react'
import './Schedulerdashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';


const Schedulerdashboard = () => {
    const navigate = useNavigate();  // Hook to navigate between routes
    const location = useLocation(); 
    const packageData = location.state?.package;

    const handleTravelPackageClick = () => {
        navigate('/packagedetails'); // Change this path as needed
      };
  
   
  return (
    <div className='dashside'>
        <div className='dashinput'>
        <button className='dash-btn1 '>Profile</button>
        <button className='dash-btn2' onClick={handleTravelPackageClick}>Travel Package</button>
        <button className='dash-btn3'>Seller details</button>
        <button className='dash-btn4'>Report</button>
        <button className='dash-btn5'>Setting</button>  

        </div>
        

        

      
    </div>
  )
}

export default Schedulerdashboard
