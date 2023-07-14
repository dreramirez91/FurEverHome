import { NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useState, useEffect } from "react";

function Nav() {
  const { logout } = useToken();
  const { token } = useAuthContext();
  const { fetchWithCookie } = useToken();
  const [rehomerId, setRehomerId] = useState(null);

  let loggedIn = null;
  if (token) {
    loggedIn = true;
  } else {
    loggedIn = false;
  }

  const fetchData = async () => {
    try {
      const response = fetchWithCookie(
        `${process.env.REACT_APP_API_HOST}/token`
      );
      const data = await response;
      const id = data.account.id;
      setRehomerId(id);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
        <div className="navbar-collapse">
          <ul className="navbar-nav mb-2 mb-lg-0 nav-fill w-100">
            <div>
              <NavLink className="btn" style={{ color: "white" }} to="/dogs">
                Available Dogs
              </NavLink>
              {!loggedIn && (
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
                <>
                  <NavLink
                    className="btn"
                    style={{ color: "white" }}
                    to={`/dogs/${rehomerId}/mydogs`}
                  >
                    My Dogs
                  </NavLink>
                  <NavLink
                    className="btn"
                    style={{ color: "white" }}
                    to={`/dogs/${rehomerId}/create`}
                  >
                    Add a Dog
                  </NavLink>
                  <button
                    onClick={logout}
                    className="btn"
                    style={{ color: "white" }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
