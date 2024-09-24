import React from 'react';
import Header from './admin/header'
const LocationLayout = ({ children }) => (
  <div>
 <Header/>
    {children}
  </div>
);

export default LocationLayout;
