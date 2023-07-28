import dogBackground from "./assets/dogBackground.mp4";
import { useState, useEffect } from "react";

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
        console.log(dogs);
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
      <div className="App home-style">
        <div className="overlay div-video"></div>
        <video className="video" src={dogBackground} autoPlay loop muted />
        <h1
          className="display-1 fw-bold"
          style={{ textShadow: "4px 4px #1c8cff" }}
        >
          FurEver Home
        </h1>
        <div className="col-lg-5 mx-auto">
          <p className="display-5 lead mb-4" style={{ fontSize: "xx-large" }}>
            "Connecting Dogs with Loving Families"
          </p>
        </div>
      </div>
      <div id="demo" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner" style={{ marginTop: "10em" }}>
          <div
            className="carousel-item active"
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <img
              src="https://www.mirausa.org/wp-content/uploads/2013/11/our-dogs-gallery-icon.jpg"
              alt="Our dogs"
              style={{ maxHeight: "300px", maxWidth: "300px" }}
            />
          </div>
          {dogs?.map((dog) => {
            return (
              <div
                className="carousel-item"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <img
                  src={dog.picture_url}
                  alt={dog.name}
                  style={{
                    maxHeight: "300px",
                  }}
                />
              </div>
            );
          })}
        </div>
        <a className="carousel-control-prev" to="#demo" data-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </a>
        <a className="carousel-control-next" href="#demo" data-slide="next">
          <span className="carousel-control-next-icon"></span>
        </a>
      </div>
    </>
  );
}

export default Home;
