import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { FaStar } from 'react-icons/fa';

const Review = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
    setPercentage((ratingValue / 5) * 100);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    alert('Review submitted');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/img/sl26.jpg")', // Add your background image here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: '500px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '10px',
        }}
      >
        <h2 className="text-center mb-4">Leave a Review</h2>

        {/* Star Rating Section */}
        <div className="d-flex justify-content-center mb-3">
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
                  size={30}
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

        {/* Submit Button */}
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary w-100"
            onClick={handleSubmit}
            disabled={submitted}
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
  );
};

export default Review;
