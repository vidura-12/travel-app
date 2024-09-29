import React from "react";
import { Tabs } from "antd";
import HotelOwnerProfile from "./HotelOwnerProfile";




const { TabPane } = Tabs;

function HotelOwnerDashboard() {
    return (
        <div className="mt-3 ml-3 mr-3 bs">
            <h1 className="text-center">
                <b>Hotel Owner Dashboard</b>
            </h1>
            <Tabs defaultActiveKey="1">
                <TabPane tab="My Profile" key="1">
                    {/* Display the profile data */}
                    <HotelOwnerProfile />
                </TabPane>
                <TabPane tab="My Hotels" key="2">
                    <h1>Hotels</h1>
                    {/* You can add more components or data here */}
                </TabPane>
                <TabPane tab="Add New Hotel" key="3">
                    <h1>Add Hotel</h1>
                    {/* Form to add a new hotel can go here */}
                </TabPane>
                <TabPane tab="Bookings" key="4">
                    <h1>Bookings</h1>
                    {/* You can add booking-related data here */}
                </TabPane>
            </Tabs>
        </div>
    );
}

export default HotelOwnerDashboard;
