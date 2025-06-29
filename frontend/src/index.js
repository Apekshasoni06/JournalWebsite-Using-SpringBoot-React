import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

// Set the document title for the journal app
document.title = "JournalApp - Your Personal Writing Space"

// Add favicon and meta description for better branding
const favicon = document.querySelector("link[rel*='icon']") || document.createElement("link")
favicon.type = "image/x-icon"
favicon.rel = "shortcut icon"
document.getElementsByTagName("head")[0].appendChild(favicon)

// Add meta description
const metaDescription = document.createElement("meta")
metaDescription.name = "description"
metaDescription.content =
  "JournalApp - A beautiful and secure personal journaling application to capture your thoughts and memories."
document.getElementsByTagName("head")[0].appendChild(metaDescription)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
