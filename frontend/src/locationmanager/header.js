import React from 'react';
import { Link } from 'react-router-dom';

const header = ()=>{
    return (
    <ul class="nav nav-underline">
    <li class="nav-item">
      <a class="nav-link active" aria-current="page" href="/Location/home">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Link</a>
    </li>
    
    
    </ul>)

}

export default header;