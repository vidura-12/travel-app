import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventOrganizerProfile = () => {
  const navigate = useNavigate();

  const organizerProfile = {
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890',
    eventsManaged: 15,
  };

  const handleManageEventsClick = () => {
    // Navigate to the ManageEvents component
    navigate('/EventManager/EventList');
  };

  const handleEditProfileClick = () => {
    // Navigate to the EditProfile component
    navigate('/edit-profile');
  };

  return (
    <div className='profile'>
      <style>
        {`
          .profile{
            background-image: url('/img/profile4.jpg'); /* Path to your background image */
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            min-height: 100vh;
            padding: 120px;
          }

          .profile-container {
            background-color: #f2f2f2;
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            max-width: 600px;
            margin: 20px auto;
            margin-top: 200px;
          }

          .profile-header {
            text-align: center;
            margin-bottom: 20px;
          }

          .profile-header h2 {
            color: #333;
            margin: 10px 150px;
            aligin:center;
          }

          .profile-info {
            margin-bottom: 20px;
          }

          .profile-info p {
            color: #555;
            margin: 5px 0;
          }

          .profile-actions {
            text-align: center;
          }

          .btn {
            padding: 10px 15px;
            margin: 5px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .btn-manage-events {
            background-color: #3498db;
            color: white;
          }

          .btn-manage-events:hover {
            background-color: #2980b9;
          }

          .btn-edit-profile {
            background-color: #2ecc71;
            color: white;
          }

          .btn-edit-profile:hover {
            background-color: #27ae60;
          }
        `}
      </style>

      <div className="profile-container">
        <div className="profile-header">
          <center><h2>{organizerProfile.name}</h2></center>
          <p>{organizerProfile.location}</p>
        </div>

        <div className="profile-info">
        <p>age: {organizerProfile.age}</p>
          <p>Email: {organizerProfile.email}</p>
          <p>Phone: {organizerProfile.phoneNumber}</p>
          
          <p>Events Managed: {organizerProfile.eventsManaged}</p>
        </div>

        <div className="profile-actions">
          <button
            className="btn btn-manage-events"
            onClick={handleManageEventsClick}
          >
            Manage Events
          </button>
          {/* <button
            className="btn btn-edit-profile"
            onClick={handleEditProfileClick}
          >
            Edit Profile
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default EventOrganizerProfile;
