import React from "react";
import Header from '../admin/hotelAdminHeader';

const VehicleAdminLayout = ({ children }) => (
    <div>
        <Header />
        {children}
    </div>
);

export default VehicleAdminLayout;