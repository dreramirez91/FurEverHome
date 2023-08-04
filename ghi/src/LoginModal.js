import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useEffect } from "react";
// import $ from "jquery";

export default function LoginModal(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const { token } = useAuthContext();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    console.log("HELLO");
    e.preventDefault();
    login(username, password)
      .then(() => {
        setTimeout(() => {
          if (token) {
            setLoginFailed(false);
            // $("#myModal").modal("hide");
            // props.setShowModal(false);
            console.log("Login successful");
            console.log(token);
          } else {
            // setShowModal(true);
            console.log("Login failed");
            setLoginFailed(true);
            // <LoginModal />;
          }
        }, 500);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (token) {
      setLoginFailed(false);
    }
  }, [token]);

  // function close() {
  // loginFailed ? $("#myModal").modal("hide") : "";
  // }
  return (
    <>
      <div onClick={(e) => e.stopPropagation()} style={{ color: "black" }}>
        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={{ borderRadius: "0px" }}>
                <h4 className="modal-title">Login</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={() => {
                    props.setShowModal(false);
                  }}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body" style={{ marginBottom: "1.5em" }}>
                <div className="row">
                  <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                      {/* <h1>Login</h1> */}
                      <form
                        onSubmit={(e) => handleSubmit(e)}
                        id="account-login"
                      >
                        <div className="form-floating mb-3">
                          <input
                            onChange={handleUsernameChange}
                            value={username}
                            placeholder="username"
                            required
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                          />
                          <label htmlFor="username">Username</label>
                          {loginFailed && (
                            <>
                              <br />
                              <div className="alert alert-danger">
                                Incorrect login information
                              </div>
                            </>
                          )}
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            onChange={handlePasswordChange}
                            value={password}
                            placeholder="password"
                            required
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                          />
                          <label htmlFor="password">Password</label>
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={handleSubmit}
                        >
                          Login
                          {/* {<LoginModal /> && showModal} */}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
