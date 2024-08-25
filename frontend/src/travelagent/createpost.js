import React from 'react';
import './post.css';

export default function CreatePost() {
  return (
    <div className="form-container">
      <h2>Create Post</h2>
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
        
         
        <label className = "Languages-Spoken">Languages Spoken :</label>
        
           
          <div className="checkbox-group">
            <input type="checkbox" id="english" name="language" />
            <label htmlFor="english">English</label>
            <input type="checkbox" id="tamil" name="language" />
            <label htmlFor="tamil">Tamil</label>
            <input type="checkbox" id="sinhala" name="language" />
            <label htmlFor="sinhala">Sinhala</label>
             
          </div>
         
          
        <button type="submit">Add Guide Agent</button>
      </form>
    </div>
  );
}