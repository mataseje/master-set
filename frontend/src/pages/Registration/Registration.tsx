import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postRequest } from '../../utils/fetch';


function Registration() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async (e: React.SubmitEvent) => {
    /**
     * Function use to submit the registration form data to the backend.
     */
    e.preventDefault();

    // Submit credentials to backend
    const body = {email: email, password: password};
    console.log('BODY: ', body)
    const response = await postRequest('http://localhost:3000/account/register', body, null);


    if (response.ok){
      // TODO: Create success alert
      // TODO: Validation?
      navigate("/account/login");

    } else if (response.status === 409) {
      // TODO: parse error message and create alert
      console.error(`Email ${email} already exists.`)

    } else {
      console.error('ERROR: Failed to register');
    }
  }

  return (
    <div className="container">

      <h3 className="text-center mt-5 mb-3">Create Account</h3>
      <form className="d-flex flex-column align-items-center"
            onSubmit={register}
      >
        {/* Email Address */}
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
            required 
          />

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

      </form>
    </div>
  )
}

export default Registration