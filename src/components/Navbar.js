import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";
import { Button } from "antd";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <Button className="navbar-button" size="large">
          Home
        </Button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/patients">
            <Button className="navbar-button" size="large">
              Patients
            </Button>
          </Link>
          <Link to="/appointments">
            <Button className="navbar-button" size="large">
              Appointments
            </Button>
          </Link>
          <Button className="navbar-button" size="large" onClick={logOutUser}>
            Logout
          </Button>
          <span>Welcome back {user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <Button className="navbar-button" size="large">
              SignUp
            </Button>
          </Link>
          <Link to="/login">
            <Button className="navbar-button" size="large">
              Login
            </Button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
