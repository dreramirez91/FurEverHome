import { React, useState, useEffect } from "react";
import cornfield from "./assets/cornfield.jpeg";

function DogColumn(props) {
  return (
    <div className="col">
      {props.list.map((dog) => {
        return (
          <div key={dog.id} className="card mb-3 shadow dog-card-img">
            <img
              src={dog.picture_url}
              className="card-img-top image-size img-thumbnail"
              alt=""
            />
            <div className="card-body">
              <h5 className="card-title">{dog.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{dog.breed}</h6>
              <p className="card-text">{dog.sex}</p>
              <p className="card-text">Age: {dog.age}</p>
              <p className="card-text">
                Spayed/neutered: {dog.spayed_neutered ? "Yes" : "No"}
              </p>
              <p className="card-text">
                {dog.address_city}, {dog.address_state}
              </p>
              <p className="card-text">To adopt email: {dog.email}</p>
            </div>
            <div className="card-footer">
              {" "}
              Date Posted: {new Date(dog.date_posted).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const DogList = (props) => {
  useEffect(() => {
    document.body.classList.add("list-dogs");
    return () => {
      document.body.classList.remove("list-dogs");
    };
  }, []);
  const [dogColumns, setDogColumns] = useState([[], [], []]);
  const fetchDogs = async () => {
    const url = "http://localhost:8000/dogs/";

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        const columns = [[], [], []];

        let i = 0;
        for (const dogsResponse of data.dogs) {
          columns[i].push(dogsResponse);
          i = i + 1;
          if (i > 2) {
            i = 0;
          }
        }

        setDogColumns(columns);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <div style={{ backgroundImage: "" }}>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-primary">
        <img
          className="bg-white rounded shadow d-block mx-auto mb-4"
          src=""
          alt=""
          width="600"
        />
        {/* <h1 className="display-5 fw-bold">Available Dogs</h1> */}
        <div className="col-lg-6 mx-auto">
          <p
            className="lead mb-4"
            style={{ color: "white", fontSize: "x-large" }}
          >
            If you are interested in adopting one of the dogs below please email
            the owner directly.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {dogColumns.map((dogList, index) => {
            return <DogColumn key={index} list={dogList} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DogList;
