import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import Home from "./Home.js";
import Signup from "./Signup.js";
import CreateDog from "./CreateDog.js";
import Nav from "./Nav.js";
import "./App.css";
import DogList from "./ListDogs.js";
import EditDog from "./EditDog.js";
import MyDogs from "./MyDogs.js";
import LoginModal from "./LoginModal.js";
import { useState } from "react";
import Footer from "./Footer.js";

function App() {
  const baseUrl = "http://localhost:8000" || process.env.REACT_APP_API_HOST;
  const [showModal, setShowModal] = useState(true);
  return (
    <>
      <AuthProvider baseUrl={baseUrl}>
        <BrowserRouter>
          <Nav />
          <LoginModal />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="signup" element={<Signup />} />
              <Route path="dogs/:rehomer_id/create" element={<CreateDog />} />
              <Route path="dogs/:dog_id/edit" element={<EditDog />} />
              <Route path="dogs" element={<DogList />}></Route>
              <Route path="dogs/:rehomer_id/mydogs" element={<MyDogs />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
