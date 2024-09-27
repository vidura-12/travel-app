import React from 'react';
import Header2 from './travelagent/header';
 

//import Footer from './travelagent/footer';

const TavelAgentLayout = ({ children }) => (
  <div>
    <Header2 />
    {children}
    
  </div>
);

export default TavelAgentLayout;
