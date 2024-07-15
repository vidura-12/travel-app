import React, { useState } from 'react';
import './tour.css';

import { Col, Form, FormGroup } from "reactstrap"; 


const Tours = () => {

    return (
        <div>
            <div className="tourpic">
                <h1>Our Tours</h1>
            </div>
            <div className="search">
            
            <div className="search_bar">
                <Form className="d-flex align-items-center gap-4">
                    <FormGroup className="d-flex gap-3 form_group">
                        <span>
                            <i className="ri-map-pin-line"></i>
                        </span>
                        <div>
                            <h6>Location</h6>
                            <input type="text" placeholder="Where are you going?" />
                        </div>
                    </FormGroup>
                    <FormGroup className="d-flex gap-3 form_group">
                        <span>
                            <i className="ri-hotel-line"></i>
                        </span>
                        <div>
                            <h6>Hotel</h6>
                            <input type="text" placeholder="What is the hotel?"  />
                        </div>
                    </FormGroup>
                    <FormGroup className="d-flex gap-3 form_group">
                        <span>
                            <i className="ri-group-line"></i>
                        </span>
                        <div>
                            <h6>Max People</h6>
                            <input type="number" placeholder="0" />
                        </div>
                    </FormGroup>
                    <span className="search-icon" >
                        <i className="ri-search-line"></i>
                    </span>
                </Form>
            </div>
       
            </div>
         
        </div>
    );
}

export default Tours;
