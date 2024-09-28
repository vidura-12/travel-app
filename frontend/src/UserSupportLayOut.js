import React from 'react';
import Header from './admin/usersupportHeader';
import Footer from './com/footer';

const UserSupportLayOut = ({ children }) => (
  <div>
    <Header />
    {children}

  </div>
);

export default UserSupportLayOut;