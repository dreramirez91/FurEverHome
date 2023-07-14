import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function DogColumn(props) {
  return (
    <div className="col">
      {props.list.map((dog) => {
        return (
          <div key={dog.id} className="card mb-3 shadow">
            <img src={dog.picture_url} className="card-img-top" alt="" />
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

const MyDogs = (props) => {
  const [dogColumns, setDogColumns] = useState([[], [], []]);
  const { token } = useAuthContext();
  let { rehomer_id } = useParams();
  console.log(token);

  const fetchDogs = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/dog/${rehomer_id}`;
    const fetchConfig = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        //console.log(data)

        const columns = [[], [], []];

        let i = 0;
        for (const dogsResponse of data.dogs) {
          columns[i].push(dogsResponse);
          i = i + 1;
          if (i > 2) {
            i = 0;
          } else {
            console.error(dogsResponse);
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
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
        <img
          className="bg-white rounded shadow d-block mx-auto mb-4"
          src=""
          alt=""
          width="600"
        />
        <h1 className="display-5 fw-bold">My Dogs</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">A list of your beloved pets.</p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {dogColumns.map((dogList, index) => {
            return <DogColumn key={index} list={dogList} />;
          })}
        </div>
      </div>
    </>
  );
};

export default MyDogs;
