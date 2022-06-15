import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const history = useHistory()
  return (
    <nav className="navbar">
      <Link className="nav-item" to="/posts">Home</Link>
      <Link className="nav-item" to="/messages">Inbox</Link>
      {
        localStorage.getItem("auth_token") !== null ?
          <button className="nav-item" onClick={() => {
            localStorage.removeItem("auth_token")
            history.push({ pathname: "/" })
          }}>
            Logout
          </button>
          :
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
      }
    </nav>
  )
}
