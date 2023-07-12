import {React, useState, useEffect} from 'react';


function DogColumn(props) {
  return (
    <div className="col">
      {props.list.map(data => {
        const dog = data.dogs;
        return (
          <div key={dog.id} className="card mb-3 shadow">
            <img src={dog.picture_url} className="card-img-top" alt=""/>
            <div className="card-body">
              <h5 className="card-title">{dog.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {dog.breed}
              </h6>
              <p className="card-text">
                {dog.sex}
              </p>
              <p className="card-text">
                {dog.spayed_neutered}
              </p>
              <p className="card-text">
                {dog.city}, {dog.state}
              </p>            
            </div>
            <div className="card-footer">
              {new Date(dog.date_posted).toLocaleDateString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}


const DogList = (props) =>  {
  const [dogColumns, setDogColumns] = useState([[], [], []]);

  const fetchData = async () => {
    const url = 'http://localhost:8000/dogs/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        // const requests = [];
        // for (let dog of data.dogs) {
        //   const detailUrl = `http://localhost:8000/dogs/${dog.id}`;
        //   requests.push(fetch(detailUrl));
        // }

        const responses = await Promise.all(requests);

        const columns = [[], [], []];

        let i = 0;
        for (const dogsResponse of responses) {
          if (dogsResponse.ok) {
            const details = await dogsResponse.json();
            columns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(dogsResponse);
          }
        }

        setDogColumns(columns);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
        <img className="bg-white rounded shadow d-block mx-auto mb-4" src="" alt="" width="600" />
        <h1 className="display-5 fw-bold">Available Dogs</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            If you are interested in adopting one of the dogs below please message the owner directly.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {dogColumns.map((dogList, index) => {
            return (
              <DogColumn key={index} list={dogList} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DogList;