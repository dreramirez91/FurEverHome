import dogBackground from "./assets/dogBackground.mp4";
import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import Carousel from "react-bootstrap/Carousel";

function Home() {
  const [dogs, setDogs] = useState([]);
  const [fetchSuccessful, setFetchSuccessful] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? dogs.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === dogs.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (dogIndex) => {
    setCurrentIndex(dogIndex);
  };

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
        setFetchSuccessful(true);
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
      <Carousel>
        {dogs?.map((dog) => {
          return (
            <Carousel.Item interval={6000}>
              <img className="w-100 d-block" src={dog.picture_url} />
              <Carousel.Caption>
                <span style={{ fontSize: "x-large" }}>{dog.name}</span>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
}

export default Home;
