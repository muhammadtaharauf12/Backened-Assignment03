import React from 'react'
import { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/v1/signup",
        formData
      );

     

      toast.success("🎉 Account created successfully!");

    

      setFormData({
        firstName: "",
        fullName: "",
        email: "",
        password: "",
      });

        setTimeout(() => {
        navigate("/login");
      }, 2000);

      

    } catch (err) {
      console.error(err);
      toast.error("❌ Signup Failed!", {
        position: "top-center",
      });
    }
  };



  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>
        <p>Sign up to get started</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup