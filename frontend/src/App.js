import React from 'react';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddStudent from './components/addstudent';  
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/add" exact element={<AddStudent />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
