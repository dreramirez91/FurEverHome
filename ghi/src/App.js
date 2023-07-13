import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
import Home from "./Home.js";
// import ErrorNotification from "./ErrorNotification";
import "./App.css";

function App() {
  return (
    <div>
      <ErrorNotification error={error} />
      <Construct info={launchInfo} />
    </div>
  );
}

export default App;
