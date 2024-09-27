
import React from 'react';
import './dash.css';


export default function Dash() {
  return (
    <div 
      style={{
        backgroundImage: "url('/img/dash.jpg')",   
        backgroundSize: 'cover',                  
        backgroundPosition: 'center',              
        backgroundRepeat: 'no-repeat',             
        height: '100vh',                          
        width: '100%',                            
        display: 'flex',                           
        alignItems: 'center',                      
        justifyContent: 'center'                  
      }}
    >
      <div>
        <h1 style={{ color: '#1E201E' }}>Dashboard</h1>
        <a href="/travelagent/createpost">
          <button color={"#1E201E" } className='button'>
            Create Post
          </button>
        </a>

        <a href="/travelagent/booktourist">
          <button color={"#1E201E" } className='button'>
            View Booking Tourist
          </button>
        </a>
      </div>
    </div>
  );
}
