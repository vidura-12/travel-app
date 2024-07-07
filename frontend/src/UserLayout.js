import React from 'react';
import Header from './com/header';
import Footer from './com/footer';

const UserLayout = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);

export default UserLayout;
