import React from 'react'
import { Link } from 'react-router-dom'

/**
 * This component renders all information related to the 'login' Page
 */

function Authentication() {
  return (
    <div className="container">

      <h3 className="text-center mt-5 mb-3">Sign In</h3>
      <div className="d-flex flex-column align-items-center">

        {/* Email Field */}
        <div className="form-group w-50 mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control mt-1"
            placeholder="e.g. example@email.com"
            required
          />
        </div>

        {/* Password */}
        <div className="form-group w-50">
          <label>Password</label>
          <input
            type="password"
            name="pass"
            id="password"
            className="form-control mt-1"
            placeholder="Enter password"
            required
          /> </div><br />

        {/* Forgot Pass */}
        <div className="w-100 mb-1"></div>
        <div className="w-50 ms-1">
          <Link to="/reset-password" 
            className="passreset-link"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <div className='mt-5'>
          <button className="btn btn-primary">Login</button>
        </div>

      </div>
    </div>
  )
}

export default Authentication