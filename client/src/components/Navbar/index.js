import React from 'react'
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Navbar = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };

    return (
        <div>
            {Auth.loggedIn() ? (
            <>
              <span>Hey there, {Auth.getUser().data.username}!</span>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
    )
}

export default Navbar
