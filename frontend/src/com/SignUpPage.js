import React from 'react';
import './SignUpPage.css';

const SignUpPage = () => {
  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2>SIGN UP</h2>
        <form>
          <div className="input-group">
            <input type="text" placeholder="Name" />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Email" />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Confirm Password" />
          </div>
          <div className="terms-group">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              Creating an account means you agree with our terms of service, privacy policy, and our default notification settings.
            </label>
          </div>
          <button type="submit" className="signup-button">SIGN UP</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
