import dogBackground from "./assets/dogBackground.mp4";
import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Footer from "./Footer";

function Home() {
  const [dogs, setDogs] = useState([]);

  const fetchDogs = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/dogs/`;
    const fetchConfig = {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        setDogs(data.dogs);
        console.log("DOGS --->", dogs);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  useEffect(() => {
    console.log(dogs); // This will show the updated value of dogs whenever it changes
  }, [dogs]);

  return (
    <>
      <div className="overlay div-video"></div>
      <video className="video" src={dogBackground} autoPlay loop muted />
      <div className="App home-style">
        <h1
          className="display-1 px-0"
          style={{
            textShadow: "4px 4px #1c8cff",
            fontVariant: "small-caps",
            fontStyle: "italic",
          }}
        >
          FurEver Home
        </h1>
        <div className="mx-auto">
          <p className="display-5 lead" style={{ fontSize: "xx-large" }}>
            "Connecting Dogs with Loving Families"
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
