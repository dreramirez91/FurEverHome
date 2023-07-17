import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const { token } = useAuthContext();
  const navigate = useNavigate();
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
    e.preventDefault();
    console.log(username);
    login(username, password)
      .then(() => {
        if (token) {
          setLoginFailed(false);
          navigate("/");
        } else {
          setLoginFailed(true);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (token) {
      setLoginFailed(false);
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Login</h1>
            <form onSubmit={(e) => handleSubmit(e)} id="account-login">
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
                {loginFailed && <span>Incorrect login information</span>}
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
              <button className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
