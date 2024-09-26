import React from 'react';
import Header2 from './EventManager/header';
import Footer from './com/footer'



const EventLayout = ({ children }) => (
    <div>
      <Header2 />
      {children}
      <Footer/>
    </div>
  );
  
  export default EventLayout;