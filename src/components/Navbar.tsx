// TO-DO: Logout button and different views depending on whether you're logged in or not

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <header>
        <nav className="navbar is-success">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                Home
              </Link>
              <Link to="/groups" className="navbar-item">
                All Groups
              </Link>
              <Link to="/signup" className="navbar-item">
                Sign Up
              </Link>
              <Link to="/login" className="navbar-item">
                Log In
              </Link>
              <Link to="/add-group" className="navbar-item">
                Add Your Group
              </Link>
              <Link to="/account" className="navbar-item">
                Your Account
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar
