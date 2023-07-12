import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { useEffect, useState } from "react";
import Home from "./Home.js";
import Signup from "./Signup.js";
import Login from "./Login.js";
import CreateDog from "./CreateDog.js";
// import ErrorNotification from "./ErrorNotification";
import Nav from "./Nav.js";
import "./App.css";

function App() {
  const baseUrl = process.env.REACT_APP_API_HOST;

  return (
    <AuthProvider baseUrl={baseUrl}>
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="create_dog" element={<CreateDog />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
