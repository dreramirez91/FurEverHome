import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CreateDog() {
  let { rehomerId } = useParams();
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [sex, setSex] = useState("");
  const [breed, setBreed] = useState("");
  const [spayedNeutered, setSpayedNeutered] = useState(false);
  const [reason, setReason] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [email, setEmail] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handlePictureUrlChange = (e) => {
    setPictureUrl(e.target.value);
  };

  const handleSexChange = (e) => {
    setSex(e.target.value);
  };

  const handleBreedChange = (e) => {
    setBreed(e.target.value);
  };
  const handleSpayedNeuteredChange = (e) => {
    setSpayedNeutered(e.target.checked);
  };
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };
  const handleAddressCityChange = (e) => {
    setAddressCity(e.target.value);
  };
  const handleAddressStateChange = (e) => {
    setAddressState(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};

    data.name = name;
    data.age = age;
    data.picture_url = pictureUrl;
    data.sex = sex;
    data.breed = breed;
    data.spayed_neutered = spayedNeutered;
    data.reason = reason;
    data.address_city = addressCity;
    data.address_state = addressState;
    data.email = email;
    data.adopted = false;

    const createDogUrl = `${process.env.REACT_APP_API_HOST}/dogs/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const createDogResponse = await fetch(createDogUrl, fetchConfig);
    if (createDogResponse.ok) {
      const createDog = await createDogResponse.json();
      navigate(`/dogs/${rehomerId}/mydogs`, { replace: false });

      setName("");
      setAge("");
      setPictureUrl("");
      setSex("");
      setBreed("");
      setSpayedNeutered(false);
      setReason("");
      setAddressCity("");
      setAddressState("");
      setEmail("");
    }
  };

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create Dog</h1>
            <br />
            <form onSubmit={handleSubmit} id="create-dog-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleNameChange}
                  value={name}
                  placeholder="Name"
                  required
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                />
                <label htmlFor="name"></label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleAgeChange}
                  value={age}
                  placeholder="Age"
                  required
                  type="number"
                  id="age"
                  name="age"
                  className="form-control"
                />
                <label htmlFor="age"></label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handlePictureUrlChange}
                  value={pictureUrl}
                  placeholder="Picture URL"
                  required
                  type="url"
                  id="picture_url"
                  name="picture_url"
                  className="form-control"
                />
                <label htmlFor="picture_url"></label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleSexChange}
                  value={sex}
                  placeholder="Sex"
                  required
                  type="text"
                  id="sex"
                  name="sex"
                  className="form-control"
                />
                <label htmlFor="sex"></label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleBreedChange}
                  value={breed}
                  placeholder="Breed"
                  required
                  type="text"
                  id="breed"
                  name="breed"
                  className="form-control"
                />
                <label htmlFor="breed"></label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  onChange={handleReasonChange}
                  value={reason}
                  placeholder="Reason"
                  required
                  name="reason"
                  className="form-control"
                ></textarea>
                <label htmlFor="reason"></label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleAddressCityChange}
                  value={addressCity}
                  placeholder="Address City"
                  required
                  type="text"
                  name="address_city"
                  className="form-control"
                />
                <label htmlFor="address_city"></label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleAddressStateChange}
                  value={addressState}
                  placeholder="Address State"
                  required
                  type="text"
                  name="address_state"
                  className="form-control"
                />
                <label htmlFor="address_state"></label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleEmailChange}
                  value={email}
                  placeholder="Email"
                  required
                  type="email"
                  name="email"
                  className="form-control"
                />
                <label htmlFor="email"></label>
              </div>
              <div className="form-check mb-3">
                <input
                  onChange={handleSpayedNeuteredChange}
                  checked={spayedNeutered}
                  type="checkbox"
                  name="spayed_neutered"
                  className="form-check-input"
                />
                <label htmlFor="spayed_neutered" className="form-check-label">
                  Spayed/Neutered
                </label>
              </div>
              <button className="btn btn-primary">Create Dog</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateDog;
