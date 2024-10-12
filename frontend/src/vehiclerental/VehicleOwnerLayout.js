import React from "react";
import Header from "./VehicleOwnerHeader";

const VehicleOwnerLayout = ({ children }) => (
    <div>
        <Header />
        {children}
    </div>
);

export default VehicleOwnerLayout;