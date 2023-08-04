import { NavLink, useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import { LuDog } from "react-icons/lu";

function Nav() {
  const { logout } = useToken();
  const { token } = useAuthContext();
  const { fetchWithCookie } = useToken();
  const [rehomerId, setRehomerId] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(null);

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

  const goHome = () => {
    navigate("/", { replace: false });
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleLoginClick = () => {
    setShowModal(true);
    console.log(showModal);
  };

  useEffect(() => {
    console.log("It is being changed by child component");
  }, [showModal]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary"
      style={{ borderRadius: "0px" }}
    >
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
                  <button
                    type="button"
                    className="btn"
                    onClick={handleLoginClick}
                    style={{ color: "white" }}
                  >
                    Login!
                  </button>
                  {showModal && (
                    <LoginModal
                      showModal={showModal}
                      setShowModal={setShowModal}
                      onHide={() => setShowModal(false)}
                    />
                  )}
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
                    onClick={() => {
                      logout();
                      goHome();
                    }}
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
