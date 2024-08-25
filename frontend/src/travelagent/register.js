import React, { useState } from 'react';
import './post.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
 

export default function Register() {

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      address: '',
      number: '',
      experience: '',
      language: '' ,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const guideSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:8081/TourGuide/add', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(formData)
        setFormData({
          name: '',
          email: '',
          address: '',
          number: '',
          experience: '',
          language: '' ,
        });
      } 
      catch (error) {
        console.error('Error submitting the form', error);
      }
       
    };

  return (
    <div> 
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
    ><div className="form-container">
    <h2>Register Tour Guide </h2>

    <form onSubmit={guideSubmit}>
              <div className=" ">
                <label htmlFor="name">Tour Guide Name</label>
                <input
                  type="text"
                  className=""
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className=" ">
                <label htmlFor="email">Tour Guide Email</label>
                <input
                  type="email"
                  className=""
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="">
              <label htmlFor="address">Tour Guide Address</label>
                <input
                  type="text"
                  className=""
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                /> 
              </div>
              <div className="">
              <label htmlFor="number">Tour Guide Number</label>
                <input
                  type="text"
                  className=""
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                /> 
              </div>
              <div className=" ">
              <label htmlFor="experience">Tour Guide Experience</label>
                <input
                  type="text"
                  className=""
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                /> 
              </div>
              <div className=" ">
              <label htmlFor="language">Tour Guide Language</label>
                <input
                  type="text"
                  className=""
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                /> 
              </div>

              <Link to="/travelagent/booktourist">   
             <button style={{ backgroundColor: "#1E201E" }} className='button' type='submit' >
            Register
          </button>
          </Link>

           
       
            </form>
        </div>
        </div>
    </div>
  );
}
