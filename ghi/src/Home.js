import dogBackground from "./assets/dogBackground.mp4";
import { useState, useEffect } from "react";
import { LuDog } from "react-icons/lu";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

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
          className="display-1"
          style={{
            textShadow: "4px 4px #1c8cff",
            fontVariant: "small-caps",
            fontStyle: "italic",

            // textDecoration: "underline 5px",
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
      <div>
        <h2 className="home-caption available-dogs">
          Scroll through our adoptable dogs! See{" "}
          <Link
            style={{
              marginLeft: "0.3em",
              marginRight: "0.3em",
              color: "#1c8cff",
            }}
            to="/dogs"
          >
            Available Dogs
          </Link>
          {"  "}
          for more info!
        </h2>
      </div>
      <Carousel style={{ marginTop: "1.2em" }}>
        {dogs?.map((dog) => {
          return (
            <Carousel.Item key={dog.id} interval={6000}>
              <img
                className="carousel w-50 d-block img-thumbnail"
                style={{ margin: "auto", height: "500px" }}
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
      <footer
        className="bg-white rounded-lg shadow dark:bg-gray-900 m-4"
        id="footer"
      >
        <div
          className="w-full max-w-screen-xl mx-auto p-4 md:py-8"
          style={{ marginTop: "10em" }}
        >
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link to="#" className="flex items-center mb-4 sm:mb-0">
              <LuDog style={{ marginRight: "0.5em" }} />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                {" "}
                FurEver Home
              </span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link to="#" className="mr-4 hover:underline md:mr-6 ">
                  About
                </Link>
              </li>
              <li>
                <Link to="#" className="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="mr-4 hover:underline md:mr-6 ">
                  Licensing
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <hr
            className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
            style={{ marginTop: "0px", marginBottom: "1em" }}
          />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link to="#" className="hover:underline">
              FurEver Home™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Home;
