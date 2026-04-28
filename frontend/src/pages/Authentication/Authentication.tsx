import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { postRequest } from '../../utils/fetch';

/**
 * This component renders all information related to the 'login' Page
 */

function Authentication() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e: React.SubmitEvent) => {
    /**
     * Function use to submit the registration form data to the backend.
     */
    e.preventDefault();

    // Submit credentials to backend
    const body = {email: email, password: password};
    console.log('BODY: ', body)
    const response = await postRequest('http://localhost:3000/account/login', body, null);


    if (response.ok){
      // TODO: Frontend Validation?
      navigate("/home");

    } else if (response.status === 409) {
      // TODO: parse error message and create alert
      console.error(`Confirm email and password were typed correctly`)

    } else {
      console.error('ERROR: Failed to sign in');
    }
  }


  return (
    <div className="container">

      <h3 className="text-center mt-5 mb-3">Sign In</h3>
      <form className="d-flex flex-column align-items-center"
        onSubmit={login}>

        {/* Email Field */}
        <div className="form-group w-50 mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control mt-1"
            placeholder="e.g. example@email.com"
            onChange={((e) => setEmail(e.target.value))}
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
            onChange={((e) => setPassword(e.target.value))}
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

      </form>

    </div>
  )
}

export default Authentication