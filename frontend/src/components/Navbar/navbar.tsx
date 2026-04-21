import { useState } from 'react'
import { Link } from 'react-router-dom'

function navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link to="/" className='navbar-brand'>C</Link>
          <button className="navbar-toggler" 
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#navbarSupportedContent" 
                  aria-controls="navbarSupportedContent" 
                  aria-expanded="false" 
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* TODO: Add 'active' status */}
              <li className="nav-item">
                <Link to="/browse" className="nav-link">Browse</Link>
              </li>
              {/* TODO: Add 'active' status */}
              <li className="nav-item">
                <Link to="/search" className="nav-link">Search</Link>
              </li>
              {/* TODO: Only show if signed in */}
            </ul>

            { isLoggedIn ? (
              <>
                {/* TODO */}
                Logged In
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    </li>
                </ul>
              </>
            ):(
              // Not Logged In - Show Authentication Options
              <>
                <ul className="navbar-nav mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/account/login" className="nav-link">Sign In</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/account/register" className="nav-link">Register</Link>
                  </li>
                </ul>
              </>
            )}

          </div>
        </div>
      </nav>
    </>


  )
}

export default navbar