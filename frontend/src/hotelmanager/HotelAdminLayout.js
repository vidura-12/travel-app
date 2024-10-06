import React from "react";
import Header from '../admin/hotelAdminHeader';

const HotelAdminLayout = ({ children }) => (
    <div>
        <Header />
        {children}
    </div>
);

export default HotelAdminLayout;