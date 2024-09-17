import React from 'react';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome</h2>
        <div className="profile-image">
          <img src="https://via.placeholder.com/100" alt="Profile" />
        </div>
        <form>
          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <div className="forgot-password">
            <a href="#">Forgot your password?</a>
          </div>
          <button type="submit" className="login-btn">LOGIN</button>
          <div className="signup-link">
            <span>Don’t have an account?</span> <a href="#">SIGN UP</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
