import React from 'react'; 
import Header from './admin/guideHeader'

//import Footer from './travelagent/footer';

const TavelAgentLayout = ({ children }) => (
  <div>
    <Header />
    {children}
    
  </div>
);

export default TavelAgentLayout;
