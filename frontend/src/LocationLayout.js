import React from 'react';
import Header from './locationmanager/header'
const LocationLayout = ({ children }) => (
  <div>
 <Header/>
    {children}
  </div>
);

export default LocationLayout;
