import React from 'react';
import Header from '../com/header';
import Footer from '../com/footer';

const VehicleRentalLayout = ({ children }) => (
    <div>
        <Header />
        {children}

    </div>
);

export default VehicleRentalLayout;