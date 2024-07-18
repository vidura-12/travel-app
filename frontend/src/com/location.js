import React, { useState, useRef } from 'react';
import './style.css';

function Location() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const destinationRef = useRef(null); // Create a ref for the destination section

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8081/Location/search?city=${searchTerm}`);
      const data = await response.json();

      if (response.ok) {
        if (Array.isArray(data) && data.length === 0) {
          setError('No locations found with that name.');
          setResults([]);
        } else {
          setError('');
          setResults(Array.isArray(data) ? data : [data]);

          if (destinationRef.current) {
            destinationRef.current.classList.add('scroll-to-middle');
            destinationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      } else {
        setError(data.error || 'No locations found with that name.');
        setResults([]);
      }
    } catch (error) {
      setError('Error fetching search results.');
      console.error('Error fetching search results:', error);
      setResults([]);
    }
  };

  return (
    <div>
      <section className="home">
        <div className="home-box">
          <div className="content">
            <h1>Ask us about your dream paradise..</h1>
            <div className="search">
              <i className="fa fa-search"></i>
              <input
                type="text"
                placeholder="Your journey begins with a search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </section>

      <section className="destination" ref={destinationRef}>
        <div className="container">
          {results.map((location) => (
            <div key={location._id} className="gallery">
              <div className="box">
                <img src={`img/${location.picture}`} alt={location.name} />
              </div>
              <div className="container-box">
                <h2 className="heading">{location.name} - {location.city}</h2>
                <div className="content">
                  <p>{location.description}</p>
                  <a href="#">Explore more <i className="fa-solid fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section >
        <div >
          <div className="containe">
            <h1 lassName = "titl">Are you a Traveller, Share youer experience with us</h1>
            <a href ="/newLocation"><button  className = "button">Click Here ...</button></a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Location;
