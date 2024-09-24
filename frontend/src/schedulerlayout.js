import React from 'react'
import'./schedulerlayout.css'

const schedulerlayout = ({ children }) => (
  <div>
    <div>
    <nav class="navbar navbar-expand">
  <div class="container-fluid">
    <a class="navbar" >Travel</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="#">Profile</a>
        <a class="nav-link active" aria-current="page" href="#">User packages</a>
        <a class="nav-link active" aria-current="page" href="#">Travel agents packages</a>
        
      </div>
    </div>
  </div>
</nav>
<div className="title">
  <h1><center>Welcome to</center> <br/> Scheduler's Admin Dashboard</h1>
</div>
    </div>
    {children}
  </div>
);

export default schedulerlayout;






