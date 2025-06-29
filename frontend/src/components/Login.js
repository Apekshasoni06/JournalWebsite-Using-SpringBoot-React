"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./login.css"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/find-user`, {
        userName: username,
        password: password,
      })
      const authToken = btoa(`${username}:${password}`)
      localStorage.setItem("authToken", authToken)
      // Storing user details in localStorage
      const { userName } = response.data
      localStorage.setItem("userId", response.data.id)
      localStorage.setItem("user", JSON.stringify(userName))

      // Redirecting to dashboard
      navigate("/JournalPage")
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Invalid username or password")
      } else {
        setError("Login failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = () => {
    navigate("/SignUp")
  }

  return (
    <div className="login-container">
      {/* Background decorative elements */}
      <div className="login-background-decoration">
        <div className="login-circle login-circle-1"></div>
        <div className="login-circle login-circle-2"></div>
        <div className="login-circle login-circle-3"></div>
        <div className="login-circle login-circle-4"></div>
      </div>

      {/* Notebook lines */}
      <div className="login-notebook-lines">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="login-line"></div>
        ))}
      </div>

      <div className="login-box">
        <div className="login-header">
          <div className="login-journal-icon">📖</div>
          <h1 className="login-journal-title">My Journal</h1>
          <p className="login-journal-subtitle">Welcome back to your thoughts</p>
        </div>

        <div className="login-content">
          <h2>Sign In</h2>
          {error && <div className="error-message">{error}</div>}

          {/* Loading overlay */}
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-content">
                <div className="journal-loader">
                  <div className="book-loader">
                    <div className="book-page page-1"></div>
                    <div className="book-page page-2"></div>
                    <div className="book-page page-3"></div>
                  </div>
                  <div className="loading-text">Opening your journal...</div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                placeholder="Enter your username"
                disabled={isLoading}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                disabled={isLoading}
                required
              />
            </div>
            <button type="submit" className={`submit-button ${isLoading ? "loading" : ""}`} disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="button-loader"></span>
                  Signing In...
                </>
              ) : (
                "Sign In to Journal"
              )}
            </button>
          </form>
          <div className="login-signup-section">
            <p>
              Don't have an account?{" "}
              <span
                className={`create-account ${isLoading ? "disabled" : ""}`}
                onClick={!isLoading ? handleSignUp : undefined}
              >
                Start Your Journal
              </span>
            </p>
          </div>
        </div>

        <div className="login-decorative-border"></div>
      </div>

      {/* Floating elements */}
      <div className="login-floating-element login-floating-1">✒️</div>
      <div className="login-floating-element login-floating-2">📝</div>
    </div>
  )
}

export default Login
