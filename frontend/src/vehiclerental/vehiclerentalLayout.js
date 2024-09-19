import React from 'react';
import Header from './Header';

const VehicleRentalLayout = ({ children }) => (
    <div>
        <Header />
        {children}
    </div>
    );

export default VehicleRentalLayout;