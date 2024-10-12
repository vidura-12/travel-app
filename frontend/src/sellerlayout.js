import React from 'react';
import Header from './admin/sellerhead';


const schedulerLayout = ({ children }) => (
  <div>
    <Header />
    {children}
    
  </div>
);

export default schedulerLayout;