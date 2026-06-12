import { AuthContext } from '../../context/AuthContext';
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getRequest } from '../../utils/fetch';

function navbar() {

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    /**
     * Perform the required functions to logout the user
     * 
     * 1) Retrieve local access token from AuthContext
     * 2) Delete refresh token from backend database
     * 3) Delete local access token
     * 4) Redirect user
     */
    const token = auth?.token;
    if (!token) {
      console.error('No access token found');
      return;
    }
    // Delete refresh token in database
    const logout_res = await getRequest('/auth/logout', token);
    
    if (logout_res.ok){
        // Delete local access token
        auth.logout(); 
        // Redirect user to login screen
        navigate('/account/login')
    } else {
        console.error('Failed to request backend logout')
    }
    console.log('test')

  }

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

            {/* Check Login Status */}
            { auth?.token ? (
              <>
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                      {/* TODO: Implement Dashboard? */}
                      {/* <Link to="/dashboard" className="nav-link">Dashboard</Link> */}
                      <button className='btn btn-secondary' onClick={logout}>Logout</button>
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