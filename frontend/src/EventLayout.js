import React from 'react';
import Header2 from './EventManager/header';

//import Footer from './travelagent/footer';

const EventLayout = ({ children }) => (
    <div>
      <Header2 />
      {children}
      
    </div>
  );
  
  export default EventLayout;