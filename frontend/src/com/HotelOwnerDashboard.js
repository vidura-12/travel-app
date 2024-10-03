import React from "react";
import { Tabs, Spin } from "antd"; // Import Spin
import HotelOwnerProfile from "./HotelOwnerProfile";
import AddHotel from "./AddHotel";
import ApprovedHotels from "./ApprovedHotels";

function HotelOwnerDashboard({ loading }) { // Pass loading as a prop
    const items = [
        {
            label: 'My Profile',
            key: '1',
            children: <HotelOwnerProfile />,
        },
        {
            label: 'My Hotels',
            key: '2',
            children: <ApprovedHotels />,
        },
        {
            label: 'Add New Hotel',
            key: '3',
            children: <AddHotel />,
        },
        {
            label: 'Bookings',
            key: '4',
            children: <h1>Bookings</h1>, // You can add booking-related data here
        },
    ];

    return (
        <div className="mt-3 ml-3 mr-3 bs" style={{ padding: '20px' }}>
            <h1 className="text-center">
                <b>Hotel Owner Dashboard</b>
            </h1>
            {loading ? ( // Show Spin if loading is true
                <Spin tip="Loading..." />
            ) : (
                <Tabs defaultActiveKey="1" items={items} />
            )}
        </div>
    );
}

export default HotelOwnerDashboard;
