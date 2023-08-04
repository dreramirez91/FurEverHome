import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function LoginModal(props) {
  console.log("I am being called");
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
      {props.showModal ? (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="square-border flex items-start justify-between p-4 mb-3 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Login</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
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
                      <label htmlFor="username"></label>
                      {loginFailed && (
                        <>
                          <br />
                          <div className="alert alert-danger">
                            Incorrect login information
                          </div>
                        </>
                      )}
                    </div>
                    <div className="form-floating">
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
                      <label htmlFor="password"></label>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="square-border flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
