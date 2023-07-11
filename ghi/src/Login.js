import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();

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
    login(username, password);
    e.target.reset();
    // const loginResponse = await fetch(loginUrl, fetchConfig);
    // if (loginResponse.ok) {
    //   const newLogin = await loginResponse.json();

    //   setUsername("");
    //   setPassword("");
    // }
  };
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
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handlePasswordChange}
                  value={password}
                  placeholder="password"
                  required
                  type="text"
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

export default LoginForm;
