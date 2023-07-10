import dogBackground from "./assets/dogBackground.mp4";

function Home() {
  return (
    <div className="App">
      <div className="overlay div-video"></div>
      <video className="video" src={dogBackground} autoPlay loop muted />
      <h1 className="display-5 fw-bold">Furever Home</h1>
      <div className="col-lg-5 mx-auto">
        <p className="lead mb-4">"Connecting Hearts with FurEver Homes"</p>
      </div>
    </div>
  );
}

export default Home;
