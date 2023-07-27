import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [terms, setTerms] = useState(false);
  const { register } = useToken();
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleTermsChange = (e) => {
    setTerms(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const signUpData = {
      username: username,
      password: password,
      full_name: firstName + " " + lastName,
    };
    register(signUpData, "http://localhost:8000/api/accounts/")
      .then(() => {
        setTimeout(() => {
          if (token) {
            setLoginFailed(false);
            navigate("/");
          } else {
            setLoginFailed(true);
          }
        }, 1000);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (token) {
      setLoginFailed(false);
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setUsername("");
  }, []);

  // Why isn't the above resetting what's in the fields on page load?

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Sign Up Now</h1>
            <form onSubmit={handleSubmit} id="account-signup">
              <div className="form-floating mb-3">
                <input
                  onChange={handleUsernameChange}
                  value={username}
                  placeholder="Username"
                  required
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                />
                <label htmlFor="username"></label>
                {loginFailed && (
                  <span>That username has already been taken.</span>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handlePasswordChange}
                  value={password}
                  placeholder="Password"
                  required
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                />
                <label htmlFor="password"></label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleFirstNameChange}
                  value={firstName}
                  placeholder="First Name"
                  required
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="form-control"
                />
                <label htmlFor="first_name"></label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleLastNameChange}
                  value={lastName}
                  placeholder="Last Name"
                  required
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="form-control"
                />
                <label htmlFor="last_name"></label>
              </div>
              <div className="form-check mb-3">
                <input
                  onChange={handleTermsChange}
                  checked={terms}
                  required
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="form-check-input"
                />
                <label htmlFor="terms" className="form-check-label">
                  I agree to the Terms and Conditions
                </label>
              </div>
              <button className="btn btn-primary">Signup</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
