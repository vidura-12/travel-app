import { Link } from 'react-router-dom';
import React from 'react';
import './st.css';

export default function Home() {
  return (
    <div>
      <h1 className='text-3xl text-red-500'>Hellooo</h1>

      <div>
        <Link to="/travelagent/booktourist">
          <button style={{ backgroundColor: "#1E201E" }} className='button'>
            View Booking Tourist
          </button>
        </Link>

        <Link to="/travelagent/register">
          <button style={{ backgroundColor: "#1E201E" }} className='button'>
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
