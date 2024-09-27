import React from 'react'; 
import Header from './travelagent/guideHeader'

//import Footer from './travelagent/footer';

const TourGuideLayout = ({ children }) => (
  <div>
    <Header />
    {children}
    
  </div>
);

export default TourGuideLayout;
