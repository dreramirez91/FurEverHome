import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
import Home from "./Home.js";
import Signup from "./Signup.js";
// import ErrorNotification from "./ErrorNotification";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* <Nav/> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
