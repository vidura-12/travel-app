import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { FaStar } from 'react-icons/fa';
import axios from 'axios'; // Import axios for API calls

const Review = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [error, setError] = useState(''); // State for error message
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [totalReviews, setTotalReviews] = useState(25); // State to track the total number of reviews

  // Dummy data for current rating
  const dummyAverageRating = 4.3; // Static average rating data

  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
    setPercentage((ratingValue / 5) * 100);
    setError(''); // Clear error message when rating is selected
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setError('Please select a rating before submitting.'); // Set error if no rating
      return; // Stop further execution
    }

    try {
      // Submit review to backend (mock API for now)
      const response = await axios.post('http://localhost:8081/reviews/add', {
        rating,
        percentage,
      });

      if (response.status === 200) {
        setSubmitted(true);
        setError(''); // Clear error message if submission is successful
        setShowModal(true); // Show the modal popup
        setTotalReviews(prevCount => prevCount + 1); // Increment the review count
      }
    } catch (err) {
      // Handle errors
      setError('Error submitting review. Please try again later.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal after clicking OK
    setSubmitted(false); // Reset submitted to allow for further submissions
    setRating(0); // Reset rating
    setPercentage(0); // Reset percentage
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/img/sl58.jpg")', // Add your background image here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        className="d-flex flex-column align-items-center" // Use flex column for vertical stacking
        style={{ width: '100%', maxWidth: '600px' }} // Increased max width
      >
        {/* Current Rating Box */}
        <div
          className="card shadow-lg p-5 mb-4" // Increased padding for larger box
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '10px',
            width: '100%', // Full width for the card
          }}
        >
          <h4 className="text-center mb-3" style={{ fontSize: '1.5rem' }}>Current Rating</h4> {/* Increased font size */}
          <div className="d-flex justify-content-center mb-3">
            {[...Array(5)].map((star, index) => (
              <FaStar
                key={index}
                size={40} // Increased star size
                className="mx-1"
                color={index + 1 <= Math.round(dummyAverageRating) ? '#ffc107' : '#e4e5e9'}
              />
            ))}
          </div>
          <p className="text-center" style={{ fontSize: '1.2rem' }}>{dummyAverageRating} out of 5 (based on {totalReviews} reviews)</p> {/* Increased font size */}
        </div>

        {/* Leave a Review Section */}
        <div
          className="card shadow-lg p-5"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '10px',
            width: '100%', // Full width for the card
          }}
        >
          <h2 className="text-center mb-4" style={{ fontSize: '1.8rem' }}>Leave a Review</h2> {/* Increased font size */}

          {/* Star Rating Section */}
          <div className="d-flex justify-content-center mb-4">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;

              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    style={{ display: 'none' }}
                    onClick={() => handleRatingClick(ratingValue)}
                  />
                  <FaStar
                    size={40} // Increased star size
                    className="mx-1"
                    color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                    style={{ cursor: 'pointer' }}
                  />
                </label>
              );
            })}
          </div>

          {/* Display Rating Percentage */}
          <div className="text-center mb-3">
            {rating > 0 && <p>You rated: {percentage}%</p>}
          </div>

          {/* Error Message */}
          {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}

          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary w-100"
              onClick={handleSubmit}
              style={{ fontSize: '1.2rem' }} // Increased button font size
            >
              {submitted ? 'Review Submitted' : 'Submit Review'}
            </button>
          </div>

          {/* Submission Confirmation */}
          {submitted && (
            <div className="alert alert-success mt-3 text-center" role="alert">
              Thank you for your review!
            </div>
          )}
        </div>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Review Submitted</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Your review has been submitted successfully!</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCloseModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
