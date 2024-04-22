import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";

interface INavbarProps {
  user: null | IUser;
  setUser: Function;
}

function Navbar({ user, setUser }: INavbarProps) {

  const navigate = useNavigate()

    function logOut() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

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
              {!user && (
                <Link to="/signup" className="navbar-item">
                  Sign Up
                </Link>
              )}
              {!user && (
                <Link to="/login" className="navbar-item">
                  Log In
                </Link>
              )}
              {user && (
                <Link to="/add-group" className="navbar-item">
                  Add Your Group
                </Link>
              )}
              {user && (user.username !== "adminuser") && (
                <Link to="/account" className="navbar-item">
                  Your Account
                </Link>
              )}
              {user && (
                <button
                  onClick={() => logOut()}
                  className="button navbar-item is-ghost"
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
