import React from 'react';
import Header from './admin/usersupportHeader';

const UserSupportLayOut = ({ children }) => (
  <div>
    <Header />
    {children}
   
  </div>
);

export default UserSupportLayOut;