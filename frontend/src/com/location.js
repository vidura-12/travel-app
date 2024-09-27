import React, { useState, useRef, useEffect } from 'react';
import './style.css';

function Location() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');
  const [likedLocations, setLikedLocations] = useState([]);
  const [visibleComments, setVisibleComments] = useState({});
  const [visibleDescriptions, setVisibleDescriptions] = useState({});
  const destinationRef = useRef(null);

  useEffect(() => {
    const fetchLikedLocations = async () => {
      try {
        const response = await fetch('http://localhost:8081/Location/liked', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setLikedLocations(data);
        } else {
          console.error('Error fetching liked locations:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching liked locations:', error);
      }
    };

    fetchLikedLocations();
  }, []);

const handleSearch = async () => {
  try {
    const response = await fetch(`http://localhost:8081/Location/search?city=${searchTerm}`);
    const data = await response.json();

    console.log(data); // Log the response data

    if (response.ok) {
      if (Array.isArray(data) && data.length === 0) {
        setError('No locations found with that name.');
        setResults([]);
      } else {
        setError('');
        setResults(Array.isArray(data) ? data : [data]);
        setVisibleComments({});
        setVisibleDescriptions({});

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


  const handleLike = async (locationId) => {
    try {
      const response = await fetch(`http://localhost:8081/Location/like/${locationId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setResults((prevResults) =>
          prevResults.map((location) =>
            location._id === locationId ? { ...location, likes: location.likes + 1 } : location
          )
        );
        setLikedLocations((prevLiked) => [...prevLiked, locationId]);
      } else {
        console.error('Error liking the location:', response.statusText);
      }
    } catch (error) {
      console.error('Error liking the location:', error);
    }
  };

  const handleAddComment = async (locationId) => {
    if (newComment.trim() !== '') {
      try {
        const response = await fetch(`http://localhost:8081/Location/comment/${locationId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ text: newComment }),
        });

        if (response.ok) {
          const updatedLocation = await response.json();
          setResults((prevResults) =>
            prevResults.map((location) =>
              location._id === locationId ? updatedLocation : location
            )
          );
          setNewComment('');
        } else {
          console.error('Error adding comment:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleSeeMoreComments = (locationId) => {
    setVisibleComments((prevVisibleComments) => ({
      ...prevVisibleComments,
      [locationId]: (prevVisibleComments[locationId] || 5) + 5,
    }));
  };

  const handleSeeLessComments = (locationId) => {
    setVisibleComments((prevVisibleComments) => ({
      ...prevVisibleComments,
      [locationId]: Math.max((prevVisibleComments[locationId] || 5) - 5, 5),
    }));
  };

  const handleSeeMoreDescription = (locationId) => {
    setVisibleDescriptions((prevVisibleDescriptions) => ({
      ...prevVisibleDescriptions,
      [locationId]: true,
    }));
  };

  const handleSeeLessDescription = (locationId) => {
    setVisibleDescriptions((prevVisibleDescriptions) => ({
      ...prevVisibleDescriptions,
      [locationId]: false,
    }));
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
                  <p>
                    {visibleDescriptions[location._id] 
                      ? location.description 
                      : `${location.description.substring(0, 100)}...`}
                  </p>
                  {location.description.length > 100 && (
                    visibleDescriptions[location._id] ? (
                      <button className="see-less-button" onClick={() => handleSeeLessDescription(location._id)}>
                        See less
                      </button>
                    ) : (
                      <button className="see-more-button" onClick={() => handleSeeMoreDescription(location._id)}>
                        See more
                      </button>
                    )
                  )}
                  <div className="like-section">
                    <button
                      className={`like-button ${likedLocations.includes(location._id) ? 'liked' : ''}`}
                      onClick={() => handleLike(location._id)}
                      disabled={likedLocations.includes(location._id)}
                    >
                      <img src="./img/like.png" alt="Like" />
                    </button>
                    <span className="like-count">{location.likes || 0} Likes</span>
                  </div>
                  <div className="comments-section">
                    <h3>Comments</h3>
                    {location.comments.slice(0, visibleComments[location._id] || 5).map((comment, index) => (
                      <p key={index} className="comment">{comment.text}</p>
                    ))}
                    {location.comments.length > (visibleComments[location._id] || 5) && (
                      <button className="see-more-button" onClick={() => handleSeeMoreComments(location._id)}>
                        See more
                      </button>
                    )}
                    {visibleComments[location._id] > 5 && (
                      <button className="see-less-button" onClick={() => handleSeeLessComments(location._id)}>
                        See less
                      </button>
                    )}
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment"
                      className="comment-input"
                    />
                    <button onClick={() => handleAddComment(location._id)} className="comment-button">
                      Comment
                    </button>
                  </div>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="containe">
          <h1 className="title">Are you a Traveller? Share your experience with us</h1>
          <a href="/newLocation">
            <button className="buttonadd">Click Here ...</button>
          </a>
        </div>
      </section>
    </div>
  );
}

export default Location;