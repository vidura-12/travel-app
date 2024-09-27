import React from 'react';
import Header from './admin/packHeader';


const schedulerLayout = ({ children }) => (
  <div>
    <Header />
    {children}
    
  </div>
);

export default schedulerLayout;