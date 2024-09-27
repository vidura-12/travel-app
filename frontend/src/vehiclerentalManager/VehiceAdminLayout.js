import React from "react";
import Header from '../admin/vehicleHeader';

const VehicleAdminLayout = ({ children }) => (
    <div>
        <Header />
        {children}
    </div>
);

export default VehicleAdminLayout;