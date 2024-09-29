import React, { useState } from "react";
import axios from "axios";

export default function HotelOwnerRegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^\d{10,15}$/.test(phone); // Example validation for phone number

  const register = async () => {
    if (!name || !email || !password || !cpassword || !phone) {
      setMessage("All fields are required!");
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email!");
      return;
    }

    if (password !== cpassword) {
      setMessage("Passwords do not match!");
      return;
    }

    if (!isValidPhone(phone)) {
      setMessage("Please enter a valid phone number!");
      return;
    }

    const hotelOwner = { name, email, password, phone };

    try {
      setLoading(true); // Start loading
      setMessage("Registering...");
      
      // Update this URL to include the port number
      await axios.post("http://localhost:8081/api/hotelOwners/register", hotelOwner);
      
      setMessage("Hotel Owner Registered Successfully!");

      setTimeout(() => {
        setName("");
        setEmail("");
        setPassword("");
        setCPassword("");
        setPhone("");
        setMessage("");
      }, 2000);
    } catch (error) {
      const errMsg = error.response?.data?.message || "Registration failed. Please try again.";
      setMessage(errMsg);
      console.error("Error during registration:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="register">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Register as Hotel Owner
          </h2>

          {message && <div className="alert alert-info">{message}</div>}

          <div>
            <input
              required
              type="text"
              placeholder="Name"
              className="form-control mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="form-control mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control mt-1"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control mt-1"
              value={cpassword}
              required
              onChange={(e) => setCPassword(e.target.value)}
            />
            <input
              required
              type="tel"
              placeholder="Phone Number"
              className="form-control mt-1"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={register}
              className="btn btn-primary rounded-pill mt-3 mb-3"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Registering..." : "REGISTER"}
            </button>
            <br />
            <a style={{ color: "black" }} href="/login-hotel-owner">
              Click Here To Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
