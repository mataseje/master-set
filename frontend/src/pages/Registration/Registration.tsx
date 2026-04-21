import React from 'react'
import { Link } from 'react-router-dom'

function Registration() {
  return (
    <div className="container">

      <h3 className="text-center mt-5 mb-3">Create Account</h3>
      <div className="d-flex flex-column align-items-center">
        
        {/* Email Address */}
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
          />
        </div>

        {/* TOS & Privacy Policy */}
        <div className="form-check">
          <br />
          <input className="form-check-input"
            // onClick={() => setUserAgree(!userAgree)}
            type="checkbox"
            name="user-agreement"
            value="Hello"
            id="tos-checkbox"
            required />

          {/* TOS & Policy Agreement */}
          <label className="form-check-label" htmlFor="tos-checkbox">
            I agree to the <Link to="/terms-of-service" className="link">Terms of Service</Link> 
            &nbsp;and <Link to="/privacy-policy" className="link">Privacy Policy</Link>
          </label>
        </div>

        {/* Submit Button */}
        <div className='mt-5'>
          <button className="btn btn-primary">Register</button>
        </div>

      </div>
    </div>
  )
}

export default Registration