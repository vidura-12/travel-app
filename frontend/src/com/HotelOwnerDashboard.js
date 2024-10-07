import React, { useEffect } from "react";
import { Tabs, Spin } from "antd"; // Import Spin
import { useNavigate } from "react-router-dom"; // Import useNavigate
import HotelOwnerProfile from "./HotelOwnerProfile";
import AddHotel from "./AddHotel";
import MyHotels from "./MyHotels";

function HotelOwnerDashboard({ loading }) { 
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        // If no token is found, redirect to the login page
        if (!token) {
            navigate('/hotelowner/login');
        }
    }, [navigate]);

    const items = [
        {
            label: 'My Profile',
            key: '1',
            children: <HotelOwnerProfile />,
        },
        {
            label: 'My Hotels',
            key: '2',
            children: <MyHotels />,
        },
        {
            label: 'Add New Hotel',
            key: '3',
            children: <AddHotel />,
        },
        {
            label: 'Bookings',
            key: '4',
            children: <h1>Bookings</h1>, 
        },
    ];

    return (
        <div className="mt-3 ml-3 mr-3 bs" style={{ padding: '20px' }}>
            <h1 className="text-center">
                <b>Hotel Owner Dashboard</b>
            </h1>
            {loading ? ( 
                <Spin tip="Loading..." />
            ) : (
                <Tabs defaultActiveKey="1" items={items} />
            )}
        </div>
    );
}

export default HotelOwnerDashboard;
