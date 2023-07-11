import React, { useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [terms, setTerms] = useState(false);
  const { token } = useAuthContext();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signUpData = {};

    const signupResponse = await fetch(signupUrl, fetchConfig);
    if (signupResponse.ok) {
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setTerms(false);
    }
  };

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Signup Now</h1>
            <form onSubmit={handleSubmit} id="account-signup">
              <div className="form-floating mb-3">
                <input
                  onChange={handleEmailChange}
                  value={email}
                  placeholder="email"
                  required
                  type="text"
                  id="email"
                  name="email"
                  className="form-control"
                />
                <label htmlFor="email">Email</label>
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
                <label htmlFor="first_name">First Name</label>
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
                <label htmlFor="last_name">Last Name</label>
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
