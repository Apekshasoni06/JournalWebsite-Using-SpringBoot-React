"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./journalPage.css"

const JournalPage = () => {
  const [entries, setEntries] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [newEntry, setNewEntry] = useState({ title: "", content: "" })
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, entryId: null, entryTitle: "" })
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const navigate = useNavigate()

  // Checking if user is authenticated
  const checkAuthentication = () => {
    const userId = localStorage.getItem("userId")
    const authToken = localStorage.getItem("authToken")
    const user = localStorage.getItem("user")

    // redirecting to login
    if (!userId || !authToken || !user) {
      console.log("Authentication failed: Missing credentials")
      navigate("/", { replace: true })
      return false
    }

    try {
      if (!authToken.includes(":") && authToken.length < 10) {
        throw new Error("Invalid token format")
      }
      return true
    } catch (error) {
      console.log("Authentication failed: Invalid token format")
      // Clearing invalid session data
      localStorage.removeItem("authToken")
      localStorage.removeItem("userId")
      localStorage.removeItem("user")
      navigate("/", { replace: true })
      return false
    }
  }

  const fetchEntries = async () => {
    try {
      const userId = localStorage.getItem("userId")
      const authToken = localStorage.getItem("authToken")

      // Double-check authentication before fetching data
      if (!userId || !authToken) {
        navigate("/", { replace: true })
        return
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/journal`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${authToken}`,
          "Content-Type": "application/json",
        },
      })

      // Checking if response indicates authentication failure
      if (response.status === 401 || response.status === 403) {
        console.log("Authentication failed: Invalid credentials")
        // Clearing session and redirect
        localStorage.removeItem("authToken")
        localStorage.removeItem("userId")
        localStorage.removeItem("user")
        navigate("/", { replace: true })
        return
      }

      const data = await response.json()
      setEntries(data)
      setError(null)
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // 404 - no entries found
      } else if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        // Authentication error
        console.log("Authentication failed during fetch")
        localStorage.removeItem("authToken")
        localStorage.removeItem("userId")
        localStorage.removeItem("user")
        navigate("/", { replace: true })
        return
      } else {
        setError("Failed to fetch journal entries")
      }
    }
  }

  const fetchEntriesById = async (id) => {
    try {
      const authToken = localStorage.getItem("authToken")

      if (!authToken) {
        navigate("/", { replace: true })
        return
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/journal/id/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${authToken}`,
          "Content-Type": "application/json",
        },
      })

      // Checking authentication
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken")
        localStorage.removeItem("userId")
        localStorage.removeItem("user")
        navigate("/", { replace: true })
        return
      }

      const data = await response.json()
      setSelectedEntry(data)
      setIsModalOpen(true)
      setError(null)
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem("authToken")
        localStorage.removeItem("userId")
        localStorage.removeItem("user")
        navigate("/", { replace: true })
        return
      }
      setError("Failed to fetch journal entry")
    }
  }

  // delete confirmation popup
  const showDeleteConfirmation = (id, title) => {
    setDeleteConfirmation({
      isOpen: true,
      entryId: id,
      entryTitle: title,
    })
  }

  // Hiding delete confirmation popup
  const hideDeleteConfirmation = () => {
    setDeleteConfirmation({
      isOpen: false,
      entryId: null,
      entryTitle: "",
    })
  }

  // delete function
  const deleteEntry = async (id) => {
    try {
      const authToken = localStorage.getItem("authToken")

      if (!authToken) {
        navigate("/", { replace: true })
        return
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/journal/id/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      })

      // Checking authentication
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken")
        localStorage.removeItem("userId")
        localStorage.removeItem("user")
        navigate("/", { replace: true })
        return
      }

      if (response.ok) {
        setEntries(entries.filter((entry) => entry.id !== id))
        setIsModalOpen(false)
        setSelectedEntry(null)
        hideDeleteConfirmation()
      } else {
        throw new Error("Failed to delete entry")
      }
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem("authToken")
        localStorage.removeItem("userId")
        localStorage.removeItem("user")
        navigate("/", { replace: true })
        return
      }
      setError("Failed to delete entry")
      hideDeleteConfirmation()
    }
  }

  // Handleing confirmed delete
  const handleConfirmedDelete = () => {
    if (deleteConfirmation.entryId) {
      deleteEntry(deleteConfirmation.entryId)
    }
  }

  const createEntry = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const authToken = localStorage.getItem("authToken")

      if (!authToken) {
        navigate("/", { replace: true })
        return
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/journal`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      })

      // Checking authentication
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken")
        localStorage.removeItem("userId")
        localStorage.removeItem("user")
        navigate("/", { replace: true })
        return
      }

      const data = await response.json()
      setEntries([...entries, data])
      setNewEntry({ title: "", content: "" })
      setError(null)
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem("authToken")
        localStorage.removeItem("userId")
        localStorage.removeItem("user")
        navigate("/", { replace: true })
        return
      }
      setError("Failed to create journal entry")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userId")
    localStorage.removeItem("user")
    navigate("/", { replace: true })
  }

  useEffect(() => {
    const initializePage = async () => {
      setIsCheckingAuth(true)
      const isAuthenticated = checkAuthentication()

      if (isAuthenticated) {
        // If authenticated, fetch entries
        await fetchEntries()
      }

      setIsCheckingAuth(false)
    }

    initializePage()
  }, [])

  // Adding periodic session validation
  useEffect(() => {
    const sessionCheckInterval = setInterval(
      () => {
        const userId = localStorage.getItem("userId")
        const authToken = localStorage.getItem("authToken")
        const user = localStorage.getItem("user")

        if (!userId || !authToken || !user) {
          console.log("Session expired or cleared")
          navigate("/", { replace: true })
        }
      },
      5 * 60 * 1000,
    ) // Checking every 5 minutes

    return () => clearInterval(sessionCheckInterval)
  }, [navigate])

  const loggedInUser = JSON.parse(localStorage.getItem("user")) || "Guest"

  // Showing loading screen while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="journal-auth-loading">
        <div className="journal-auth-loading-content">
          <div className="journal-auth-loader">
            <div className="auth-book-loader">
              <div className="auth-book-page auth-page-1"></div>
              <div className="auth-book-page auth-page-2"></div>
              <div className="auth-book-page auth-page-3"></div>
            </div>
            <div className="journal-auth-loading-text">Checking your session...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="journal-main-container">
      {/* Background decorative elements */}
      <div className="journal-bg-decoration">
        <div className="journal-bg-circle journal-bg-circle-1"></div>
        <div className="journal-bg-circle journal-bg-circle-2"></div>
        <div className="journal-bg-circle journal-bg-circle-3"></div>
      </div>

      {/* Notebook lines background */}
      <div className="journal-bg-lines">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="journal-bg-line"></div>
        ))}
      </div>

      <div className="journal-page-wrapper">
        <div className="journal-main-header">
          <div className="journal-header-left">
            <div className="journal-main-icon">📖</div>
            <h1 className="journal-main-title">My Journal</h1>
            <p className="journal-main-subtitle">Your thoughts, your story</p>
          </div>
          <div className="journal-user-section" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div className="journal-user-avatar">👤</div>
            <span className="journal-username">{loggedInUser}</span>
            <div className="journal-dropdown-arrow">▼</div>
            {isDropdownOpen && (
              <div className="journal-dropdown-menu">
                <button onClick={handleLogout} className="journal-logout-btn">
                  <span className="logout-icon">🚪</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="journal-error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <div className="journal-main-content">
          <div className="journal-entries-section">
            <div className="journal-entries-header">
              <h2 className="journal-entries-title">Your Entries</h2>
              <div className="journal-entries-count">{entries.length} entries</div>
            </div>

            <div className="journal-entries-grid">
              {entries.length === 0 ? (
                <div className="journal-empty-state">
                  <div className="empty-icon">📝</div>
                  <h3>No entries yet</h3>
                  <p>Start writing your first journal entry!</p>
                </div>
              ) : (
                entries.map((entry) => (
                  <div key={entry.id} className="journal-entry-card">
                    <div className="journal-entry-header">
                      <h3 className="journal-entry-title">{entry.title}</h3>
                    </div>
                    <div className="journal-entry-preview">
                      {entry.content?.substring(0, 100)}
                      {entry.content?.length > 100 && "..."}
                    </div>
                    <div className="journal-entry-actions">
                      <button
                        className="journal-action-btn journal-view-btn"
                        onClick={() => fetchEntriesById(entry.id)}
                        title="View Entry"
                      >
                        👁️
                      </button>
                      <button
                        className="journal-action-btn journal-delete-btn"
                        onClick={() => showDeleteConfirmation(entry.id, entry.title)}
                        title="Delete Entry"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="journal-create-section">
            <div className="journal-create-card">
              <div className="journal-create-header">
                <div className="journal-create-icon">✍️</div>
                <h2 className="journal-create-title">New Entry</h2>
              </div>

              <form onSubmit={createEntry} className="journal-create-form">
                <div className="journal-form-group">
                  <label htmlFor="entry-title" className="journal-form-label">
                    Title
                  </label>
                  <input
                    id="entry-title"
                    type="text"
                    placeholder="What's on your mind today?"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                    className="journal-form-input"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="journal-form-group">
                  <label htmlFor="entry-content" className="journal-form-label">
                    Content
                  </label>
                  <textarea
                    id="entry-content"
                    placeholder="Write your thoughts here..."
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                    className="journal-form-textarea"
                    disabled={isLoading}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`journal-create-btn ${isLoading ? "loading" : ""}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="journal-btn-loader"></span>
                      Creating...
                    </>
                  ) : (
                    <>
                      <span className="create-icon">📝</span>
                      Create Entry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Modal for selected entry */}
        {isModalOpen && selectedEntry && (
          <div className="journal-modal-overlay">
            <div className="journal-modal">
              <div className="journal-modal-header">
                <h2 className="journal-modal-title">{selectedEntry.title}</h2>
                <button className="journal-modal-close" onClick={() => setIsModalOpen(false)}>
                  ✕
                </button>
              </div>
              <div className="journal-modal-content">
                <div className="journal-modal-text">{selectedEntry.content}</div>
              </div>
              <div className="journal-modal-actions">
                <button className="journal-modal-btn journal-modal-ok" onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
                <button
                  className="journal-modal-btn journal-modal-delete"
                  onClick={() => showDeleteConfirmation(selectedEntry.id, selectedEntry.title)}
                >
                  Delete Entry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmation.isOpen && (
          <div className="journal-delete-overlay">
            <div className="journal-delete-modal">
              <div className="journal-delete-header">
                <div className="journal-delete-icon">⚠️</div>
                <h2 className="journal-delete-title">Delete Entry?</h2>
              </div>

              <div className="journal-delete-content">
                <p className="journal-delete-message">Are you sure you want to delete this journal entry?</p>
                <div className="journal-delete-entry-info">
                  <strong>"{deleteConfirmation.entryTitle}"</strong>
                </div>
                <p className="journal-delete-warning">
                  This action cannot be undone. Your entry will be permanently removed.
                </p>
              </div>

              <div className="journal-delete-actions">
                <button className="journal-delete-btn-cancel" onClick={hideDeleteConfirmation}>
                  Cancel
                </button>
                <button className="journal-delete-btn-confirm" onClick={handleConfirmedDelete}>
                  <span className="delete-confirm-icon">🗑️</span>
                  Delete Entry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default JournalPage
