import React from 'react'
import { Link } from "react-router-dom";
export default function LoginSignupButton() {
  return (
    <>
 
    <div className="Login-Signup-Button-container">
    <Link to="/login">
        <div className="Login-Button">LOGIN</div>
    </Link>
    <Link to="/signup">
        <div className="Signup-Button">SIGNUP</div>
    </Link>
        </div>
    </>
  )
}
