import dogBackground from "./assets/dogBackground.mp4";
import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

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
      <div className="max-w-[1400px] h-[780px] w-full py-5 px-5 relative group">
        <div>
          <h2 className="home-caption available-dogs">
            Scroll through our adoptable dogs! See "Available Dogs" for more
            info!
          </h2>
        </div>
        {fetchSuccessful && (
          <div
            style={{
              backgroundImage: `url(${dogs[currentIndex].picture_url})`,
            }}
            className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
          ></div>
        )}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {dogs?.map((dog, dogIndex) => (
            <div
              key={dogIndex}
              onClick={() => goToSlide(dogIndex)}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
