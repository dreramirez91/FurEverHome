import { NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function Nav() {
  const { logout } = useToken();
  const { token } = useAuthContext();
  let loggedIn = null;
  if (token) {
    loggedIn = true;
  } else {
    loggedIn = false;
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
        <div className="navbar-collapse">
          <ul className="navbar-nav mb-2 mb-lg-0 nav-fill w-100">
            <div>
              {loggedIn || (
                <>
                  <NavLink
                    className="btn"
                    style={{ color: "white" }}
                    to="/signup"
                  >
                    Sign up!
                  </NavLink>
                  <NavLink
                    className="btn"
                    style={{ color: "white" }}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </>
              )}
              {loggedIn && (
                <button
                  onClick={logout}
                  className="btn"
                  style={{ color: "white" }}
                >
                  Logout
                </button>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
