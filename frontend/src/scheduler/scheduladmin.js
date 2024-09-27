import React from 'react';
import { useNavigate } from 'react-router-dom';
import './scheduladmin.css';

const Scheduladmin = () => {
 return (
   <div className='schedulprofile'>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="avatar-image"
            />
          </div>
        </div>

        <div className="profile-info">
          <h2>Welcome Uthara!</h2>
          <p>Southern Province, Matara</p>
          <p>Schedule manager</p>

         
        </div>
      </div>
   </div>
  );
};

export default Scheduladmin;
