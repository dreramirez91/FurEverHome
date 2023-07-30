import dogBackground from "./assets/dogBackground.mp4";
import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { LuDog } from "react-icons/lu";
import Carousel from "react-bootstrap/Carousel";

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
          className="display-1 fw-bold"
          style={{
            textShadow: "4px 4px #1c8cff",
            fontVariant: "small-caps",
            textDecoration: "underline 4px",
          }}
        >
          FurEver Home
        </h1>
        <div className="col-lg-5 mx-auto">
          <p className="display-5 lead mb-4" style={{ fontSize: "xx-large" }}>
            "Connecting Dogs with Loving Families"
          </p>
        </div>
      </div>
      <div>
        <h2 className="home-caption available-dogs">
          Scroll through our adoptable dogs! See "Available Dogs" for more info!
        </h2>
      </div>
      <Carousel style={{ marginTop: "2em" }}>
        {dogs?.map((dog) => {
          return (
            <Carousel.Item key={dog.id} interval={6000}>
              <img
                className="carousel w-50 d-block img-thumbnail"
                style={{ margin: "auto", height: "520px" }}
                src={dog.picture_url}
              />
              <Carousel.Caption id="vertical-adjust">
                <span
                  style={{
                    fontSize: "large",
                    backgroundColor: "white",
                    color: "rgba(120, 112, 104, 0.95)",
                    paddingLeft: ".5em",
                    paddingRight: ".5em",
                    fontWeight: "bold",
                  }}
                >
                  {dog.name} |{" "}
                  {dog.age === 1
                    ? `${dog.age} year old`
                    : `${dog.age} years old`}
                </span>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
}

export default Home;
