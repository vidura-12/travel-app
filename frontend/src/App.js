import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './com/header';
import Home from './com/home';
import Footer from './com/footer';
import Location from './com/location';
import Hotel from './com/hotel';
import Feed from './com/feedback';
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
        <Route path="/location" exact element={<Location />} />
          <Route path="/home" exact element={<Home/>} />
          <Route path="/hotel" exact element={<Hotel/>} />
          <Route path="/feed" exact element={<Feed/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
