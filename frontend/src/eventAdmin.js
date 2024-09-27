import React from 'react';
import Header from './admin/eventHeader';

const EventLayout = ({ children }) => (
    <div>
      <Header />
      {children}
  
    </div>
  );
  
  export default EventLayout;