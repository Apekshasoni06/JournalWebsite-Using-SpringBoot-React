"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./signup.css" // Import the CSS file

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [flashMessage, setFlashMessage] = useState("") // State for flash message
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/public/create-user`, {
        userName: username,
        password: password,
      })
      // Set flash message
      setFlashMessage("User created successfully! Please log in.")
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/", { state: { message: "User created successfully! Please log in." } })
      }, 2000) // Redirect after 2 seconds
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("Username already exists. Please choose a different one.")
      } else {
        setError("Failed to create user. Please try again.")
      }
    }
  }

  const handleSignIn = () => {
    navigate("/") // Redirect to login page
  }

  return (
    <div className="signup-container">
      {/* Background decorative elements */}
      <div className="signup-background-decoration">
        <div className="signup-circle signup-circle-1"></div>
        <div className="signup-circle signup-circle-2"></div>
        <div className="signup-circle signup-circle-3"></div>
        <div className="signup-circle signup-circle-4"></div>
      </div>

      {/* Notebook lines */}
      <div className="signup-notebook-lines">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="signup-line"></div>
        ))}
      </div>

      <div className="signup-box">
        <div className="signup-header">
          <div className="signup-journal-icon">📝</div>
          <h1 className="signup-journal-title">Start Your Journal</h1>
          <p className="signup-journal-subtitle">Begin your writing journey today</p>
        </div>

        <div className="signup-content">
          <h2>Sign Up</h2>
          {error && <div className="signup-error-message">{error}</div>}
          {flashMessage && <div className="flash-message">{flashMessage}</div>} {/* Flash message display */}
          <form onSubmit={handleSignUp}>
            <div className="signup-input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="signup-input-field"
                placeholder="Choose your username"
                required
              />
            </div>
            <div className="signup-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signup-input-field"
                placeholder="Create a secure password"
                required
              />
            </div>
            <button type="submit" className="signup-submit-button">
              Create Your Journal
            </button>
          </form>
          <div className="signin-section">
            <p>
              Already have an account?{" "}
              <span className="signin-link" onClick={handleSignIn}>
                Sign In Here
              </span>
            </p>
          </div>
        </div>

        <div className="signup-decorative-border"></div>
      </div>

      {/* Floating elements */}
      <div className="signup-floating-element signup-floating-1">✍️</div>
      <div className="signup-floating-element signup-floating-2">📖</div>
    </div>
  )
}

export default SignUp
