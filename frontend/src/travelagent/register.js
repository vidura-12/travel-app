import React from 'react';
import './post.css';
import axios from "axios";

export default function Register() {
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
    <form>
      <div>
        <label name="name">Travel Guide's Name :</label>
        <input type="text" id="name" name="name" placeholder='Name of Travel Agent' />
      </div>
      <div>
        <label name="email">Travel Guide's Email :</label>
        <input type="email" id="email" name="email" placeholder='Email' />
      </div>
      <div>
        <label name="address"> Office Address :</label>
        <input type="text" id="address" name="address" placeholder='Office Address' />
      </div>
      <div>
        <label name="contact"> Contact Number :</label>
        <input type="tel" id="contact" name="contact" placeholder='Contact Number'/>
      </div>
      <div>
        <label name="experience">Experience Years :</label>
        <input type="text" id="experience" name="experience" placeholder='Experience Years' />
      </div>
         
      <div>
        <label name="Languages-Spoken">Languages Spoken :</label>
        <input type="text" id="Languages-Spoken" name="Languages-Spoken" placeholder='Languages Spoken' />
      </div>
       
        
      <button type="submit">Register</button>
    </form>
  </div></div>  
    </div>
  );
} 