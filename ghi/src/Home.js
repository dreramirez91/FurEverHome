import dogBackground from "./assets/dogBackground.mp4";

function Home() {
  return (
    <div className="App home-style">
      <div className="overlay div-video"></div>
      <video className="video" src={dogBackground} autoPlay loop muted />
      <h1
        className="display-1 fw-bold"
        style={{ textShadow: "1px 2px #007bff" }}
      >
        FurEver Home
      </h1>
      <div className="col-lg-5 mx-auto">
        <p className="display-5 lead mb-4" style={{ fontSize: "xx-large" }}>
          "Connecting Dogs with Loving Families"
        </p>
      </div>
    </div>
  );
}

export default Home;
