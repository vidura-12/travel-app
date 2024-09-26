import React from 'react'; 
import Header from './travelagent/header'

//import Footer from './travelagent/footer';

const TavelAgentLayout = ({ children }) => (
  <div>
    <Header />
    {children}
    
  </div>
);

export default TavelAgentLayout;
