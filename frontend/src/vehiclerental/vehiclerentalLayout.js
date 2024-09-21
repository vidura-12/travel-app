import React from 'react';
import Header from './Header';
import Footer from '../com/footer';

const VehicleRentalLayout = ({ children }) => (
    <div>
        <Header />
        {children}
        <Footer />
    </div>
);

export default VehicleRentalLayout;