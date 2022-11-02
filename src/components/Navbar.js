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
        <Button size="large">Home</Button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/patients">
            <Button size="large">Patients</Button>
          </Link>
          <Link to="/appointments">
            <Button size="large">Appointments</Button>
          </Link>
          <Button size="large" onClick={logOutUser}>Logout</Button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <Button size="large">SignUp</Button>
          </Link>
          <Link to="/login">
            <Button size="large">Login</Button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
